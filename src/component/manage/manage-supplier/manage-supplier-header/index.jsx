import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import './index.css'

export default function ManageSupplierHeader() {
    return (
        <div className='managesupplier-header'>

          <h2>Manage Supplier</h2> 
          <Link to='/inputsupplier' style={{ marginTop: '26px', marginLeft: '10px' }}>
              <button>Input Supplier +</button>
          </Link>

        </div>
    )
}
