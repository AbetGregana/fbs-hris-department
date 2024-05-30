import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { Formik, Form } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const ModalAddJobTitle = () => {
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
    data: result,
  } = useQueryData(
    `/v2/joblevel`, // endpoint
    "get", // method
    "joblevels" // key
  );

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
            <Formik>
              {(props) => {
                console.log(props);
                return (
                  <Form className="modal-form">
                    <div className="form-input">
                      <div className="input-wrapper">
                        <div className="relative w-full ">
                          <label>Job Level</label>
                          <select
                            name="status"
                            // value={jobLevelStatus}
                            // onChange={(e) => handleChangeJobLevelStatus(e)}
                            // disabled={isFetching || status === "pending"}
                            className="h-[40px] py-0 "
                          >
                            {result?.count === 0 && (
                              <option value="">No data</option>
                            )}
                            {result?.count > 0 &&
                              result?.data.map((item, key) => {
                                return (
                                  <option key={key} value={item.joblevel_aid}>
                                    {item.joblevel_name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <InputText
                          id="jobtitle_name"
                          label="Job Title Name"
                          name="jobtitle_name"
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
                          <ButtonSpinner /> Save
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
