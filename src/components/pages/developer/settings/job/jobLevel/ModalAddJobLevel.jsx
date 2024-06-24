import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";

const ModalAddJobLevel = ({ jobLevelEdit }) => {
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
        jobLevelEdit
          ? `/v2/joblevel/${jobLevelEdit.joblevel_aid}`
          : "/v2/joblevel",
        jobLevelEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["joblevel"] });

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
    joblevel_aid: jobLevelEdit ? jobLevelEdit.joblevel_aid : "",
    joblevel_name: jobLevelEdit ? jobLevelEdit.joblevel_name : "",
    joblevel_name_old: jobLevelEdit ? jobLevelEdit.joblevel_name : "",
  };

  const yupSchema = Yup.object({
    joblevel_name: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>{jobLevelEdit ? "Edit" : "Add"} Job Level</h2>
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
                          id="joblevel_name"
                          label="Job Level Name"
                          name="joblevel_name"
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
    </>
  );
};

export default ModalAddJobLevel;
