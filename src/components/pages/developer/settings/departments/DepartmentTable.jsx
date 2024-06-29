
import SearchBarWithFilterStatus from '@/components/partials/SearchBarWithFilterStatus'
import Status from '@/components/partials/Status'
import ModalArchive from '@/components/partials/modal/ModalArchive'
import ModalDelete from '@/components/partials/modal/ModalDelete'
import ModalRestore from '@/components/partials/modal/ModalRestore'
import { setIsAdd, setIsArchive, setIsDelete, setIsDepartmentInfoEdit, setIsRestore } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { FaArchive, FaEdit } from 'react-icons/fa'
import { MdDelete, MdRestore } from 'react-icons/md'

const DepartmentTable = ({setDepartmentEdit, departments}) => {
    const {store, dispatch} = React.useContext(StoreContext);
    const [isArchiving, setIsArchiving] = React.useState(false)
    const [id, setId] = React.useState(""); 
    const [isData, setIsData] = React.useState("");
    let counter = 1;

   

    const handleEdit = (item) => {
        dispatch(setIsAdd(true))
        setDepartmentEdit(item);
    };

    const handleArchive = (item) => {
        setIsData(item.department_name)
        dispatch(setIsArchive(true))
        setId(item.department_aid)
        setIsArchiving(true)
        setIsRestore(false)
    }

    const handleRestore = (item) => {
        setIsData(item.department_name)
        dispatch(setIsRestore(true))
        setId(item.department_aid)
        setIsArchiving(false)
        setIsRestore(true)
    }

    const handleDelete = (item) => {
        setIsData(item.department_name)
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
                    <td>{counter++}.</td>
                    <td>{item.department_name}</td>
                    <td>{item.department_is_active === 1 ? (<Status text="Active"/>) : (<Status text="Inactive"/>)}</td>
                    <td className='flex gap-3 justify-end'>
                        { item.department_is_active ? (
                            <>
                            <button className='tooltip' data-tooltip="Edit" onClick={() => handleEdit(item)}><FaEdit className='text-gray-500' size={11}/></button>
                            <button className='tooltip' data-tooltip="Archive" onClick={() =>handleArchive(item)}><FaArchive className=' text-gray-500' size={10}/></button>
                            </>
                        ) :  (
                            <>
                             <button className='tooltip' data-tooltip="Restore" onClick={() => handleRestore(item)}><MdRestore className=' text-gray-500' size={14}/></button>
                            <button className='tooltip' data-tooltip="Delete" onClick={() =>handleDelete(item)}><MdDelete className=' text-gray-500' size={13}/></button>
                            </>
                        )}
                    </td>
                </tr>  
                ) )}
                
            </tbody>
        </table>
    </div>
    {store.isArchive && (<ModalArchive setIsArchive={setIsArchive} queryKey={"departments"} mysqlEndpoint={`/v2/departments/active/${id}`} item={isData} archive={isArchiving}/>)}
    {store.isDelete && (<ModalDelete setIsDelete={setIsDelete} queryKey={"departments"} mysqlEndpoint={`/v2/departments/${id}`} item={isData}/>)}
    {store.isRestore && (<ModalRestore setIsRestore={setIsRestore} queryKey={"departments"} mysqlEndpoint={`/v2/departments/active/${id}`} item={isData}/>)}
   
    </>
  )
}

export default DepartmentTable
