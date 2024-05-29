import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Siderbar from './components/Sidebar/Siderbar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import Order from './pages/Orders/Order'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Siderbar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/orders' element={<Order/>}/>

        </Routes>
      </div>

    </div>
  )
}

export default App