import React from 'react'

// CSS
import './index.css'

// COMPONENT
import ManageKatebarHeader from './manage-katebar-header'
import ManageKatebarContent from './manage-katebar-content'

export default function ManageKategoriBarang() {
    return (
        <div className='managekatebar-big-container'>
            
            <ManageKatebarHeader />

            <ManageKatebarContent />
            
        </div>
    )
}
