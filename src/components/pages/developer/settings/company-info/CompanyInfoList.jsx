import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import React from 'react'
import CompanyInfoTable from './CompanyInfoTable'
import { StoreContext } from '@/store/storeContext'
import ModalEditCompanyInfo from './ModalEditCompanyInfo'
import useQueryData from '@/components/custom-hooks/useQueryData'
import { setIsAdd } from '@/store/storeAction'

const CompanyInfoList = () => {
    const {store} = React.useContext(StoreContext);
    const [companyEdit, setCompanyEdit] = React.useState(null);

    const {
        isLoading,
        isFetching,
        error,
        data: company,
      } = useQueryData(
        `/v2/company`, // endpoint
        "get", // method
        "company" // key
      );
    
  return (
    <>
    <Header avatar="LR"/>
    <div className="flex">
        <Navigation menu="settings" submenu="company-info"/>
        <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
            <div className="h-screen">
                <div className="list-content">
                    <h2>Company Info</h2>
                </div> 
                <CompanyInfoTable setCompanyEdit={setCompanyEdit} company={company} setIsAdd={setIsAdd} isLoading={isLoading}/>
            </div>
        </div>
    </div>
    {store.isAdd && (<ModalEditCompanyInfo setIsAdd={setIsAdd} companyEdit={companyEdit} setCompanyEdit={setCompanyEdit}/>)}
    </>
  )
}

export default CompanyInfoList
