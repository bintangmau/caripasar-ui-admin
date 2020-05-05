import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { urlAPI } from '../../../../helper/database'

// CSS
import './index.css'

export default function ManageWilayahDetails({ id, nama }) {
    const [ jumlahSupplier, setJumlahSupplier ] = useState(0)
    const [ jumlahJenisBarang, setJumlahJenisBarang ] = useState([])
    const [ jumlahTotalStok, setJumlahTotalStok ] = useState([])

    const getJumlahSupplier = () => {
        Axios.get(urlAPI + 'wilayah/getjumlahsupplier/' + id)
        .then((res) => {
            setJumlahSupplier(res.data.rows[0].jumlahsupplier)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getJumlahJenisBarang = () => {
        Axios.get(urlAPI + 'wilayah/getjumlahjenisbarang/' + id)
        .then((res) => {
            setJumlahJenisBarang(res.data.rows[0].jumlahjenisbarang)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const getJumlahStokBarang = () => {
        Axios.get(urlAPI + 'wilayah/getjumlahstokbarang/' + id)
        .then((res) => {
            setJumlahTotalStok(res.data.rows)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const renderTotalStok = () => {
        var totalStok = 0
        jumlahTotalStok.map((val) => {
            Number(val.jumlahstokbarang)
            totalStok += val.jumlahstokbarang
        })
        return totalStok
    }

    const deleteKota = () => {
        if(window.confirm(`yakin mau hapus ${nama}?`)) {
            Axios.post(urlAPI + 'wilayah/deletekota', { idKota: id })
            .then(() => {
                alert('bisa')
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    useEffect(() => {
        getJumlahSupplier()
        getJumlahJenisBarang()
        getJumlahStokBarang()
    }, [])
    
    return (
        <tr>
            <td>{nama}</td>
            <td>{jumlahSupplier}</td>
            <td>{jumlahJenisBarang}</td>
            <td>{renderTotalStok()}</td>
            <td><button className='managewilayah-hapus-btn' onClick={deleteKota}>Hapus</button></td>
        </tr>
    )
}
