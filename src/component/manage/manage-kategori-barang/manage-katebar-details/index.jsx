import React, { useState, useEffect } from 'react'

// CSS
import './index.css'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'


export default function ManageKatebarDetails({ id, kategori }) {
    const [ jumlahProdukPerJenis, setJumlahProdukPerJenis ] = useState(0)
    const [ jumlahProdukPerStok, setJumlahProdukPerStok ] = useState([])

    const deleteKategoriBarang = () => {
        if(window.confirm(`yakin mau hapus kategori ${kategori}?`)) {
            Axios.delete(urlAPI + 'kategoribarang/deletekategoribarang/' + id)
            .then(() => {
                alert('bisa')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const getJumlahProdukPerJenis = () => {
        Axios.get(urlAPI + 'kategoribarang/getjumlahprodukperjenis/' + id)
        .then((res) => {
            setJumlahProdukPerJenis(res.data.rows[0].jumlahjenisbarang)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getJumlahProdukPerStok = () => {
        Axios.get(urlAPI + 'kategoribarang/getjumlahprodukperstok/' + id)
        .then((res) => {
            setJumlahProdukPerStok(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getJumlahProdukPerJenis()
        getJumlahProdukPerStok()
    }, [])

    return (
        <tr>
            <td>{id}</td>
            <td>{kategori}</td>
            <td>{jumlahProdukPerJenis}</td>
            <td>2222</td>
            <td><button className='managekatebar-hapus-btn' onClick={deleteKategoriBarang}>Hapus</button></td>
        </tr>
    )
}
