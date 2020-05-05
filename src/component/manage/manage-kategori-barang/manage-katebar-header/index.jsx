import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function ManageKatebarHeader() {
    return (
        <div className='managekatebar-header'> 

            <h2>Manage Kategori Barang</h2> 
            <Link to='/inputkategoribarang' style={{ marginTop: '26px', marginLeft: '10px' }}>
                <button>Input Kategori Barang +</button>
            </Link>

        </div>
    )
}
