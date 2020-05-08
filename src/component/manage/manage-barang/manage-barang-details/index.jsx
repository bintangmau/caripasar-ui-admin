import React, { useState } from 'react'
import axios from 'axios'
import { urlAPI } from '../../../../helper/database'

// CSS
import './index.css'

export default function ManageBarangDetails({ id, nama, harga, stok, deskripsi, supplier,satuan }) {
    const [ namaBarang, setNamaBarang ] = useState(nama)
    const [ hargaBarang, setHargaBarang ] = useState(harga)
    const [ stokBarang, setStokBarang ] = useState(stok)
    const [ deskripsiBarang, setDeskripsiBarang ] = useState(deskripsi)
    const [ satuanBarang, setSatuanBarang ] = useState(satuan)
    
    const [ editCondition, setEditCondition ] = useState(false)
    
    const deleteBarang = () => {
        if(window.confirm(`yakin mau hapus ${namaBarang}?`)) {
            axios.post(urlAPI + 'barang/deletebarang', { idBarang: id })
            .then(() => {
                alert('delete succes')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const editBarang = () => {
        axios.post(urlAPI + 'barang/editbarang', {
            namaBarang,
            hargaBarang,
            stokBarang,
            deskripsiBarang,
            idBarang: id,
            satuanBarang
        })
        .then(() => {
            setEditCondition(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    if(editCondition) {
        return (
            <tr>
                <td>
                    <input className="managebarang-edit-value-input" type="text" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)}/>
                </td>
                <td className='managebar-details-edit-satuan'>
                    <input type="number" value={hargaBarang} onChange={(e) => setHargaBarang(e.target.value)}/>
                    <input type="text" style={{ marginLeft: '5px' }} value={satuanBarang} onChange={(e) => setSatuanBarang(e.target.value)}/>
                </td>
                <td>
                    <input className="managebarang-edit-value-input" type="number" value={stokBarang} onChange={(e) => setStokBarang(e.target.value)}/>
                </td>
                <td>
                    <input className="managebarang-edit-value-input" type="text" value={deskripsiBarang} onChange={(e) => setDeskripsiBarang(e.target.value)}/>
                </td>
                <td>{supplier}</td>
                <td>
                    <button className='managebarang-simpan-btn' onClick={editBarang}>
                        Simpan
                    </button>
                </td>
                <td>
                    <button className='managebarang-hapus-btn' onClick={() => setEditCondition(false)}>
                        Batalkan
                    </button>
                </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{nama}</td>
                <td>{harga + '/' + satuan}</td>
                <td>{stok}</td>
                <td>{deskripsi}</td>
                <td>{supplier}</td>
                <td>
                    <button className='managebarang-edit-btn' onClick={() => setEditCondition(true)}>
                    Edit
                    </button>
                </td>
                <td>
                    <button className='managebarang-hapus-btn' onClick={deleteBarang}>
                    Hapus
                    </button>
                </td>
            </tr>
          
        )
    }
}
