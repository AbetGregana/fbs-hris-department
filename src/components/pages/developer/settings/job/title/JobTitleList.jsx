import BreadCrumbs from '@/components/partials/BreadCrumbs'
import Footer from '@/components/partials/Footer'
import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import React from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import JobTitleTable from './JobTitleTable'
import ModalAddTitle from './ModalAddTitle'
import { StoreContext } from '@/store/storeContext'
import { setIsAdd } from '@/store/storeAction'

const JobTitleList = () => {
    const {store, dispatch} = React.useContext(StoreContext);

    const handleAdd = () => {
        dispatch(setIsAdd(true))
    };

    console.log(setIsAdd)

  return (
    <>
    <Header avatar="AG"/>
    <div className="flex">
        <Navigation menu="settings" submenu="job"/>
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
            <div className="h-screen">
                <div className="list-content">
                    <BreadCrumbs/>
                    <button className='btn-add' onClick={handleAdd}><MdOutlineAdd size={18} />Add</button>
                </div>
                <h2 className='text-lg font-bold -translate-y-5'>Job Title</h2>
                <JobTitleTable/>
                <h5 className='text-xs text-gray-500 text-center m-10'>End of list.</h5>
            </div>
            <Footer/>
        </div>
    </div>

    {store.isAdd && <ModalAddTitle/>}
    </>
  )
}

export default JobTitleList
