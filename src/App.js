import React, { useEffect } from 'react'
import { Switch, Route, withRouter} from 'react-router-dom'

// CSS
import './App.css'

// API
import { urlAPI } from './helper/database'

// COMPONENT
import Navbar from './component/navbar/Navbar'
import Home from './component/home/Home'
import Sidebar from './component/sidenav/Sidebar'
import Manage from './component/manage'
import ManageBarang from './component/manage/manage-barang'
import InputBarang from './component/manage/manage-barang/input-barang'
import ManageSupplier from './component/manage/manage-supplier'
import InputSupplier from './component/manage/manage-supplier/input-supplier'
import ManageWilayah from './component/manage/manage-wilayah'
import InputWilayah from './component/manage/manage-wilayah/input-wilayah'
import ManageKategoriBarang from './component/manage/manage-kategori-barang'
import InputKategoriBarang from './component/manage/manage-kategori-barang/input-kategori-barang'

function App() {

  return (
    <div>

    <div className='home-flex'>

      <Sidebar />

      {/* KONTEN SEBELAH KANAN DARI SIDE BAR */}
      <div style={{ marginLeft: '16%' , width : "86%"}}>

        <Navbar />
        {/* KONTEN DIBAWAH NAVBAR */}
        <div className='big-container'>
          
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/manage' component={Manage} exact/>
            <Route path='/managebarang/:filter/:id' component={ManageBarang} exact/>
            <Route path='/inputbarang' component={InputBarang} exact/>
            <Route path='/managesupplier/:filter/:id' component={ManageSupplier} exact/>
            <Route path='/inputsupplier' component={InputSupplier} exact/>
            <Route path='/managewilayah' component={ManageWilayah} exact/>
            <Route path='/inputwilayah' component={InputWilayah} exact/>            
            <Route path='/managekategoribarang' component={ManageKategoriBarang} exact/>      
            <Route path='/inputkategoribarang' component={InputKategoriBarang} exact/>            

          </Switch>

        </div>
        {/* KONTEN DIBAWAH NAVBAR */}

      </div>
      {/* KONTEN SEBELAH KANAN DARI SIDEBAR */}

    </div>

    </div>
  )
}

export default withRouter(App);
