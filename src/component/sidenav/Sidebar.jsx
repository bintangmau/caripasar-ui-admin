import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import './Sidebar.css'

export default function Sidebar () {

    return (
        <div className='sidebar'>

            <div className="admin-profile">
                <img 
                    src="https://i.insider.com/5d4c874a2d4cb5106e2dc343?width=1100&format=jpeg&auto=webp" 
                    alt="avataricon"
                    className='avatar-icon'    
                />
               
                <h5>Admin Caripasar</h5>
            </div>

            <div className="admin-navigation">
                
                <a><Link to='/'>Dashboard</Link></a>
                <a><Link to='/manage'>Manage</Link></a>
                <a><Link>Pembayaran</Link></a>

            </div>

        </div>
    )

}
