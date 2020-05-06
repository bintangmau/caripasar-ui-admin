import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function ManageBarangHeader() {
    return (
        <div className='managebarang-header'>

                <h2>Manage Barang</h2> 
                <Link to='/inputbarang' style={{ marginTop: '26px', marginLeft: '10px' }}>
                 <button>Input Barang +</button>
                </Link>
               

        </div>
    )
}
