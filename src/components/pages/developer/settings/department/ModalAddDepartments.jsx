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
import ModalSuccess from "@/components/partials/modal/ModalSuccess";

const ModalAddDepartments = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  console.log(itemEdit);

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
          <h2>{itemEdit ? "Edit" : "Add"} Department</h2>
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
                        id="departments_name"
                        label="Department Name"
                        name="departments_name"
                        disabled={mutation.isPending}
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
  );
};

export default ModalAddDepartments;
