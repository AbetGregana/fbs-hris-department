import ModalSideWrapper from '@/components/partials/modal/ModalSideWrapper'
import { setIsCompanyInfoEdit } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import React from 'react'
import { GrFormClose } from 'react-icons/gr'

const ModalEditCompanyInfo = () => {
    const {store, dispatch} = React.useContext(StoreContext);

    const handleClose = () => {
        dispatch(setIsCompanyInfoEdit(false))
    };

  return (
    <>
    <ModalSideWrapper>
    <div className="modal">
        <div className="modal-title">
            <h2>Add Company Info</h2>
            <button onClick={handleClose}><GrFormClose size={25}/></button>
        </div>
        <div className="modal-content">
            <div className="modal-form  ">
                <div className="form-input">
                    <div className="input-wrapper my-4">
                        <span>*Company Name</span>
                        <input type="text" />
                    </div>
                    <div className="input-wrapper my-4">
                        <span>*Company Email</span>
                        <input type="text" />
                    </div>
                    <div className="input-wrapper my-4">
                        <span>*Company Phone</span>
                        <input type="text" />
                    </div>

                    <div className="flex gap-5 my-4"> 
                        <div className="input-wrapper !m-0">
                            <span>*Street</span>
                            <input type="text" />
                        </div>
                        <div className="input-wrapper !m-0">
                            <span>*City</span>
                            <input type="text" />
                        </div>
                    </div>
 
                    <div className="flex gap-5 my-4">
                        <div className="input-wrapper !m-0">
                            <span>*Province</span>
                            <input type="text" />
                        </div>
                        <div className="input-wrapper !m-0">
                            <span>*Postal</span>
                            <input type="text" />
                        </div>
                    </div>
                    
                    <div className="input-wrapper">
                        <span>*Country</span>
                        <input type="text" />
                    </div>
                    <div className="input-wrapper my-4">
                        <span>*Navigation Background Color</span>
                        <input type="text" />
                    </div>
                    <div className="input-wrapper my-4">
                        <span>*Sub Menu Color</span>
                        <input type="text" />
                    </div>
                    <div className="input-wrapper my-4">
                        <span>*Accent Color</span>
                        <input type="text" />
                    </div>
                    <div className="input-wrapper my-4">
                        <span>*Company Logo</span>
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

export default ModalEditCompanyInfo
