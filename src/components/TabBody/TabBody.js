import React , {useState , useEffect}from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col} from 'reactstrap';

export default function TabBody({header, data = [] , onClick ,statusFilter,onSort , groupBy = false , onGroupDelete }) {
  const [state ,setState] = useState([])
  useEffect(() => {
    setState([])
    }, [data,statusFilter])

  if(data.length === 0){
    if(statusFilter === "all")
      return <h3 style={{textAlign: 'center', paddingTop: '200px'}}>You haven't created any tasks yet!</h3>
    if(statusFilter === "open")
      return <h3 style={{textAlign: 'center', paddingTop: '200px'}}>You don't have any pending tasks!</h3>
    if(statusFilter === "done")
      return <h3 style={{textAlign: 'center', paddingTop: '200px'}}>You don't have any completed tasks!</h3>
  }
  const onDelete = () => {
    onGroupDelete(state)
  }
  const onChangeCheckbox = (event,x) => {
    if(event.target.checked){
        setState([...state,x.createdAt])
    }else{
      const state1 = state.filter(xx => xx !=  x.createdAt)
      setState([...state1])
    }
  }
  const groupByCategory = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );
  const groupByMap = groupByCategory(groupBy);
  const data1 = groupByMap(data);
    return (
      <>
        {state && state.length >1 && 
        <Container style={{paddingTop: '10px', paddingBottom:'10px'}}>
          <Row><Col sm={12} style={{textAlign: 'center'}}>
            <button onClick={onDelete} className="btn btn-danger">Delete Selected</button>
            </Col></Row>
        </Container>
        }
        <table className="table">
        <thead>
          <tr>
            <th>#</th>
            {header.map( x => <th key={x.label} onClick={() => onSort(x)} scope="col">{x.label}</th>)}
          </tr>
        </thead>
        <tbody>
           {!groupBy && data.length > 0 && data.map(x => {
               return (
                <tr key={x.createdAt} style={{textDecoration: (x.currentState == 'done' && statusFilter == 'all') ? 'line-through' :'initial'}}>
                  <th><input checked={state.indexOf(x.createdAt) != -1} onClick={(event) => onChangeCheckbox(event,x)} type="checkbox"/></th>
                <th onClick={() => onClick(x, 'view')} scope="row">{x.title}</th>
               <td onClick={() => onClick(x, 'view')}>{x.priority}</td>
               <td onClick={() => onClick(x, 'view')}>{new Date(x.createdAt).toLocaleString()}</td>
               <td onClick={() => onClick(x, 'view')}>{new Date(x.dueDate).toLocaleString()}</td>
               <td><span title="Edit todo" onClick={() => onClick(x, 'edit')}><FontAwesomeIcon icon={['fas', 'edit']} />  </span>  |   <span title="Delete todo" onClick={() => onClick(x, 'delete')}><FontAwesomeIcon icon={['fas', 'trash-alt']} />  </span>  |  <span onClick={() => onClick(x, 'status')}>{x.currentState == 'open' ? <FontAwesomeIcon icon={['fas', 'check']} title="Complete Todo" /> : <FontAwesomeIcon icon={['fas', 'times']} title="Re-Open Todo"/>}</span>
                </td> 
              </tr>
               )
           })}
           {
             groupBy && ( Object.keys(data1) && Object.keys(data1).length > 0 && Object.keys(data1).map(key => {
              return (
                <>
              <h4>{groupBy == 'priority' ? key :new Date(key).toLocaleString()}</h4>
              {
                data1[key].map(x => {
                  return (

                    <tr key={x.createdAt} style={{textDecoration: (x.currentState == 'done' && statusFilter == 'all') ? 'line-through' :'initial'}}>
                                        <th><input onChange={(event) => onClick(event,x)} type="checkbox"/></th>

                    <th onClick={() => onClick(x, 'view')} scope="row">{x.title}</th>
                    <td onClick={() => onClick(x, 'view')}>{x.priority}</td>
                   <td onClick={() => onClick(x, 'view')}>{new Date(x.createdAt).toLocaleString()}</td>
                   <td onClick={() => onClick(x, 'view')}>{new Date(x.dueDate).toLocaleString()}</td>
                   <td><span title="Edit todo" onClick={() => onClick(x, 'edit')}><FontAwesomeIcon icon={['fas', 'edit']} />  </span>
                    </td> 
                  </tr>
                   )
                })
              }
             </>
              )
             })

             )
           }

        </tbody>
      </table>


      </>

    )
}