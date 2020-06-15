import React , {useEffect , useRef}from 'react'

export default function SearchButton(props) {
     const searchRef = useRef(null)

    const keydown = (event) => {
        if(event.key == 'F' && event.ctrlKey && event.shiftKey){
           searchRef.current.focus()
        }
    }
    useEffect(() => {
     window.addEventListener('keydown',keydown )

     return () => {
         window.removeEventListener('keydown',keydown)
     }
    },[])
    return (
        <input ref={searchRef} style={{width:'250px',
                            border: '1px solid grey',
                            borderRadius: '5px',
                            padding: '2px 23px 2px 30px',
                            backgroundColor: '#f5f5f5'}}
         placeholder="Search for tasks"
         onChange={props.search}
         />
    )
}