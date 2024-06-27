import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import React from 'react'
import TableFreezeV2Table from './TableFreezeV2Table'
import Footer from '@/components/partials/Footer'

const TableFreezeV2List = () => {
  return (
    <>
    <Header avatar="LR"/>
    <div className="flex">
        <Navigation menu="settings" submenu=""/>
        <div className="px-4 py-1 mx-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col overflow-x-hidden">
          <div className="h-screen">
            <div className="list-content">
              <h2>Table's List v2</h2>
            </div>
              <TableFreezeV2Table/>
          </div>       
              <Footer/>
        </div>
    </div>
    
    </>
  )
}

export default TableFreezeV2List
