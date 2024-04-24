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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { MdOutlineClose } from "react-icons/md";

const ModalAddPosition = ({ dataEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsAdd(false));
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

  const initVal = { position_name: "" };
  const yupSchema = Yup.object({
    position_name: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>Add Service</h2>
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
                  <Form action="" className="modal-form">
                    <div className="form-input">
                      <div className="input-wrapper">
                        <InputText
                          label="Position Name"
                          name="position_name"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Position Department"
                          name="position_department"
                          type="text"
                          disabled={mutation.isPending}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputText
                          label="Position Supervisor"
                          name="position_supervisor"
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
              <button
                className="btn-discard"
                type="reset"
                onClick={handleClose}
              >
                Discard
              </button>
            </div>
          </div>
        </main>
      </ModalSideWrapper>
    </>
  );
};

export default ModalAddPosition;
