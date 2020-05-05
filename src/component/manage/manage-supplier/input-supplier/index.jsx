import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function InputSupplier() {
    const [ namaSupplier, setNamaSupplier ] = useState('')
    const [ alamatSupplier, setAlamatSupplier ] = useState('')
    const [ noTelp, setNoTelp ] = useState(0)
    const [ listKota, setListKota ] = useState([]) 
    const [ idKota, setIdKota ] = useState(1)
    const [ loading, setLoading ] = useState(false) 

    // INPUT SUPPLIER
    const inputSupplier = () => {
        if(!namaSupplier) {
            alert('Masukkan nama supplier!')
        } else if(!alamatSupplier) {
            alert('Masukkan alamat supplier')
        } else if(!noTelp) {
            alert('Masukkan no telp supplier!')
        } else if(!idKota) {
            alert('pilih kota supplier!')
        } else {
            axios.post(urlAPI + 'supplier/inputsupplier', {
                namaSupplier,
                alamatSupplier,
                noTelp,
                idKota
            })
            .then(() => {
                setNamaSupplier('')
                setAlamatSupplier('')
                setNoTelp(0)
                alert('bisa!')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const getListKota = () => {
        axios.get(urlAPI + 'supplier/getlistkotaforinput')
        .then((res) => {
            setListKota(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // GANTI VALUE NO TELP
    const handleChangeNoTelp = (e) => {
        if(e.target.value.length > 13) {
            return null
        } else {
            setNoTelp(e.target.value)
        }
    }

    const handleChangeKota = (e) => {
        setIdKota(e.target.value)
    }

    useEffect(() => {
        getListKota()
    }, [])

    return (
        <div className='inputsupplier-big-container'>
            
            <div className="inputsupplier-container">

                <div className="inputsupplier-input">
                    <label>Nama Supplier</label> <br/>
                    <input type="text" value={namaSupplier} onChange={(e) => setNamaSupplier(e.target.value)}/>
                </div>

                <div className="inputsupplier-input">
                    <label>Alamat Supplier</label> <br/>
                    <input type="text" value={alamatSupplier} onChange={(e) => setAlamatSupplier(e.target.value)}/>
                </div>

                <div className="inputsupplier-input">
                    <label>No Telp</label> <br/>
                    <input type="text" value={noTelp} onChange={handleChangeNoTelp}/>
                </div>

            </div>

            <div className="inputsupplier-container">

                <div className="inputsupplier-input">
                    <select className="skillPicker" onChange={handleChangeKota}>
                        {listKota.map((option, index) =>
                        <option key={option.idkota} value={option.idkota}>
                            {option.namakota}
                        </option>
                        )}
                    </select>
                </div>
                
            </div>
            
            <div className='inputsupplier-container-button'>
                <Link to='/managesupplier'>
                    <button style={{ backgroundColor: '#68AE00', marginRight: '15px' }}>Back</button>
                </Link>
                <button onClick={inputSupplier}>Add</button>
            </div>

        </div>
    )
}
