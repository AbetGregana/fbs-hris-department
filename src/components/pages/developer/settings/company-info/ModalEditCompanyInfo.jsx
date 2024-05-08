import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
import {
  setError,
  setIsAdd,
  setIsCompanyInfoEdit,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import * as Yup from "yup";
const ModalEditCompanyInfo = ({ companyEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [value, setValue] = React.useState("");

  const handleClose = () => {
    dispatch(setIsCompanyInfoEdit(false));
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  console.log(companyEdit);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        companyEdit ? `/v2/company/${companyEdit.company_aid}` : "/v2/company",
        companyEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["company"] });

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
    company_aid: companyEdit ? companyEdit.company_aid : "",
    company_name: companyEdit ? companyEdit.company_name : "",
    company_name_old: companyEdit ? companyEdit.company_name : "",
    company_email: companyEdit ? companyEdit.company_email : "",
    company_email_old: companyEdit ? companyEdit.company_email : "",
    company_phone: companyEdit ? companyEdit.company_phone : "",
    company_phone_old: companyEdit ? companyEdit.company_phone : "",
    company_street: companyEdit ? companyEdit.company_street : "",
    company_street_old: companyEdit ? companyEdit.company_street : "",
    company_city: companyEdit ? companyEdit.company_city : "",
    company_city_old: companyEdit ? companyEdit.company_city : "",
    company_province: companyEdit ? companyEdit.company_province : "",
    company_province_old: companyEdit ? companyEdit.company_province : "",
    company_postal: companyEdit ? companyEdit.company_postal : "",
    company_postal_old: companyEdit ? companyEdit.company_postal : "",
    company_country: companyEdit ? companyEdit.company_country : "",
    company_country_old: companyEdit ? companyEdit.company_country : "",
    navigation_bgc: companyEdit ? companyEdit.navigation_bgc : "",
    navigation_bgc_old: companyEdit ? companyEdit.navigation_bgc : "",
    submenu_color: companyEdit ? companyEdit.submenu_color : "",
    submenu_color_old: companyEdit ? companyEdit.submenu_color : "",
    accent_color: companyEdit ? companyEdit.accent_color : "",
    accent_color_old: companyEdit ? companyEdit.accent_color : "",
    company_logo: companyEdit ? companyEdit.company_logo : "",
    company_logo_old: companyEdit ? companyEdit.company_logo : "",
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
                        id="company_name"
                        label="Company Name"
                        name="company_name"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_email"
                        label="Company Email"
                        name="company_email"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_phone"
                        label="Company Phone"
                        name="company_phone"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_street"
                        label="Company Street"
                        name="company_street"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_city"
                        label="Company City"
                        name="company_city"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_province"
                        label="Company Province"
                        name="company_province"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_postal"
                        label="Company Postal"
                        name="company_postal"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_country"
                        label="Company Country"
                        name="company_country"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="navigation_bgc"
                        label="Navigation Background Color"
                        name="navigation_bgc"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="submenu_color"
                        label="Sub Menu Color"
                        name="submenu_color"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="accent_color"
                        label="Accent Color"
                        name="accent_color"
                        disabled={mutation.isPending}
                        onChange={handleChange}
                      />
                      <InputText
                        id="company_logo"
                        label="Company Logo"
                        name="company_logo"
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

export default ModalEditCompanyInfo;
