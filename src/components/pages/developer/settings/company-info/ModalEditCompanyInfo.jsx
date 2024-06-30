import { InputText } from '@/components/helpers/FormInputs'
import ModalSideWrapper from '@/components/partials/modal/ModalSideWrapper'
import { setIsAdd, setIsCompanyInfoEdit } from '@/store/storeAction'
import { StoreContext } from '@/store/storeContext'
import { Formik } from 'formik'
import React from 'react'
import { GrFormClose } from 'react-icons/gr'

const ModalEditCompanyInfo = () => {
    const {dispatch} = React.useContext(StoreContext);

    const handleClose = () => {
        dispatch(setIsAdd(false))
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
                <Formik>
                <div className="form-input">
                    <div className="input-wrapper my-4">
                        <InputText
                        label='*Company Name'
                        type='text'
                        name='company-name'
                        />
                    </div>
                    <div className="input-wrapper my-4">
                    <InputText
                        label='*Company Email'
                        type='text'
                        name='company-email'
                        />
                    </div>
                    <div className="input-wrapper my-4">
                    <InputText
                        label='*Company Phone'
                        type='text'
                        name='company-phone'
                        />
                    </div>

                    <div className="flex gap-5 my-4"> 
                        <div className="input-wrapper !m-0">
                          <InputText
                            label='*Street'
                            type='text'
                            name='street'
                            />  
                        </div>  
                        <div className="input-wrapper !m-0">
                            <InputText
                            label='*City'
                            type='text'
                            name='city'
                            />
                        </div>
                    </div>
 
                    <div className="flex gap-5 my-4">
                        <div className="input-wrapper !m-0">
                          <InputText
                            label='*Province'
                            type='text'
                            name='province'
                            />  
                        </div>
                        <div className="input-wrapper !m-0">
                          <InputText
                            label='*Postal'
                            type='text'
                            name='postal'
                            />  
                        </div>
                        
                    </div>
                    
                    <div className="input-wrapper">
                        <InputText
                            label='*Country'
                            type='text'
                            name='country'
                            /> 
                    </div>
                    <div className="input-wrapper my-4">
                        <InputText
                            label='*Navigation Background Color'
                            type='text'
                            name='navbg'
                            /> 
                    </div>
                    <div className="input-wrapper my-4">
                        <InputText
                            label='*Sub Menu Color'
                            type='text'
                            name='submenucolor'
                            /> 
                    </div>
                    <div className="input-wrapper my-4">
                        <InputText
                            label='*Accent Color'
                            type='text'
                            name='accent-color'
                            /> 
                    </div>
                    <div className="input-wrapper my-4">
                        <InputText
                            label='*Company Logo'
                            type='text'
                            name='company-logo'
                            /> 
                    </div>
                </div>
                </Formik>

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
