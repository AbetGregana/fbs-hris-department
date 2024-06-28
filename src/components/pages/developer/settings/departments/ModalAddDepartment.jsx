import { InputText } from '@/components/helpers/FormInputs';
import ModalSideWrapper from '@/components/partials/modal/ModalSideWrapper'
import { setError, setIsAdd, setMessage, setSuccess } from '@/store/storeAction';
import { StoreContext } from '@/store/storeContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import * as Yup from "yup";

const ModalAddDepartment = ({departmentEdit}) => {
    const {dispatch,store} = React.useContext(StoreContext);
    const [addValue, setAddValue] = React.useState("");

    const handleClose = () => {
        dispatch(setIsAdd(false));
    }

    const handleChange = (e) => {
        setAddValue(e.target.value);
      };

    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: (values) =>
        queryData(
          departmentEdit
            ? `/v2/departments/${departmentEdit.department_aid}`
            : "/v2/departments",
          departmentEdit ? "put" : "post",
          values
        ),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["department"] });
            if (data.success) {
                dispatch(setError(true));
                dispatch(setMessage(data.error));
                dispatch(setSuccess(false));
            } else {
                console.log("Success");
                dispatch(setIsAdd(false));
                dispatch(setSuccess(true));
                dispatch(setMessage("Successful!"));
            }
    
            },
    });

    const initVal = {
        department_aid: departmentEdit ? departmentEdit.department_aid : "",
        department_name: departmentEdit ? departmentEdit.department_name : ""
      };
      const yupSchema = Yup.object({
        department_name: Yup.string().required("Required"),
      });
  
   
  return (
    <ModalSideWrapper>
        <div className="modal">
            <div className="modal-title">
                <h2>{departmentEdit ? "Edit" : "Add"} Department</h2>
                <button onClick={handleClose}><GrFormClose size={25} /></button>
            </div>
            <div className="modal-content">
            <Formik
                        initialValues={initVal}
                        validationSchema={yupSchema}
                        onSubmit={async (values) => {
                            console.log(values)
                            mutation.mutate(values)
                        }}
                    >

                {(props) => {
                    console.log(props);
                    return (
                    <Form className="modal-form">
                    <div className="form-input">
                        <div className="input-wrapper mt-4">
                            <InputText
                            label='*Department Name'
                            type='text'
                            name='department_name'
                            disabled={mutation.isPending}
                            onChange={handleChange}
                            /> 
                        </div>
                    </div>
                    
                    <div className="form-action">
                        <div className="form-btn">
                            <button className='btn-save rounded-md' type='submit' disabled={!addValue} >Add</button>
                            <button className='btn-discard rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                    
                </Form>
                )}}
                
                </Formik>
            </div>
        </div>
    </ModalSideWrapper>
  )
}

export default ModalAddDepartment
