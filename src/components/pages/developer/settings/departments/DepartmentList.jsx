
import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import React, { useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import DepartmentTable from './DepartmentTable'
import ModalAddDepartment from './ModalAddDepartment'
import { StoreContext } from '@/store/storeContext'
import { setIsAdd } from '@/store/storeAction'
import Footer from '@/components/partials/Footer'

const DepartmentList = () => {
    const {dispatch,store} = React.useContext(StoreContext);

    const handleAdd = () => {
        dispatch(setIsAdd(true));
      };

  return (
    <>
    <Header avatar="AG"/>
    <div className='flex'>
        <Navigation menu="settings" submenu="departments"/>
        <div className='px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between'>
            <div className='h-screen'>
            <div className="list-content"> 
                <h2>Departments</h2>
              <button className="btn-add " onClick={handleAdd}>
                <MdOutlineAdd size={18} fontWeight="bold"  />
                Add
              </button>
            </div>
            <DepartmentTable />
            </div>
            <Footer/>
        </div>
    </div>
    {store.isAdd && <ModalAddDepartment />}
    </>
  )
}

export default DepartmentList
