import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { urlAPI } from '../../../../helper/database'

// CSS
import './index.css'

export default function ManageSupplierDetails({ id, nama, alamat, notelp, wilayah, idkota }) {

    const [ namaSupplier, setNamaSupplier ] = useState(nama)
    const [ alamatSupplier, setAlamatSupplier ] = useState(alamat)
    const [ noTelp, setNotelp ] = useState(notelp)
    const [ editCondition, setEditCondition ] = useState(false)
    const [ listKota, setListKota ] = useState(0)
    const [ idKota, setIdKota ] = useState(idkota)

    // FUNCTION EDIT SUPPLIER
    const editSupplier = () => {
        axios.post(urlAPI + 'supplier/editsupplier', {
            namaSupplier,
            alamatSupplier,
            noTelp,
            idSupplier: id,
            idKota
        })
        .then(() => {
            setEditCondition(false)
            // alert('bisa')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // FUNCTION DELETE SUPPLIER
    const deleteSupplier = () => {
        if(window.confirm(`yakin mau hapus ${namaSupplier}?`)) {
            axios.delete(urlAPI + 'supplier/deletesupplier/' + id)
            .then(() => {
                alert('dihapus')
            })
            .catch((err) => {
                console.log(err)
            }) 
        }
    }

    const getListKota = () => {
        axios.get(urlAPI + 'supplier/getlistkotaforinput')
        .then((res) => {
            // var olddata = [
            //     {
            //         idkota: idKota,
            //         namakota: wilayah,
            //     }
            // ]
            // var data = res.data.rows.push(olddata)
            // console.log(data)
            setListKota(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // UNTUK  MERUBAH VALUE NO TELP
    const handleChangeNoTelp = (e) => {
        if(e.target.value.length > 13) {
            return null
        } else {
            setNotelp(e.target.value)
        }
    }

    const handleChangeIdKota = (e) => {
        console.log(e.target.value)
        setIdKota(e.target.value)
    }

    useEffect(() => {
        getListKota()
    }, [])

    if(editCondition) {
        return (
            <tr>
                <td>
                    <input className="managebarang-edit-value-input" type="text" value={namaSupplier} onChange={(e) => setNamaSupplier(e.target.value)}/>
                </td>
                <td>
                    <input className="managebarang-edit-value-input" type="text" value={alamatSupplier} onChange={(e) => setAlamatSupplier(e.target.value)}/>
                </td>
                <td>
                    <select className="skillPicker" onChange={handleChangeIdKota}>
                        {listKota.map((option, index) =>
                        <option key={option.idkota} value={option.idkota}>
                            {option.namakota}
                        </option>
                        )}
                    </select>
                </td>
                <td>
                    <input className="managebarang-edit-value-input" type="number" value={noTelp} onChange={handleChangeNoTelp}/>
                </td>
                <td>
                    <button className='managesupplier-edit-btn' onClick={editSupplier}>
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
                <td>{alamat}</td>
                <td>{wilayah}</td>
                <td>{notelp}</td>
                <td><button className='managesupplier-edit-btn' onClick={() => setEditCondition(true)}>Edit</button></td>
                <td><button className='managesupplier-hapus-btn' onClick={deleteSupplier}>Hapus</button></td>
            </tr>
        )
    }
}
