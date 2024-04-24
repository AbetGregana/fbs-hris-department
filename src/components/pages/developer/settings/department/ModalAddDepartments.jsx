import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import { setError, setIsAdd, setMessage } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";

const ModalAddDepartments = ({ dataEdit }) => {
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
        dataEdit ? `/v2/children/${dataEdit.children_aid}` : "/v2/children",
        dataEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["children"] });

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successful!"));
      }
    },
  });

  const initVal = {
    department_aid: dataEdit ? dataEdit.department_aid : "",
    department_name: dataEdit ? dataEdit.department_name : "",
    department_supervisor_name: dataEdit
      ? dataEdit.department_supervisor_name
      : "",
    department_supervisor_email: dataEdit
      ? dataEdit.department_supervisor_email
      : "",
    department_name_old: dataEdit ? dataEdit.department_name : "",
  };
  const yupSchema = Yup.object({
    department_name: Yup.string().required("Required"),
    department_supervisor_name: Yup.string().required("Required"),
    department_supervisor_email: Yup.string()
      .required("Required")
      .email("Invalid Email"),
  });

  return (
    <ModalSideWrapper>
      <main className="modal">
        <div className="modal-title">
          <h2>Add Department</h2>
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
              return (
                <Form className="modal-form">
                  <div className="form-input">
                    <div className="input-wrapper">
                      <InputText
                        label="Department Name"
                        name="department_name"
                        type="text"
                        disabled={mutation.isPending}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="form-action ">
            <div className="form-btn">
              <button className="btn-save" type="submit" disabled={!value}>
                <ButtonSpinner />
                Save
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
        </div>
      </main>
    </ModalSideWrapper>
  );
};

export default ModalAddDepartments;
