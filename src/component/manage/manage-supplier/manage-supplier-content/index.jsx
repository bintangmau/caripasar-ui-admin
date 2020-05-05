import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { urlAPI } from '../../../../helper/database'
import io from 'socket.io-client'

// CSS
import './index.css'

// COMPONENT
import ManageSupplierDetails from '../manage-supplier-details'

export default function ManageSupplierContent() {
    
    const [ searchCondition, setSearchCondition ] = useState(false)
    const [ dataSupplier, setDataSupplier ] = useState([])
    const [ namaSupplierSearch, setNamaSupplierSearch ] = useState('')
    const [ listDataKota, setListDataKota ] = useState([])
    const [ idKotaFilter, setIdKotaFilter ] = useState(1)
     
    // GET DATA SUPPLIER
    const getDataSupplier = () => {
        Axios.get(urlAPI + 'supplier/getdatasupplier')
        .then((res) => {
            setSearchCondition(false)
            setDataSupplier(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // RENDER DATA SUPPLIER
    const renderDataSupplier = () => {
        return dataSupplier.map((val) => {
            return (
                <ManageSupplierDetails 
                    id={val.idsupplier}
                    nama={val.namasupplier}
                    alamat={val.alamatsupplier}
                    notelp={val.notelp}
                    wilayah={val.namakota}
                    idkota={val.idkota}
                />
            )
        })
    }

    // CARI SUPPLIER BY NAME
    const cariSupplierByNama = () => {
        if(!namaSupplierSearch) {
            alert('masukkan kata kunci!')
        } else {
            Axios.get(urlAPI + 'supplier/carisupplierbynama/' + namaSupplierSearch)
            .then((res) => {
                setSearchCondition(true)
                setDataSupplier(res.data.rows)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const getFiterSupplierByKota = () => {
        Axios.get(urlAPI + 'supplier/getfiltersupplierbywilayah/' + idKotaFilter)
        .then((res) => {
           setDataSupplier(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // GET LIST KOTA FOR FILTER
    const getListDataKota = () => {
        Axios.get(urlAPI + 'supplier/getlistdatakota')
        .then((res) => {
            setListDataKota(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    // UBAH VALUE STATE ID KOTA FOR FILTER
    const handleChangeFilterByAddress = (e) => {
        setIdKotaFilter(e.target.value)
    }

    useEffect(() => {
        getDataSupplier()
        getListDataKota()
        // GET DATA REAL TIME
        const socket = io(`${urlAPI}`)
        socket.on('save-edit-supplier', data => {
            getDataSupplier()
        })
        socket.on('delete-supplier', data => {
            getDataSupplier()
        })
    }, [])

    return (
        <div>

            {/* SEARCH BOX */}
            <div className="managesupplier-search-container">
                <input type="text" placeholder="Cari nama supplier ..." onChange={(e) => setNamaSupplierSearch(e.target.value)}/>
                <button onClick={cariSupplierByNama}>
                    Cari
                </button>
                {
                    searchCondition
                    ?
                    <button style={{ backgroundColor: 'red' }} onClick={getDataSupplier}>X</button>
                    :
                    null
                }
            </div>
            {/* SEARCH BOX */}

            {/* FILTER BOX */}
            <div className="managesupplier-filter-container">
                
                {/* FILTER BY ADDRESS */}
                <div className="managesupplier-filterby-address">
                    <select className="skillPicker" onChange={handleChangeFilterByAddress}>
                        {listDataKota.map((option, index) =>
                        <option key={option.idkota} value={option.idkota}>
                            {option.namakota}
                        </option>
                        )}
                    </select>
                    <button onClick={getFiterSupplierByKota}>cari</button>
                </div>

                {/* BUTTON SHOW ALL */}
                <div className='managesupplier-showall-button'>
                    <button onClick={getDataSupplier}>Semua</button>
                </div>

            </div>
            {/* FILTER BOX */}

            {/* TABEL */}
            <div className='managesupplier-table-container'>
                <table className='managesupplier-table'>

                    <tr>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Wilayah</th>
                        <th>No Telp</th>
                        <th></th>
                        <th></th>
                    </tr>
             
                    {renderDataSupplier()}
                </table>
            </div>
            {/* TABLE */}

        </div>
    )
}
