import { InputText } from "@/components/helpers/formInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";

const ModalAddParent = ({ dataEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = (child) => {
    dispatch(setIsAdd(false));
    dataEdit(child);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        dataEdit ? `/v2/parents/${dataEdit.parents_aid}` : "/v2/parents",
        dataEdit ? "PUT" : "POST",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["parents"] });

      // show error box
      if (!data.success) {
        // dispatch(setError(true));
        // dispatch(setMessage(data.error));
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      } else {
        console.log("Success");
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Successful!"));
        // dispatch(setIsAdd(false));
        // dispatch(setSuccess(true));
        // dispatch(setMessage(`Successfully ${itemEdit ? `updated` : `added`}.`));
      }
    },
  });

  const initVal = {
    parents_aid: dataEdit ? dataEdit.parents_aid : "",
    parents_name: dataEdit ? dataEdit.parents_name : "",
    parents_address: dataEdit ? dataEdit.parents_address : "",
    parents_email: dataEdit ? dataEdit.parents_email : "",
    parents_name_old: dataEdit ? dataEdit.parents_name : "",
  };
  const yupSchema = Yup.object({
    parents_name: Yup.string().required("I need you baby"),
    parents_address: Yup.string().required("I need you baby"),
    parents_email: Yup.string().required("I need you baby"),
  });

  return (
    <ModalSideWrapper>
      <main className="max-w-[400px] w-full bg-white p-4 h-full">
        <div className="flex justify-between mb-5">
          <h2>Add Parent</h2>
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
                    <InputText label="Name" name="parents_name" />
                  </div>
                  <div className="input-wrapper  ">
                    <InputText label="Address" name="parents_address" />
                  </div>
                  <div className="input-wrapper  ">
                    <InputText label="Email" name="parents_email" />
                  </div>
                </div>
                <div className="form-action flex gap-2 mb-7">
                  <button
                    className="p-2 bg-red-600 text-white min-w-[120px]"
                    type="submit"
                  >
                    Save
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

export default ModalAddParent;
