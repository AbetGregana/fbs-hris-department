import useQueryData from "@/components/custom-hooks/useQueryData";
import { InputSelect, InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { Form, Formik } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
const ModalAddOther = ({ otherEdit }) => {
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
    `/v2/role`, // endpoint
    "get", // method
    "roles" // key
  );
  const initVal = {
    other_aid: otherEdit ? otherEdit.other_aid : "",
    other_role: otherEdit ? otherEdit.other_role : "",
    other_role_old: otherEdit ? otherEdit.other_role : "",
    other_subscriber: otherEdit ? otherEdit.other_subscriber : "",
    other_employee: otherEdit ? otherEdit.other_employee : "",
  };

  const yupSchema = Yup.object({
    other_role: Yup.string().required("Required"),
    other_subscriber: Yup.string().required("Required"),
    other_employee: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>Add Other User</h2>
            <button>
              <GrFormClose size={25} onClick={handleClose} />
            </button>
          </div>
          <div className="modal-content">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              //   onSubmit={async (values, { setSubmitting, resetForm }) => {
              //     // mutate data
              //     mutation.mutate(values);
              //   }}
            >
              {(props) => {
                console.log(props);
                return (
                  <Form className="modal-form">
                    <div className="form-input">
                      <div className="input-wrapper">
                        <div className="relative w-full ">
                          <InputSelect
                            label="Role"
                            name="other_role"
                            className="h-[40px] py-0 "
                            // disabled={mutation.isPending}
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
                                  {item.role_is_active === 1 && (
                                    <option key={key} value={item.role_aid}>
                                      {item.role_name}
                                    </option>
                                  )}
                                </>
                              );
                            })}
                          </InputSelect>
                        </div>
                        <div className="input-wrapper">
                          <InputText
                            label="Subscriber"
                            name="other_subscriber"
                            className="relative"
                            // disabled={mutation.isPending}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="input-wrapper">
                          <InputText
                            label="Employee"
                            name="other_employee"
                            className="relative"
                            // disabled={mutation.isPending}
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
                          {/* {console.log(mutation.isPending)} */}
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

export default ModalAddOther;
