import React from 'react'
import { FaUserGroup } from 'react-icons/fa6'
import { MdOutlineSearch } from 'react-icons/md'

const JobLevelTable = () => {
  return (
    <>
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
        <div className="input-wrapper w-[120px] relative">
            <span htmlFor="" className='p-1 z-50'>Status</span>
            <select className='relative'>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
        </div>
        <div className="count flex items-center gap-2">
            <span><FaUserGroup className='text-gray-500'/></span>
            <h3 className='text-gray-500'>2</h3>
        </div>
        </div>
        <div className="search relative ">
            <MdOutlineSearch className='absolute z-50 m-2' size={18}/>
            <input type="text" placeholder='       Search here...' className='h-[2rem]'/>
        </div>
    </div>
    </>
  )
}

export default JobLevelTable
