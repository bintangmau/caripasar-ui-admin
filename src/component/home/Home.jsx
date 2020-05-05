import React from 'react'

// CSS
import './home.css'

export default function index() {
    return (
        <div className='dashboard'>

            <div className="dashboard-header">
                <h2>Dashboard <br />
                    <span>Selamat datang, Admin!</span>
                </h2>
            </div>

            <div className='report-penjualan'>
                <h1>95,5% <br/>
                    <span>Laporan Penjualan bulan April</span>
                </h1>
            </div>

        </div>
    )
}
