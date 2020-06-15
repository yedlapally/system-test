import React, { useEffect } from 'react'
import './ModalBox.css'
export default function Modal(props) {
    const keyUp = (event) => {
        if(event.key == 'Escape'){
            props.closeModal()
        }
    }
    useEffect(() => {
     window.addEventListener('keyup',keyUp )

     return () => {
         window.removeEventListener('keyup',keyUp)
     }
    },[])
    return (
        <>
        <div className="custom-backdrop" onClick={props.closeModal}></div>
        <div className="custom-modal">
            <div className="custom-modal-body">
            {props.children}

            </div>
        </div></>
    )
}