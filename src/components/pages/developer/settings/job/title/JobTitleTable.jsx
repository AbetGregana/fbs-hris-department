import Status from '@/components/partials/Status'
import { setIsAdd } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { FaArchive, FaEdit } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { MdDelete, MdOutlineSearch, MdRestore } from 'react-icons/md'

const JobTitleTable = () => {
    const {store, dispatch} = React.useContext(StoreContext);
    const [isActive, setIsActive] = React.useState("Active");

    const handleEdit = () => {
        dispatch(setIsAdd(true))
    };

    
  return (
    <>
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="input-wrapper w-[120px]">
                <label className='p-1 z-10'>Status</label>
                <select>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
            <div className="count flex items-center gap-2">
                <span><FaUserGroup className='text-gray-500'/></span>
                <h3 className='text-gray-500'>4</h3>
            </div>
        </div>
        <div className="search relative">
            <span><MdOutlineSearch className='top-[25%] absolute left-2 z-10 text-gray-500' size={18}/></span>
            <input type="text" placeholder='Search here...' className='pl-8' />
        </div>
    </div>

    <div className="site-table">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Job Level</th>
                    <th>Job Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1.</td>
                    {/* <td><span className={isActive === "Active" ? (
                        'text-green-700 border border-green-700 bg-green-100 py-1 px-2 rounded-lg'
                        ) : (
                        'text-red-700 border border-red-700 bg-red-100 py-1 px-2 rounded-lg'
                         ) }>{isActive}</span></td> */}
                         <td><Status text="On-going"></Status></td>
                    <td>Entry Level</td>
                    <td>Associate</td>
                    <td className='flex gap-3 justify-end'>
                    {isActive === "Active" ? (
                            <>
                            <button className='tooltip' data-tooltip="Edit" onClick={handleEdit}><FaEdit className='text-gray-500' size={12}/></button>
                            <button className='tooltip' data-tooltip="Archive"><FaArchive className='text-gray-500' size={11}/></button> 
                            </>
                    ) : ( 
                            <>
                            <button className='tooltip' data-tooltip="Restore"><MdRestore className='text-gray-500' size={15}/></button>
                            <button className='tooltip' data-tooltip="Delete"><MdDelete className='text-gray-500' size={14}/></button>
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

export default JobTitleTable
