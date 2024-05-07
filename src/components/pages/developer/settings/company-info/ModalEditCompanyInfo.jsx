import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import { setIsCompanyInfoEdit } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { Formik, Form } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
const ModalEditCompanyInfo = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");
  const handleClose = () => {
    dispatch(setIsCompanyInfoEdit(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const yupSchema = Yup.object({
    departments_name: Yup.string().required("Required"),
  });
  return (
    <ModalSideWrapper>
      <main className="modal">
        <div className="modal-title">
          <h2>Update Company Info</h2>
          <button onClick={handleClose}>
            <GrFormClose size={25} />
          </button>
        </div>
        <div className="modal-content">
          <Formik validationSchema={yupSchema}>
            {(props) => {
              console.log(props);
              return (
                <Form className="modal-form">
                  <div className="form-input">
                    <div className="input-wrapper">
                      <InputText
                        id="company_name"
                        label="Company Name"
                        name="company_name"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_email"
                        label="Company Email"
                        name="company_email"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_phone"
                        label="Company Phone"
                        name="company_phone"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_street"
                        label="Company Street"
                        name="company_street"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_city"
                        label="Company City"
                        name="company_city"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_province"
                        label="Company Province"
                        name="company_name"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_postal"
                        label="Company Postal"
                        name="company_postal"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_country"
                        label="Company Country"
                        name="company_country"
                        onChange={handleChange}
                      />
                      <InputText
                        id="navigation_bgc"
                        label="Navigation Background Color"
                        name="navigation_bgc"
                        onChange={handleChange}
                      />
                      <InputText
                        id="submenu_color"
                        label="Sub Menu Color"
                        name="submenu_color"
                        onChange={handleChange}
                      />
                      <InputText
                        id="accent_color"
                        label="Accent Color"
                        name="accent_color"
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_logo"
                        label="Company Logo"
                        name="company_logo"
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
                        {/* <ButtonSpinner /> */}
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </main>
    </ModalSideWrapper>
  );
};

export default ModalEditCompanyInfo;
