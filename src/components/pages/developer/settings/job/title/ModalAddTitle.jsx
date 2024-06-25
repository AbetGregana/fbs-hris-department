import ModalSideWrapper from '@/components/partials/modal/ModalSideWrapper'
import { setIsAdd } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { GrFormClose } from 'react-icons/gr'

const ModalAddTitle = () => {
    const {store, dispatch} = React.useContext(StoreContext);

    const handleClose = () => {
        dispatch(setIsAdd(false))
    };

  return (
    <>
    <ModalSideWrapper>
        <div className="modal">
            <div className="modal-title">
                <h2>Add Job Title</h2>
                <button onClick={handleClose}><GrFormClose size={25}/></button>
            </div>
            <div className="modal-content">
                <div className="modal-form">
                    <div className="form-input">
                        <div className="input-wrapper top-2">
                            <span className='p-1 z-10'>*Job Entry Level</span>
                            <select name="" id="">
                                <option value="" hidden></option>
                                <option value="entry-level">Entry-level</option>
                                <option value="intermediate">Intermediate or experienced (senior staff)</option>
                            </select>
                        </div>
                        <div className="input-wrapper top-5">
                            <span className='p-1 z-10'>*Job Title</span>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="form-action">
                        <div className="form-btn">
                            <button className='btn-save rounded-md'>Add</button>
                            <button className='btn-discard rounded-md'>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ModalSideWrapper>
    </>
  )
}

export default ModalAddTitle
