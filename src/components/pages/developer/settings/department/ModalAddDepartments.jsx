import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { queryData } from "@/components/helpers/queryData";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ModalAddDepartments = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `/v2/departments/${itemEdit.departments_aid}`
          : "/v2/departments",
        itemEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["departments"] });

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
    departments_aid: itemEdit ? itemEdit.departments_aid : "",
    departments_name: itemEdit ? itemEdit.departments_name : "",
    departments_name_old: itemEdit ? itemEdit.departments_name : "",
  };
  const yupSchema = Yup.object({
    departments_name: Yup.string().required("Required"),
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
              console.log(props);
              return (
                <Form className="modal-form">
                  <div className="form-input">
                    <div className="input-wrapper">
                      <InputText
                        label="Department Name"
                        name="departments_name"
                        // disabled={mutation.isPending}
                        // value={value}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-action ">
                    <div className="form-btn">
                      <button
                        className="btn-save"
                        type="submit"
                        disabled={mutation.isPending}
                      >
                        {/* disabled={!value} */}
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
  );
};

export default ModalAddDepartments;
