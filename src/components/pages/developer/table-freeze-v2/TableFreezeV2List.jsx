import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import React from 'react'
import TableFreezeV2Table from './TableFreezeV2Table'

const TableFreezeV2List = () => {
  return (
    <>
    <Header avatar="AG"/>
    <div className="flex">
        <Navigation menu="settings" submenu=""/>
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-300px)] flex flex-col justify-between overflow-x-hidden">
                <div className="list-content">
                    <h2>Table's List v2</h2>
                </div>
                <TableFreezeV2Table/>
        </div>
    </div>
    </>
  )
}

export default TableFreezeV2List
