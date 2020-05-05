import React from 'react'

// CSS
import './index.css'

// COMPONENT
import ManageSupplierHeader from './manage-supplier-header'
import ManageSupplierContent from './manage-supplier-content'

export default function ManageSupplier() {
    return (
        <div className='managesupplier-big-container'>

            <ManageSupplierHeader />

            <ManageSupplierContent />

        </div>
    )
}
