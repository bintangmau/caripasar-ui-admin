import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { urlAPI } from '../../../../helper/database'
import io from 'socket.io-client'

// CSS
import './index.css'

// COMPONENT
import ManageSupplierDetails from '../manage-supplier-details'

export default function ManageSupplierContent( props ) {
    
    const [ searchCondition, setSearchCondition ] = useState(false)
    const [ dataSupplier, setDataSupplier ] = useState([])
    const [ namaSupplierSearch, setNamaSupplierSearch ] = useState('')
    const [ listDataKota, setListDataKota ] = useState([])
    const [ idKotaFilter, setIdKotaFilter ] = useState(1)
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()
     
    // GET DATA SUPPLIER
    const getDataSupplier = () => {
        setLoading(true)
        Axios.get(urlAPI + 'supplier/getdatasupplier')
        .then((res) => {
            setSearchCondition(false)
            setDataSupplier(res.data.rows)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
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
            setLoading(true)
            Axios.get(urlAPI + 'supplier/carisupplierbynama/' + namaSupplierSearch)
            .then((res) => {
                setLoading(false)
                setSearchCondition(true)
                setDataSupplier(res.data.rows)
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err)
            })
        }
    }

    const getShowSupplier = () => {
        setLoading(true)
        Axios.get(urlAPI + 'wilayah/getshowsupplier/' + history.location.pathname.split('/')[3])
        .then((res) => {
            var params = history.location.pathname.split('/')
            var numParamsId = Number(params[3])
            if(params[2] === 'all' && numParamsId === 0) {
                getDataSupplier()
            } else {
                setLoading(false)
                setDataSupplier(res.data.rows)
            }
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    const getFiterSupplierByKota = () => {
        setLoading(true)
        Axios.get(urlAPI + 'supplier/getfiltersupplierbywilayah/' + idKotaFilter)
        .then((res) => {
            setLoading(false)
           setDataSupplier(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // GET LIST KOTA FOR FILTER
    const getListDataKota = () => {
        setLoading(true)
        Axios.get(urlAPI + 'supplier/getlistdatakota')
        .then((res) => {
            setLoading(false)
            setListDataKota(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }
    
    // UBAH VALUE STATE ID KOTA FOR FILTER
    const handleChangeFilterByAddress = (e) => {
        setIdKotaFilter(e.target.value)
    }

    useEffect(() => {
        getShowSupplier()
       
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
            <div className='managesupplier-table-container'>
                <table className='managesupplier-table'>

                    <tr>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Wilayah</th>
                        <th>No Telp</th>
                        <th>Jumlah barang</th>
                        <th>Jumlah stok</th>
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
