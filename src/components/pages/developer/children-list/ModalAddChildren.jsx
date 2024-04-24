import { InputText } from "@/components/helpers/formInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import { StoreContext } from "@/store/storeContext";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "@/store/storeAction";
import ButtonSpinner from "@/components/partials/spinner/ButtonSpinner";
const ModalAddChildren = ({ dataEdit }) => {
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

  const initVal = {
    children_aid: dataEdit ? dataEdit.children_aid : "",
    children_name: dataEdit ? dataEdit.children_name : "",
    children_address: dataEdit ? dataEdit.children_address : "",
    children_email: dataEdit ? dataEdit.children_email : "",
    children_name_old: dataEdit ? dataEdit.children_name : "",
  };
  const yupSchema = Yup.object({
    children_name: Yup.string().required("I need you baby"),
    children_address: Yup.string().required("I need you baby"),
    children_email: Yup.string()
      .required("I need you baby")
      .email("Invalid Email"),
  });

  return (
    <ModalSideWrapper>
      <main className="max-w-[400px] w-full bg-white p-4 h-full">
        <div className="flex justify-between mb-5">
          <h2>Add Children</h2>
          <button onClick={handleClose}>
            <MdOutlineClose />
          </button>
        </div>
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
              <Form className="h-full flex flex-col">
                <div className="grow">
                  <div className="input-wrapper  ">
                    <InputText label="Name" name="children_name" />
                  </div>
                  <div className="input-wrapper  ">
                    <InputText label="Address" name="children_address" />
                  </div>
                  <div className="input-wrapper  ">
                    <InputText label="Email" name="children_email" />
                  </div>
                </div>
                <div className="form-action flex gap-2 mb-7">
                  <button
                    className="p-2 bg-red-600 text-white min-w-[120px]"
                    type="submit"
                    disabled={mutation.isPending}
                  >
                    {console.log(mutation.isPending)}
                    {mutation.isPending ? <ButtonSpinner /> : "Save"}
                  </button>
                  <button
                    className="p-2 bg-gray-200 text-gray-900 min-w-[120px]"
                    type="reset"
                    onClick={handleClose}
                  >
                    Discard
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </main>
    </ModalSideWrapper>
  );
};

export default ModalAddChildren;
