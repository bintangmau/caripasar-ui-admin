import React , { useState, useEffect } from 'react'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function ManageBarang() {
    const [ namaBarang, setNamaBarang ] = useState('')
    const [ hargaBarang, setHargaBarang ] = useState(0)
    const [ stokBarang, setStokBarang ] = useState(0)
    const [ deskripsiBarang, setDeskripsiBarang ] = useState('')
    const [ idSupplier, setIdSupplier ] = useState(1)
    const [ gambarBarang, setGambarBarang ] = useState('')
    const [ kategoriBarang, setKategoriBarang ] = useState(1)
    const [ satuan, setSatuan ] = useState('')

    const [ listSupplier, setListSupplier ] = useState([])
    const [ listKategori, setListKategori ] = useState([])

    // CONDITION STATE
    const [ loading, setLoading ] = useState(false)
    const [ defaultSatuan, setDefaultSatuan ] = useState(false)

    const [price,setPrice] = useState(null)

    // GET LIST NAMA2 SUPPLIER
    const getListNamaSupplier = () => {
        Axios.get(urlAPI + 'barang/getlistnamasupplier')
        .then((res) => {
           setListSupplier(res.data.rows)
        })
        .catch((err) => {
            return null
        })
    }

    // GET LIST KATEGORI BARANG
    const getListKategori = () => {
        Axios.get(urlAPI + 'barang/getlistkategoribarang')
        .then((res) => {
            setListKategori(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // HANDLE CHANGE GAMBAR BARANG
    const pilihGambar = (e) => {
        if(e.target.files[0]) {
            setGambarBarang(e.target.files)
        } else {
            setGambarBarang('')
        }
    }

    // HANDLE CHANGE KATEGORI BARANG
    const pilihKategori = (e) => {
        setKategoriBarang(e.target.value)
    }

    // HANDLE CHANGE SUPLLIER
    const pilihSupplier = (e) => {
        setIdSupplier(e.target.value)
    }

    // HANDLE CHANGE SATUAN BARANG
    const pilihSatuan = (e) => { 
        if(e.target.value === 'default') {
            setSatuan('')
            setDefaultSatuan(true)
        } else {
            setSatuan(e.target.value)
        }
    }

    // CANCEL DEFAULT SATUAN
    const cancelDefaultSatuan = () => {
        setDefaultSatuan(false)
        setSatuan('')
    }

    // FUNCTION INPUT BARANG
    const inputBarang = () => {
        if(!namaBarang) {
            alert('Masukkan nama barang !')
        } else if(!hargaBarang) {
            alert('Masukkan harga barang!')
        } else if(!stokBarang) {
            alert('Masukkan stok barang!')
        } else if(!satuan) {
            alert('masukkan satuan barang')
        } else if(!deskripsiBarang) {
            alert('Masukkan deskripsi barang!')
        } else if(!gambarBarang) {
            alert('Pilih gambar barang!')
        } else {
            setLoading(true)
            let bodyFormData = new FormData()
    
            var options = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            // DATA YANG DIKIRIM KE DATABASE
            const data = {
                namaBarang,
                hargaBarang,
                stokBarang,
                deskripsiBarang,
                idSupplier,
                kategoriBarang,
                satuanBarang: satuan
            }

            bodyFormData.append('data', JSON.stringify(data))
            bodyFormData.append('image', gambarBarang[0])

            Axios.post(urlAPI + 'barang/inputbarang', bodyFormData, options)
            .then(() => {
                setNamaBarang('')
                setHargaBarang(0)
                setStokBarang(0)
                setDeskripsiBarang('')
                setLoading(false)
                // alert('input success')
            })
            .catch((err) => {
                setNamaBarang('')
                setHargaBarang(0)
                setStokBarang(0)
                setDeskripsiBarang('')
                setLoading(false)
            })
        }
      
    }

    const dummyDataSatuan = [
        { id: 0, satuan: '' },
        { id: 1, satuan: 'kg' },
        { id: 2, satuan: '1/2 kg' },
        { id: 3, satuan: 'pcs' },
        { id: 4, satuan: 'ekor' },
        { id: 5, satuan: 'karton'},
        { id: 'default', satuan: 'default' }
    ]

    useEffect(() => {
        getListNamaSupplier()
        getListKategori()
    }, [])

    return (
        <div className='inputbarang-big-container'>
            
            <div className='inputbarang-container'>
                
                {/* FORM NAMA BARANG */}
                <div className='inputbarang-input' >
                    <label>Nama Barang</label> <br/>
                    <input type="text" onChange={(e) => setNamaBarang(e.target.value)} value={namaBarang}/>
                </div>
                {/* FORM NAMA BARANG */}

                {/* FORM HARGA BARANG */}
                <div className='inputbarang-input'>
                    <label>Harga Barang</label> <br/>
                    <input type="number" onChange={(e) => setHargaBarang(e.target.value)} value={hargaBarang}/>
                </div>
                {/* FORM HARGA BARANG */}

                {/* FORM STOK BARANG */}
                <div className='inputbarang-input-stok' style={{ marginRight: '0'}}>
                    <label>Stok Barang</label> <br/>
                    
                    <div style={{ display: 'flex'}}>
                        <input type="number"  
                            onChange={(e) => setStokBarang(e.target.value)} 
                            value={stokBarang}
                        />
                        {/* FORM SATUAN BARANG */}
                        <div style={{ width: '50%' }}>
                            {
                                defaultSatuan
                                ?
                                <div className="inputbarang-satuan-default">
                                    <input type="text"  
                                        onChange={(e) => setSatuan(e.target.value)} 
                                        style={{ marginLeft: '10px', width: "100%" }}
                                    />
                                    <button onClick={cancelDefaultSatuan}>cancel</button>
                                </div>
                                :
                                <select className="skillPicker" onChange={pilihSatuan}>
                                    {dummyDataSatuan.map((option, index) =>
                                    <option key={option.id} value={option.satuan}>
                                        {option.satuan}
                                    </option>
                                    )}
                                </select>
                            }
                        </div>

                    </div>
                </div>
                {/* FORM STOK BARANG */}

            </div>

            <div className='inputbarang-container'>

                {/* FORM PILIH KATEGORI */}
                <div className='inputbarang-input'>
                    <label className="grey-text">
                        Kategori
                    </label> <br />
                    <select className="skillPicker" onChange={pilihKategori}>
                        {listKategori.map((option, index) =>
                        <option key={option.idkategori} value={option.idkategori}>
                            {option.namakategori}
                        </option>
                        )}
                    </select>
                </div>
                {/* FORM PILIH KATEGORI */}

                {/* FORM PILIH SUPPLIER */}
                <div className='inputbarang-input'>
                    <label className="grey-text">
                        Supplier
                    </label> <br />
                    <select className="skillPicker" onChange={pilihSupplier}>
                        {listSupplier.map((option, index) =>
                        <option key={option.idsupplier} value={option.idsupplier}>
                            {option.namasupplier}
                        </option>
                        )}
                    </select>
                </div>
                {/* FORM PILIH SUPPLIER */}

                <div className='inputbarang-input-file'>
                    <label>Gambar Barang</label> <br />
                    <input type="file" name="" id="" onChange={pilihGambar}/>
                </div>

            </div>

            <div className='inputbarang-container'>

                {/* FORM DESKRIPSI BARANG */}
                <div className='inputbarang-input' style={{ width: '100%', marginRight: '0' }}>
                    <label>Deskripsi Barang</label> <br/>
                    {/* <input type="text" id="inputNamaBarang" style={{ height: '80px' }}/> */}
                    <textarea id="w3mission" rows="6" cols="100" onChange={(e) => setDeskripsiBarang(e.target.value)} value={deskripsiBarang}/>
                </div>
                {/* FORM DESKRIPSI BARANG */}

            </div>


            <div className="inputbarang-container-button">

              

                <div>
                    {
                        loading
                        ?
                        <div className='loadingSpinner'></div>
                        :
                        <> 
                            <Link to='/managebarang/all/0'>
                                <button style={{ backgroundColor: '#68AE00', marginRight: '15px' }}>Back</button>
                            </Link>
                            {/* BUTTON INPUT BARANG */}
                            <button onClick={inputBarang}>Add</button>
                        </>
                    }
                </div>
              

            </div>

        </div>
    )
}
