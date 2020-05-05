import React from 'react'

// CSS
import './index.css'

// COMPONENT
import ManageBarangHeader from './manage-barang-header'
import ManageBarangFilter from './manage-barang-filter'

export default function ManageBarang() {
    return (
        <div className='managebarang-container'>

            <ManageBarangHeader />
            
            {/* FILTER AND TABLE */}
            <ManageBarangFilter />

        </div>
    )
}
