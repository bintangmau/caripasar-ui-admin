import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import io from 'socket.io-client'

// CSS
import './index.css'

// COMPONENT
import ManageKatebarDetails from '../manage-katebar-details'

export default function ManageKatebarContent() {

    const [ dataKategoriBarang, setDataKategoriBarang ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const getKategoriBarang = () => {
        setLoading(true)
        Axios.get(urlAPI + 'kategoribarang/getkategoribarang')
        .then((res) => {
            setLoading(false)
            setDataKategoriBarang(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    const renderKategoriBarang = () => {
        return dataKategoriBarang.map((val) => {
            return (
                <ManageKatebarDetails 
                    id={val.idkategori}
                    kategori={val.namakategori}
                />
            )
        })
    }
    
    useEffect(() => {
        getKategoriBarang()
        const socket = io(`${urlAPI}`)
        socket.on('delete-kategori-barang', data => {
            getKategoriBarang()
        })
    }, [])

    return (
        <div>
            
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
            <div className='managekatebar-table-container'>
                <table className='managekatebar-table'>

                    <tr>
                        <th>ID</th>
                        <th>Kategori</th>
                        <th>Jumlah Produk per-Jenis</th>
                        <th>Jumlah Produk per-Stok</th>
                        <th></th>
                    </tr>

                {renderKategoriBarang()}
                </table>
            </div>
            {/* TABLE */}


        </div>
    )
}
