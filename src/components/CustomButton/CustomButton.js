import React from 'react'
import './CustomButton.css'
export default function CustomButton({onClick}) {
    return (
        <>
        <a className="plusbtn" onClick={onClick} title="Add a task"><div className="text">+</div></a>
        </>
    )
}