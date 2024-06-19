import SearchBarWithFilterStatus from '@/components/partials/SearchBarWithFilterStatus'
import { setIsAdd } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { FaArchive, FaEdit } from 'react-icons/fa'
import { IoArchiveSharp } from 'react-icons/io5'
import { MdDelete, MdRestore } from 'react-icons/md'

const DepartmentTable = ({setModalAdd,item}) => {
    const {dispatch, store} = React.useContext(StoreContext)
    
    const handleEdit = () => {
        dispatch(setIsAdd(true))
    };

  return (
    <>
    <div className="site-table-action">
        <SearchBarWithFilterStatus/>
    </div>
    <div className="site-table relative">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Department Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Web</td>
                    <td>Active</td>
                    <td className='flex gap-2 justify-end'>
                        { "Active" ? (
                            <>
                            <button className='tooltip' data-tooltip="Edit" onClick={handleEdit}><FaEdit className='text-gray-500' size={11}/></button>
                            <button className='tooltip' data-tooltip="Archive"><FaArchive className=' text-gray-500' size={10}/></button>
                            </>
                        ) : (
                            <>
                             <button className='tooltip' data-tooltip="Restore"><MdRestore className=' text-gray-500' size={10}/></button>
                            <button className='tooltip' data-tooltip="Delete"><MdDelete className=' text-gray-500' size={10}/></button>
                            </>
                        )}
                        
                       
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Web</td>
                    <td>Inactive</td>
                    <td className='flex gap-2 justify-end'>
                        { "" ? (
                            <>
                            <button className='tooltip' data-tooltip="Edit" onClick={handleEdit}><FaEdit className=' text-gray-500' size={11}/></button>
                            <button className='tooltip' data-tooltip="Archive"><IoArchiveSharp className=' text-gray-500' size={10}/></button>
                            </>
                        ) :  (
                            <>
                             <button className='tooltip' data-tooltip="Restore"><MdRestore className=' text-gray-500' size={14}/></button>
                            <button className='tooltip' data-tooltip="Delete"><MdDelete className=' text-gray-500' size={13}/></button>
                            </>
                        )}
                        
                       
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

export default DepartmentTable
