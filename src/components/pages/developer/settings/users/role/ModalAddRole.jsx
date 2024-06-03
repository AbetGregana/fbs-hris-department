import { InputArea, InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { Formik, Form } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
const ModalAddRole = ({ roleEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const initVal = {
    role_aid: roleEdit ? roleEdit.role_aid : "",
    role_name: roleEdit ? roleEdit.role_name : "",
    role_name_old: roleEdit ? roleEdit.role_name : "",
  };

  const yupSchema = Yup.object({
    role_name: Yup.string().required("Required"),
    role_description: Yup.string().required("Required"),
  });
  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>Add Role</h2>
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
                          id="role_name"
                          label="Role Name"
                          name="role_name"
                          //   disabled={mutation.isPending}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-wrapper">
                        <InputArea
                          id="role_description"
                          label="Role Description"
                          name="role_description"
                          className="pb-[10rem] pt-[1rem] relative"
                          //   disabled={mutation.isPending}
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

export default ModalAddRole;
