import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function InputWilayah() {
    const [ namaKota, setNamaKota ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const inputKota = () => {
        if(!namaKota) {
            alert('masukkan nama kota')
        } else {
            setLoading(true)
            axios.post(urlAPI + 'wilayah/inputkota', { namaKota })
            .then(() => {
                setLoading(false)
                setNamaKota('')
                alert('bisa')
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err)
            })
        }
    }

    return (
        <div className='inputwilayah-big-container'>

            {/* INPUT FORM CONTAINER */}
            <div className="inputwilayah-container">

                {/* INPUT NAMA KOTA */}
                <div className="inputwilayah-input">
                    <label>Nama Kota</label> <br/>
                    <input type="text" value={namaKota} onChange={(e) => setNamaKota(e.target.value)}/>
                </div>

            </div>
            {/* INPUT FORM CONTAINER */}

            {/* BUTTON ADD */}
            <div className='inputwilayah-container-button'>
                <Link to='/managewilayah'>
                    <button style={{ backgroundColor: '#68AE00', marginRight: '15px' }}>Back</button>
                </Link>
                {
                    loading
                    ?
                    <div className='loadingSpinner'></div>
                    :
                    <button onClick={inputKota}>Add</button>
                }
            </div>
            {/* BUTTON ADD */}

        </div>
    )
}
