import useQueryData from '@/components/custom-hooks/useQueryData'
import Loadmore from '@/components/partials/LoadMore'
import NoData from '@/components/partials/NoData'
import SearchBarWithFilterStatus from '@/components/partials/SearchBarWithFilterStatus'
import ServerError from '@/components/partials/ServerError'
import Status from '@/components/partials/Status'
import TableLoader from '@/components/partials/TableLoader'
import { setIsAdd, setIsArchive, setIsDelete, setIsDepartmentInfoEdit, setIsRestore } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { FaArchive, FaEdit } from 'react-icons/fa'
import { IoArchiveSharp } from 'react-icons/io5'
import { MdDelete, MdRestore } from 'react-icons/md'

const DepartmentTable = ({setDepartmentEdit, departments}) => {
    const {dispatch} = React.useContext(StoreContext);
    const [isActive, setIsActive] = React.useState("Active");
    const [isArchiving, setIsArchiving] = React.useState(0)
    const [id, setId] = React.useState(''); 


    const handleEdit = (item) => {
        dispatch(setIsAdd(true))
        setDepartmentEdit(item);
    };

    const handleArchive = (item) => {
        dispatch(setIsArchive(true))
        setId(item.department_aid)
        setIsArchiving(0)
    }

    const handleRestore = (item) => {
        dispatch(setIsRestore(true))
        setId(item.department_aid)
        setIsArchiving(1)
    }

    const handleDelete = (item) => {
        dispatch(setIsDelete(true))
        setId(item.department_aid)
    }

  
    
    


  return (
    <>
    <div className="site-table-action">
        <SearchBarWithFilterStatus/>
    </div>
    <div className="site-table relative">
        {/* <TableLoader/>
        <NoData/>
        <ServerError/>
        <Loadmore/> */}
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
                {departments?.data.map((item, key) => (
                  <tr key={key}>
                    <td>{counter++}</td>
                    <td>{item.department_name}</td>
                    <td><Status text="Active"></Status></td>
                    <td className='flex gap-3 justify-end'>
                        { item.department_is_active ? (
                            <>
                            <button className='tooltip' data-tooltip="Edit" onClick={handleEdit}><FaEdit className='text-gray-500' size={11}/></button>
                            <button className='tooltip' data-tooltip="Archive" onClick={handleArchive}><FaArchive className=' text-gray-500' size={10}/></button>
                            </>
                        ) :  (
                            <>
                             <button className='tooltip' data-tooltip="Restore" onClick={handleRestore}><MdRestore className=' text-gray-500' size={14}/></button>
                            <button className='tooltip' data-tooltip="Delete" onClick={handleDelete}><MdDelete className=' text-gray-500' size={13}/></button>
                            </>
                        )}
                        
                       
                    </td>
                </tr>  
                ) )}
                
            </tbody>
        </table>
    </div>
    </>
  )
}

export default DepartmentTable
