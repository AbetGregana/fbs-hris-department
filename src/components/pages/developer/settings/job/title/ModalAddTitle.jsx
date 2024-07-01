import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import { setError, setIsAdd, setMessage, setSuccess } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddTitle = ({jobtitleEdit}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [addValue, setAddValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handleChange = (e) => {
    setAddValue(e.target.value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        jobtitleEdit
          ? `/v2/jobtitle/${jobtitleEdit.jobLevel_aid}`
          : `/v2/jobtitle`,
        jobtitleEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobtitle"] });
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
        dispatch(setSuccess(false));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Successfully ${jobtitleEdit ? "Updated" : "Added"}.`)
        );
      }
    },
  });

  const initVal = {
    jobTitle_aid: jobtitleEdit ? jobtitleEdit.jobTitle_aid : "",
    jobTitle_level: jobtitleEdit ? jobtitleEdit.jobTitle_level : "",
    jobTitle_title: jobtitleEdit ? jobtitleEdit.jobTitle_title : "",

    jobTitle_level_old: jobtitleEdit ? jobtitleEdit.jobTitle_level : "",
    jobTitle_title_old: jobtitleEdit ? jobtitleEdit.jobTitle_title : "",
  };
  const yupSchema = Yup.object({
    jobTitle_level: Yup.string().required("Required"),
    jobTitle_title: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <div className="modal">
          <div className="modal-title">
            <h2>Add Job Title</h2>
            <button onClick={handleClose}>
              <GrFormClose size={25} />
            </button>
          </div>
          <div className="modal-content">
             <Formik
             initialValues={initVal}
             validationSchema={yupSchema}
             onSubmit={async (values) => {
                 console.log(values)
                 mutation.mutate(values);
             }}
             >
                {(props) => {
                    console.log(props);
                    return(
                      <Form className="modal-form">
             
                <div className="form-input">
                  <div className="input-wrapper mt-4">
                    <InputSelect label="*Job Entry Level" name="jobTitle_level"  disabled={mutation.isPending}
                      onChange={handleChange}>
                      <option value="" hidden></option>
                      <option value="entry-level">Entry-level</option>
                      <option value="intermediate">
                        Intermediate or experienced (senior staff)
                      </option>
                    </InputSelect>
                  </div>
                  <div className="input-wrapper mt-4">
                    <InputText
                      label="*Job Title"
                      type="text"
                      name="jobTitle_title"
                      disabled={mutation.isPending}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              
              <div className="form-action">
                <div className="form-btn">
                  <button className="btn-save rounded-md" type="submit">Add</button>
                  <button
                    className="btn-discard rounded-md"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>  
                    );
                }}
            
            </Formik>
          </div>
        </div>
      </ModalSideWrapper>
    </>
  );
};

export default ModalAddTitle;
