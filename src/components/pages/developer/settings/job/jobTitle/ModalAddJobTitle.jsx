import { InputSelect, InputText } from "@/components/helpers/FormInputs";
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
                        <InputSelect
                          label="Job Title Level"
                          name="jobtitle_level"
                          onChange={handleChange}
                        >
                          <option value="entry-level">Entry Level</option>
                          <option value="junior-level">Junior Level</option>
                          <option value="managerial-level">
                            Managerial Level
                          </option>
                        </InputSelect>
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
