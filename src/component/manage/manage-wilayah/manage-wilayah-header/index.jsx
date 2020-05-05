import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function ManageWilayahHeader() {
    return (
        <div className='managewilayah-header'>

            <h2>Manage Wilayah</h2> 
            <Link to='inputwilayah' style={{ marginTop: '26px', marginLeft: '10px' }}>
                <button>Input Wilayah +</button>
            </Link>

        </div>
    )
}
