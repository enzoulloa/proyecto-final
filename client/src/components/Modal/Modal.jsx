import React from 'react'
import './Modal.scss'

export default function Modal({children, onClose}){
    return (
        <div className='modal'>
            <div className='modal-content'>
                <button className='btn' onClick={onClose}>x</button>
                {children}
            </div>
        
        </div>
    )
}