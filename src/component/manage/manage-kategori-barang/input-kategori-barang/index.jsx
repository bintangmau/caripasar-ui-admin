import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// CSS
import './index.css'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'

export default function InputKategoriBarang() {
    const  [ namaKategoriBarang, setNamaKategoriBarang ] = useState('')

    const inputKategoriBarang = () => {
        if(!namaKategoriBarang) {
            alert('masukkan nama kategori')
        } else {
            Axios.post(urlAPI + 'kategoribarang/inputkategori', { namaKategori: namaKategoriBarang })
            .then(() => {
                alert('bisa')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className='inputkatebar-big-container'>

            {/* INPUT FORM CONTAINER */}
            <div className="inputkatebar-container">

                {/* INPUT NAMA KOTA */}
                <div className="inputkatebar-input">
                    <label>Nama Kategori Barang</label> <br/>
                    <input type="text" onChange={(e) => setNamaKategoriBarang(e.target.value)}/>
                </div>

            </div>
            {/* INPUT FORM CONTAINER */}

            {/* BUTTON ADD */}
            <div className='inputkatebar-container-button'>
                <Link to='/managekategoribarang'>
                    <button style={{ backgroundColor: '#68AE00', marginRight: '15px' }}>Back</button>
                </Link>
                <button onClick={inputKategoriBarang}>Add</button>
            </div>
            {/* BUTTON ADD */}

        </div>
    )
}
