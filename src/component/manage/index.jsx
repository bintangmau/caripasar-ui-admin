import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function Manage() {
    return (
        <div className='manage-container'>

            <Link to='/managebarang/all/0'>
                <div className='manage-navigation'>
                    <p>Manage Barang</p>
                </div>
            </Link>

            <Link to='/managesupplier/all/0'>
                <div className='manage-navigation'>
                    <p>Manage Supplier</p>
                </div>
            </Link>

            <Link to='/managewilayah'>
                <div className='manage-navigation'>
                    <p>Manage Wilayah</p>
                </div>
            </Link>

            <Link to='/managekategoribarang'>
                <div className='manage-navigation'>
                    <p>Manage Kategori Barang</p>
                </div>
            </Link>





        <button>
            Contoh tombol
        </button>










        </div>
    )
}
