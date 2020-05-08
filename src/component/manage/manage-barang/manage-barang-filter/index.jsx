import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

// CSS
import './index.css'

// COMPONENT
import ManageBarangDetails from '../manage-barang-details'

export default function ManageBarangFilter() {
    const [ dataBarang, setDataBarang ] = useState([])
    const [ cariNamaBarang, setCariNamaBarang ] = useState('')
    const [ searchCondition, setSearchCondition ] = useState(false)
    const [ listSupplier, setListSupplier ] = useState([])
    const [ listDataKota, setListDataKota ] = useState([])
    const [ listKategoriBarang, setListKategoriBarang ] = useState([])
    const [ loading, setLoading ] = useState(false)

    // UNTUK GET BARANG BY PARAMS.ID
    const history = useHistory()

    // UNTUK FILTER BY STOCK
    const [ numFilterStock, setNumFilterStock ] = useState(0)
    const [ operationStock, setOperationStock ] = useState('<')

    // UNTUK FILTER BY PRICE
    const [ numFilterPrice, setNumFilterPrice ] = useState(0)
    const [ operationPrice, setOperationPrice ] = useState('<')

    // UNTUK FILTER BY WILAYAH
    const idParamsToNumber = Number(history.location.pathname.split('/')[3])
    const [ idWilayah, setIdWilayah ] = useState(idParamsToNumber)

    // UNTUK FILTER BY KATEGORI
    const [ idKategori, setIdKategori ] = useState(idParamsToNumber)

    // DATA ABAL2 UNTUK FILTER BY STOK
    const filterStock = [
        { operation: '<', code: 'stok dibawah' },
        { operation: '>', code: 'stok diatas' },
        { operation: '=', code: 'stok sama dengan'}
    ]

    // DATA ABAL2 UNTUK FILTER BY PRICE
    const filterPrice = [
        { operation: '<', code: 'harga dibawah' },
        { operation: '>', code: 'harga diatas' },
        { operation: '=', code: 'harga sama dengan' }
    ]

    // GET DATA BARANG
    const getDataBarang = () => {
        setLoading(true)
        Axios.get(urlAPI + 'barang/getdatabarang')
        .then((res) => {
            setSearchCondition(false)
            setDataBarang(res.data.rows)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // SEARCH BARANG BY NAME
    const cariBarangByNama = () => {
        if(!cariNamaBarang) {
            alert('Masukkan nama barang!')
        } else {   
            setLoading(true)
            Axios.get(urlAPI + 'barang/caribarang/' + cariNamaBarang)
            .then((res) => {
                setSearchCondition(true)
                setDataBarang(res.data.rows)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err)
            })
        }
    }

    // GET DATA BARANG FILTER BY SUPPLIER
    const getDataFilterBySupplier = (idSupp) => {
        setLoading(true)
        Axios.get(urlAPI + 'barang/filterbarangbysupplier/' + idSupp)
        .then((res) => {
            setDataBarang(res.data.rows)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // GET DATA BARANG FILTER BY STOCK
    const getDataFilterByStock = () => {
        if(!numFilterStock) {
            alert('masukkan nominal!')
        } else {
            setLoading(true)
            Axios.post(urlAPI + 'barang/filterbarangbystock', {        
                operation: operationStock,
                nominal: numFilterStock
            })
            .then((res) => {
                setDataBarang(res.data.rows)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err)
            })
        }
    }

    // GET DATA BARANG FILTER BY PRICE
    const getDataFilterByPrice = () => {
        if(!numFilterPrice) {
            alert('masukkan nominal!')
        } else {
            setLoading(true)
            Axios.post(urlAPI + 'barang/filterbarangbyprice', {
                operation: operationPrice,
                nominal: numFilterPrice
            })
            .then((res) => {
                setDataBarang(res.data.rows)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err)
            })
        }
    }

    // GET LIST NAMA2 SUPPLIER
    const getListNamaSupplier = () => {
        setLoading(true)
        Axios.get(urlAPI + 'barang/getlistnamasupplier')
        .then((res) => {
            setLoading(false)
            setListSupplier(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            return null
        })
    }

      // GET LIST KOTA FOR FILTER
      const getListDataKota = () => {
          setLoading(true)
        Axios.get(urlAPI + 'supplier/getlistdatakota')
        .then((res) => {
            var data = res.data.rows
            // MENAMBAH VALUE KE INDEX[0] BERUPA DATA KOSONG
            data.unshift({ idkota: 0, namakota: 'Filter by wilayah' })
            
            setListDataKota(data)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

     // GET LIST KATEGORI BARANG
     const getListKategori = () => {
        setLoading(true)
        Axios.get(urlAPI + 'barang/getlistkategoribarang')
        .then((res) => {
            var data = res.data.rows
            // MENAMBAH VALUE KE INDEX [0]
            data.unshift({ idkategori: 0, namakategori: 'Filter by kategori' })
            setListKategoriBarang(data)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // SHOW PRODUCT BY WILAYAH
    const getShowProductFromWilayah = () => {
        setLoading(true)
        Axios.get(urlAPI + 'wilayah/getshowproduct/' + idWilayah)
        .then((res) => { 
            setLoading(false)
            setDataBarang(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // SHOW PRODUCT BY KATEGORI BARANG
    const getShowProductFromKatebar = () => {
        setLoading(true)
        Axios.get(urlAPI + 'kategoribarang/getshowproduct/' + idKategori)
        .then((res) => {
            setLoading(false)
            setDataBarang(res.data.rows)
        })
        .catch((err) => {
            setLoading(false)
            // console.log(err)
        })
    }

    // RENDER BARANG IN TABLE
    const renderDataBarang = () => {
        return dataBarang.map((val) => {
            return (
                <ManageBarangDetails 
                    id={val.idBarang}
                    nama={val.namaBarang}
                    harga={val.hargaBarang}
                    stok={val.stokBarang}
                    deskripsi={val.deskripsiBarang}
                    supplier={val.namasupplier}
                    satuan={val.satuanBarang}
                />
            )
        })
    }

    // HANDLE CHANGE FILTER SUPLLIER
    const pilihSupplier = (e) => {
        getDataFilterBySupplier(e.target.value)
    }
        
    // HANDLE CHANGE FILTER STOCK
    const pilihOperationStock = (e) => {
      setOperationStock(e.target.value)
    }

    // HANDLE CHANGE FILTER 
    const pilihOperationPrice = (e) => {
        setOperationPrice(e.target.value)
    }

    // HANDLE ONCLICK FILTER BY WILAYAH
    const handleOnClickFilterByWilayah = () => {
        if(idWilayah === 0) {
            return null
        } else {
            getShowProductFromWilayah()
        }
    }

     // HANDLE ONCLICK FILTER BY KATEGORI
     const handleOnClickFilterByKategori = () => {
        var id = Number(idKategori)
        if(id === 0) {
            return null
        } else {
            getShowProductFromKatebar()
        }
    }

    useEffect (() => {
        var params = history.location.pathname.split('/')
        var paramsId = Number(params[3])
        if(params[2] === 'all' && paramsId === 0){
            getDataBarang()
        } else if(params[2] === 'wilayah') {
            getShowProductFromWilayah()
        } else {
            getShowProductFromKatebar()
        }
        
        getListDataKota()
        getListNamaSupplier()
        getListKategori()
        // GET DATA REAL TIME
        const socket = io(`${urlAPI}`)
        socket.on('save-edit-barang', data => {
            getDataBarang()
        })
        socket.on('delete-barang', data => {
            getDataBarang()
        })
    }, [])

    return (
        <div>
               
            {/* FORM SEARCH FILTER BY NAME */}
            <div className="managebarang-search-filter">
                <input type="text" placeholder="Cari nama barang ..." onChange={(e) => setCariNamaBarang(e.target.value)}/>
                <button onClick={cariBarangByNama}>Cari</button>
                {
                    searchCondition
                    ?
                    <button style={{ backgroundColor: 'red' }} onClick={getDataBarang}>X</button>
                    :
                    null
                }

                {/* <div>
                    filter
                </div> */}

            </div>
            
            <div className="managebarang-filter-container">

                {/* FORM FILTER BARANG BY SUPPLIER */}
                <div className='managebarang-filterby-supplier'>
                    <select className="skillPicker" style={{ borderRadius: '5px' }} onChange={pilihSupplier}>
                        {listSupplier.map((option, index) =>
                        <option key={option.idsupplier} value={option.idsupplier}>
                            {option.namasupplier}
                        </option>
                        )}
                    </select>
                </div>

                {/* FORM FILTER BARANG BY STOCK */}
                <div className='managebarang-filterby-stock'>
                    <select className="skillPicker" style={{ borderRadius: '5px' }} onChange={pilihOperationStock}>
                        {filterStock.map((option, index) =>
                        <option key={option.num} value={option.operation}>
                            {option.code}
                        </option>
                        )}
                    </select>
                    <input type="number" onChange={(e) => setNumFilterStock(e.target.value)}/>
                    <button onClick={getDataFilterByStock}>Cari</button>    
                </div>

                {/* FORM FILTER BARANG BY PRICE */}
                <div className='managebarang-filterby-price'>
                    <select className="skillPicker" style={{ borderRadius: '5px' }} onChange={pilihOperationPrice}>
                        {filterPrice.map((option, index) =>
                        <option key={option.num} value={option.operation}>
                            {option.code}
                        </option>
                        )}
                    </select>
                    <input type="number" onChange={(e) => setNumFilterPrice(e.target.value)}/>
                    <button onClick={getDataFilterByPrice}>Cari</button>
                </div>
                            
                {/* BUTTON SHOW ALL */}
                <div className='managebarang-showall-button'>
                    <button onClick={getDataBarang}>Semua</button>
                </div>

            </div>

            <div className="managebarang-filter-container">

                {/* FORM FILTER BARANG BY WILAYAH */}
                <div className='managebarang-filterby-supplier'>
                    <select className="skillPicker" style={{ borderRadius: '5px' }} onChange={(e) => setIdWilayah(e.target.value)}>
                        {listDataKota.map((option, index) =>
                        <option key={option.kota} value={option.idkota}>
                            {option.namakota}
                        </option>
                        )}
                    </select>
                    <button onClick={handleOnClickFilterByWilayah}>Cari</button>
                </div>


                {/* FORM FILTER BARANG BY KATEGORI */}
                <div className='managebarang-filterby-supplier'>
                    <select className="skillPicker" style={{ borderRadius: '5px' }} onChange={(e) => setIdKategori(e.target.value)}>
                        {listKategoriBarang.map((option, index) =>
                        <option key={option.idkategori} value={option.idkategori}>
                            {option.namakategori}
                        </option>
                        )}
                    </select>
                    <button onClick={handleOnClickFilterByKategori}>Cari</button>
                </div>
            </div>
           
           {/* SPINNER LOADING */}
            {
                loading
                ?
                <center style={{ marginBottom: '10px' }}>
                    <div className='loadingSpinner'></div>
                </center>
                :
                null
            }

            <div className='managebarang-table-container'>
                <table className='managebarang-table'>
                    <tr>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Deskripsi</th>
                        <th>Supplier</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {renderDataBarang()}
                    
                </table>
            </div>
            
        </div>
    )
}
