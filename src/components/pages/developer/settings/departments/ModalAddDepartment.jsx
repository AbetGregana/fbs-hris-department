import { InputText } from '@/components/helpers/FormInputs';
import ModalSideWrapper from '@/components/partials/modal/ModalSideWrapper'
import { setIsAdd } from '@/store/storeAction';
import { StoreContext } from '@/store/storeContext';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'

const ModalAddDepartment = ({departmentEdit}) => {
    const {dispatch,store} = React.useContext(StoreContext);
    const [addValue, setAddValue] = React.useState("");

    const handleClose = () => {
        dispatch(setIsAdd(false));
    }

    const handleChange = (e) =>{
        setAddValue(e.target.value);
    }
   
  return (
    <ModalSideWrapper>
        <div className="modal">
            <div className="modal-title">
                <h2>Add Department</h2>
                <button onClick={handleClose}><GrFormClose size={25} /></button>
            </div>
            <div className="modal-content">
                <div className="modal-form">
                    <Formik>
                    <div className="form-input">
                        <div className="input-wrapper mt-4">
                            <InputText
                            label='*Department Name'
                            type='text'
                            name='department-name'
                            onChange={handleChange}
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
  )
}

export default ModalAddDepartment
