import React from 'react'
import './index.css'

export default function Modal({children, onClose}){
    return (
        <div className='modal'>
            <div className='modal-content'>
                <button className='btn' onClick={onClose}>❌</button>
                {children}
            </div>
        
        </div>
    )
}