import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'
import { Link } from 'react-router-dom'

// CSS
import './index.css'


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

    // RENDER TOTAL STOK
    const renderTotalStok = () => {
        var totalStok = 0
        jumlahProdukPerStok.map((val) => {
            var stokPerBarang = Number(val.stokBarang)
            totalStok += stokPerBarang                  
        })
        return totalStok
    }

    useEffect(() => {
        getJumlahProdukPerJenis()
        getJumlahProdukPerStok()
    }, [])

    return (
        <tr>
            <td>{id}</td>
            <td>{kategori}</td>
            <td>{jumlahProdukPerJenis}
                <Link to={`/managebarang/katebar/${id}`}>
                    <button className='btn-show-supplier-wilayah'>
                        lihat
                    </button>
                </Link>
            </td>
            <td>{renderTotalStok()}</td>
            <td><button className='managekatebar-hapus-btn' onClick={deleteKategoriBarang}>Hapus</button></td>
        </tr>
    )
}
