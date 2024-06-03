import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import { queryData } from "@/components/helpers/queryData";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import {
  setError,
  setIsAdd,
  setIsSearch,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";

const ModalAddJobTitle = ({ jobTitleEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    isLoading,
    isFetching,
    error,
    data: results,
  } = useQueryData(
    `/v2/joblevel`, // endpoint
    "get", // method
    "joblevels" // key
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        jobTitleEdit
          ? `/v2/jobtitle/${jobTitleEdit.jobtitle_aid}`
          : "/v2/jobtitle",
        jobTitleEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["jobtitle"] });

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
    jobtitle_aid: jobTitleEdit ? jobTitleEdit.jobtitle_aid : "",
    jobtitle_joblevel_id: jobTitleEdit ? jobTitleEdit.jobtitle_joblevel_id : "",
    jobtitle_name: jobTitleEdit ? jobTitleEdit.jobtitle_name : "",
    jobtitle_name_old: jobTitleEdit ? jobTitleEdit.jobtitle_name : "",
  };

  const yupSchema = Yup.object({
    jobtitle_name: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
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
                        <div className="relative w-full ">
                          <InputSelect
                            label="Job Level"
                            name="jobtitle_joblevel_id"
                            className="h-[40px] py-0 "
                            disabled={mutation.isPending}
                            onChange={handleChange}
                            // value={jobLevelStatus}
                            // onChange={(e) => handleChangeJobLevelStatus(e)}
                            // disabled={isFetching || status === "pending"}
                          >
                            {results?.count === 0 && (
                              <option value="">No data</option>
                            )}
                            <option value="" hidden></option>
                            {results?.data.map((item, key) => {
                              return (
                                <>
                                  {item.joblevel_is_active === 1 && (
                                    <option key={key} value={item.joblevel_aid}>
                                      {item.joblevel_name}
                                    </option>
                                  )}
                                </>
                              );
                            })}
                          </InputSelect>
                        </div>
                        <div className="input-wrapper">
                          <InputText
                            id="jobtitle_name"
                            label="Job Title Name"
                            name="jobtitle_name"
                            className="relative"
                            disabled={mutation.isPending}
                            onChange={handleChange}
                          />
                        </div>
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

export default ModalAddJobTitle;
