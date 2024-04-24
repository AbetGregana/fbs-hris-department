import { InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";

const ModalAddServices = ({ dataEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        dataEdit ? `/v2/children/${dataEdit.services_aid}` : "/v2/children",
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
    services_aid: dataEdit ? dataEdit.services_aid : "",
    services_name: dataEdit ? dataEdit.services_name : "",
    services_supervisor_name: dataEdit ? dataEdit.services_supervisor_name : "",
    services_supervisor_email: dataEdit
      ? dataEdit.services_supervisor_email
      : "",
    services_name_old: dataEdit ? dataEdit.services_name : "",
  };
  const yupSchema = Yup.object({
    services_name: Yup.string().required("Required"),
    services_supervisor_name: Yup.string().required("Required"),
    services_saupervisor_email: Yup.string()
      .required("Required")
      .email("Invalid Email"),
  });

  return (
    <ModalSideWrapper>
      <main className="modal">
        <div className="modal-title ">
          <h3>Add Service</h3>
          <button onClick={handleClose}>
            <MdOutlineClose />
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
                <Form action="" className="modal-form ">
                  <div className="form-input">
                    <div className="input-wrapper">
                      <InputText
                        label="Services Name"
                        name="services_name"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                    <div className="input-wrapper">
                      <InputText
                        label="Services Department"
                        name="services_department"
                        type="text"
                        disabled={mutation.isPending}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="form-action flex gap-2">
            <button className="btn-save" type="submit">
              Save
            </button>
            <button className="btn-discard" type="reset" onClick={handleClose}>
              Discard
            </button>
          </div>
        </div>
      </main>
    </ModalSideWrapper>
  );
};

export default ModalAddServices;
