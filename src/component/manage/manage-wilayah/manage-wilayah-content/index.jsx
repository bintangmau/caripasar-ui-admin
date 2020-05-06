import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import io from 'socket.io-client'

// CSS
import './index.css'

// COMPONENT
import ManageWilayahDetails from '../manage-wilayah-details'

export default function ManageWilayahContent() {
    const [ dataWilayah, setDataWilayah ] = useState([])
    const [ searchCondition, setSearchCondition ] = useState(false)
    const [ keyNamaWilayah, setKeyNamaWilayah ] = useState('')
    const [ loading, setLoading ] = useState(false)

    // GET ALL DATA WILAYAH
    const getDataWilayah = () => {
        setLoading(true)
        axios.get(urlAPI + 'wilayah/getdatawilayah')
        .then((res) => {
            setLoading(false)
            setDataWilayah(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // GET SEARCH BY NAME
    const searchWilayahByName = () => {
        if(!keyNamaWilayah) {
            alert('Masukkan kata kunci!')
        } else {
            setLoading(true)
            axios.get(urlAPI + 'wilayah/searchwilayahbyname/' + keyNamaWilayah)
            .then((res) => {
                setLoading(false)
                setSearchCondition(true)
                setDataWilayah(res.data.rows)
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err)
            })
        }
    }

    // RENDER DATA WILAYAH
    const renderDataWilayah = () => {
        return dataWilayah.map((val) => {
            return (
                <ManageWilayahDetails 
                    id={val.idkota}
                    nama={val.namakota}
                />
            )
        })
    }

    useEffect(() => {
        getDataWilayah()
        const socket = io(`${urlAPI}`)
        socket.on('delete-kota', data => {
            getDataWilayah()
        })
    }, [])


    return (
        <div>

            {/* SEARCH BOX */}
            <div className="managewilayah-search-container">
                <input type="text" placeholder="Cari nama wilayah ..." onChange={(e) => setKeyNamaWilayah(e.target.value)}/>
                <button onClick={searchWilayahByName}>
                    Cari
                </button>
                {
                    searchCondition
                    ?
                    <button style={{ backgroundColor: 'red' }} onClick={getDataWilayah}>X</button>
                    :
                    null
                }
            </div>
            {/* SEARCH BOX */}

            {/* SPINNER */}
            {
                loading
                ?
                <center style={{ marginBottom: '10px' }}>
                    <div className='loadingSpinner'></div>
                </center>
                :
                null
            }

            {/* TABEL */}
            <div className='managewilayah-table-container'>
                <table className='managewilayah-table'>

                    <tr>
                        <th>Nama</th>
                        <th>Jumlah Supplier</th>
                        <th>Jumlah Produk per-Jenis</th>
                        <th>Jumlah Produk semua stok</th>
                        <th></th>
                    </tr>

                    {renderDataWilayah()}
                    
                </table>
            </div>
            {/* TABLE */}


        </div>
    )
}
