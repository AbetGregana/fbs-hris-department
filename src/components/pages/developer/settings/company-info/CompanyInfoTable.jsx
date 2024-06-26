import { setIsCompanyInfoEdit } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'

const CompanyInfoTable = () => {
    const {dispatch} = React.useContext(StoreContext)

    const handleEdit = () => {
        dispatch(setIsCompanyInfoEdit(true))
    }; 

  return (
    <>
    <div className="company-info-wrapper">
        <div className="company-info-top">
            <div className="company-info-top-title">
                <h2 className='text-sm font-semibold py-2 !uppercase'>details</h2>
                <button className='flex text-[#9f1659] text-sm' onClick={handleEdit}><FaPencilAlt />Update</button>
            </div>
        </div>
        <table className='mt-3'>
            <tbody>
                <tr>
                    <th>Company Name:</th>
                    <td>Leila Holloway Inc.</td>
                </tr>
                <tr>
                    <th>Company Email:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>Company Phone:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>Street:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>City:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>Province:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>Postal:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>Country:</th>
                    <td>Unspecified</td>
                </tr>
                <tr>
                    <th>Navigation Background Color:</th>
                    <td>#9F1659</td>
                </tr>
                <tr>
                    <th>Sub Menu Color:</th>
                    <td>#E33589</td>
                </tr>
                <tr>
                    <th>Accent Color:</th>
                    <td>#F7E300</td>
                </tr>
                <tr>
                    <th>Company Logo:</th>
                    <td><img src="/FCALogo.png" alt="" className='w-[130px]'/></td>
                </tr>
            </tbody>
        </table>
        <div className="company-info-top mt-10">
            <div className="company-info-top-title">
                <h2 className='text-sm font-semibold py-2 !uppercase'>subscription</h2>
            </div>
        </div>
        <table>
            <tbody>
                <tr>
                    <th>Product:</th>
                    <td>Hris</td>
                </tr>
                <tr>
                    <th>Company Code:</th>
                    <td>FBS001</td>
                </tr>
                <tr>
                    <th>No. Of Employee:</th>
                    <td>11</td>
                </tr>
                <tr>
                    <th>Add-ons:</th>
                    <td>Company Branding</td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

export default CompanyInfoTable
