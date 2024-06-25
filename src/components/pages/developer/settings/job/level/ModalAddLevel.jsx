import ModalSideWrapper from '@/components/partials/modal/ModalSideWrapper'
import { setIsAdd } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { GrFormClose } from 'react-icons/gr'

const ModalAddLevel = () => {
  const {store, dispatch} = React.useContext(StoreContext);

  const handleClose = () => {
    dispatch(setIsAdd(false))
  };

  return (
    <>
    <ModalSideWrapper>
      <div className="modal">
        <div className="modal-title">
          <h2>Add Job Level</h2>
          <button onClick={handleClose}><GrFormClose size={25}/></button>
        </div>
        <div className="modal-content">
          <div className="modal-form">
            <div className="form-input">
              <div className="input-wrapper top-2">
                <span className='p-1 z-10'>*Job Level Name</span>
                <input type="text" />
              </div>
            </div>
            <div className="form-action">
              <div className="form-btn">
                <button className='btn-save rounded-md'>Add</button>
                <button className='btn-discard rounded-md' onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalSideWrapper>
    </>
  )
}

export default ModalAddLevel
