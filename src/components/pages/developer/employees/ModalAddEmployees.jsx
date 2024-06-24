import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StoreContext } from "@/store/storeContext";
import * as Yup from "yup";
const ModalAddEmployees = ({ employeesEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        employeesEdit
          ? `/v2/departments/${employeesEdit.departments_aid}`
          : "/v2/departments",
        employeesEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["departments"] });

      // show error box
      if (!data.success) {
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
    departments_aid: employeesEdit ? employeesEdit.departments_aid : "",
    departments_name: employeesEdit ? employeesEdit.departments_name : "",
    departments_name_old: employeesEdit ? employeesEdit.departments_name : "",
  };
  const yupSchema = Yup.object({
    employees_last_name: Yup.string().required("Required"),
    employees_first_name: Yup.string().required("Required"),
    employees_middle_name: Yup.string().required("Required"),
    employees_work_email: Yup.string().required("Required"),
    employees_job_title_id: Yup.string().required("Required"),
    employees_job_level_id: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>{employeesEdit ? "Edit" : "Add"} Employee</h2>
            <button onClick={handleClose}>
              <GrFormClose size={25} />
            </button>
          </div>
          <div className="modal-content">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                console.log(props);
                return (
                  <Form className="modal-form">
                    <div className="form-input">
                      <div className="input-wrapper">
                        <InputText
                          label="Last Name"
                          name="employees_last_name"
                          // disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="First Name"
                          name="employees_first_name"
                          // disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Middle Name"
                          name="employees_middle_name"
                          // disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Work Email"
                          name="employees_work_email"
                          // disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputSelect
                          label="Job Title"
                          name="employees_job_title_id"
                          // disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Job Level"
                          name="employees_job_level_id"
                          // disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-action ">
                      <div className="form-btn">
                        <button
                          className="btn-save"
                          type="submit"
                          disabled={!value}
                        >
                          {console.log(mutation.isPending)}
                          {mutation.isPending ? <ButtonSpinner /> : "Save"}
                        </button>
                        <button
                          className="btn-discard"
                          type="reset"
                          onClick={handleClose}
                        >
                          Discard
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </main>
      </ModalSideWrapper>
    </>
  );
};

export default ModalAddEmployees;
