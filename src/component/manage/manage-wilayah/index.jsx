import React from 'react'

// CSS
import './index.css'

// COMPONENT
import ManageWilayahHeader from './manage-wilayah-header'
import ManageWilayahContent from './manage-wilayah-content'

export default function ManageWilayah() {
    return (
        <div className='managewilayah-big-container'>
            
            <ManageWilayahHeader />

            <ManageWilayahContent />
        </div>
    )
}
