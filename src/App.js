import React, { useState, useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux'
import { Container, Row, Col, Navbar, NavbarText, Collapse} from 'reactstrap';
import ModalBox from "./components/ModalBox/ModalBox";
import TodoForm from "./components/TodoForm/TodoForm";
import Tab from "./components/Tab/Tab";
import CustomButton from "./components/CustomButton/CustomButton";
import SearchButton from "./components/SearchButton/SearchButton";
import TabBody from "./components/TabBody/TabBody";
import Select from "./components/Select/Select";
import { deleteTask, editTask, bulkDeleteTask } from "./store/useractions";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";

import './App.css';

const columnList = [
                    {label:'Summary', value:'title'},
                    {label:'Priority', value:'priority'},
                    {label:'Created On', value:'createdAt'},
                    {label:'Due Date', value:'dueDate'},
                    {label:'Actions',value:'actions'}
                  ]
const tabList = [
                  {label:'All',value:'all'},
                  {label:'Pending',value:'open'},
                  {label:'Completed',value:'done'}
                ]

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentSortDirection , setCurrentSortDirection] = useState('ASC')
  const [statusFilter , setStatusFilter] = useState('all');
  const [searchString , setSearchString] = useState('');
  const [currentListView , setCurrentListView] = useState({});
  const [currentSort , setCurrentSort] = useState({label:'Summary',value:'title'})
  const [formMode , setFormMode] = useState('add')
  const [showDelete , setShowDelete] = useState(false)
  const [todoList , setTodoList] = useState([]);
  const [modalState , setModalState] =useState('')
  const [currentDropDownState , setCurrentDropDownState] = useState('');
  const [loading , setLoading] = useState(false)


  const dispatch = useDispatch()

  const todos = useSelector((state) => {
    return state.todos;
  })

  useEffect(() => {
    const statusFilterX = todos.filter(x => {
      if(statusFilter == 'all'){
        return x
      }else {
        return x.currentState == statusFilter
      }
    })
    const searchFilter = statusFilterX.filter(x => {
        if(x.title.toLowerCase().indexOf(searchString.trim().toLowerCase()) != -1 || x.description.toLowerCase().indexOf(searchString.trim().toLowerCase()) != -1){
          return x
        }
    })

    const data = searchFilter.length > 0 ? searchFilter.slice().sort((a1,b1) => {

      if(currentSort.value != 'actions'){
        let comparison = 0;
        const a = a1[currentSort.value].toLowerCase()
        const b = b1[currentSort.value].toLowerCase()
        if(currentSortDirection == 'ASC'){
          if (a > b) {
            comparison = 1;
          } else if (a < b) {
            comparison = -1;
          }
          return comparison;
        }else {
          if (a < b) {
            comparison = 1;
          } else if (a > b) {
            comparison = -1;
          }
          return comparison;
        }
      }
    }) : []
    setTodoList(data)
  }, [todos , statusFilter,searchString ,currentDropDownState ,currentSort ,currentSortDirection])

  const onSearch = (event) => {
    setSearchString(event.target.value)
  }

  const onClickonList = (data , status) => {
      if(status == 'delete'){
         setShowDelete(true)
         setModalState(data)

      }else if(status == 'status'){
        setLoading(true)

         dispatch(editTask({...data,currentState: data.currentState == 'open' ? 'done' :'open'})).then(x => {
          setLoading(false)

          })
      }else {
        setShowModal(true)
        setCurrentListView(data)
        setFormMode(status)
      }

  }

  const onTabClick = (tab) => {
    setStatusFilter(tab.value)
  }
  const deleteRequest = (data) => {
    setLoading(true)
    dispatch(deleteTask(data.createdAt)).then(() => {
       setLoading(false)
       setShowDelete(false)
       setModalState('')
    })
  }

  const onBulkDelete = (data) => {
      setLoading(true)
    dispatch(bulkDeleteTask(data)).then(() => {
     setLoading(false)
   })
  }

  const onChangeDropDown = (event) => {
    setCurrentDropDownState(event.target.value)
  }
  return(
    <>
    <Navbar color="dark" dark expand="md">
      <Collapse  style={{justifyContent: 'center'}} navbar>
        <NavbarText style={{fontWeight: 'bold', color: 'white'}}>Todo App</NavbarText>
      </Collapse>
    </Navbar>
     {loading ? <div style={{width:'100%',height:'100%',position:'absolute',zIndex:500}}><LoadingIndicator /> </div>: null}

      {showModal && (
        <ModalBox closeModal={() => setShowModal(false)}>
          <TodoForm formMode={formMode} data={currentListView}  closeModal={() => setShowModal(false)}/>
        </ModalBox>
      )}
       {showDelete && (
        <ModalBox closeModal={() => setShowModal(false)}>
          <form style={{ margin: "15px" }} noValidate>
            <h3>{modalState.title}</h3>
            <p>Do you want to delete this task?</p>
            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'12%'}}>
              <button onClick={() => deleteRequest(modalState)} className="btn btn-danger">Yes</button>&nbsp;&nbsp;
              <button onClick={() => {
                setShowDelete(false)
                setModalState('')
              }} className="btn btn-success">No</button>
            </div>
          </form>

        </ModalBox>
      )}
      <Container>
      <div style={{position: "fixed",bottom: "8%",right: "5%",zIndex: 1}}>
        <CustomButton onClick={() => {
          setShowModal((status) => !status)
          setFormMode('add')
          setCurrentListView( {title:'',
          description:'',
          priority:'',
          dueDate:'',
          createdAt:'',
          currentState:''})

          }} />
      </div>
      {/* <div style={{display:'flex',justifyContent:'space-between',margin:'10px'}}      > */}
      <Row style={{paddingTop:'10px'}}>
        <Col sm={6}>
          <SearchButton value={setSearchString} search={onSearch} />
        </Col>
        <Col sm={4}>
          <h6 style={{float:'right'}}>Group by:</h6>
        </Col>
        <Col sm={2}>
          <Select value={currentDropDownState} onChange={onChangeDropDown} />
        </Col>
      </Row>
      {/* </div> */}

      <div>
        <Tab onClick={onTabClick} tabs={tabList} />
        <TabBody onGroupDelete={onBulkDelete} groupBy={currentDropDownState} onSort={x => {
          setCurrentSort(x)
          if(currentSortDirection == 'ASC'){
            setCurrentSortDirection('DSC')
          }else{
            setCurrentSortDirection('ASC')
          }
          }} statusFilter={statusFilter} header={columnList} data={todoList} onClick={onClickonList} />
      </div>
    </Container>
    </>
  );
}

export default App;