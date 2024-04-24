// don't forget to import
import { InputText } from "@/components/helpers/FormInputs";
import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "@/components/helpers/queryData";

const ModalAddChildren = ({ setIsAdd, dataEdit }) => {
  const handleClose = () => {
    setIsAdd(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        dataEdit ? `/v2/children/${dataEdit.children_aid}` : "/v2/children",
        dataEdit ? "PUT" : "POST",
        values
      ), //kaya may ganito para sya ang bahala na mapapunta sa api ang data
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["children"] });

      // show error box
      if (!data.success) {
        // dispatch(setError(true));
        // dispatch(setMessage(data.error));
        console.log("error");
      } else {
        setIsAdd(false); //para kapag nag success ay mag close ang modal
        // dispatch(setIsAdd(false));
        // dispatch(setSuccess(true));
        // dispatch(setMessage(`Successfully ${itemEdit ? `updated` : `added`}.`));
        console.log("success");
      }
    },
  });

  const initVal = {
    children_aid: dataEdit ? dataEdit.children_aid : " ",
    children_name: dataEdit ? dataEdit.children_name : " ",
    children_address: dataEdit ? dataEdit.children_address : " ",
    children_email: dataEdit ? dataEdit.children_email : " ",
  };

  //ginagamit para sa lalabas kapag incomplete ang data na inilagay
  const yupSchema = Yup.object({
    children_name: Yup.string().required("Where is the data?"),
    children_address: Yup.string().required("Where is the data?"),
    children_email: Yup.string().required("Where is the data?"),
  });

  return (
    <ModalSideWrapper>
      <main className="max-w-[400px] w-full bg-white p-4 h-full">
        <div className="flex justify-between mb-5">
          <h2>Add Children</h2>
          <button onClick={handleClose}>
            <IoIosClose />
          </button>
        </div>

        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            //kapag nag submit
            // mutate data
            mutation.mutate(values); //kukunin nito yung data
          }}
        >
          {(props) => {
            return (
              <Form className="flex flex-col h-full">
                <div className="grow ">
                  <div className="input-wrapper ">
                    <InputText label="Name" name="children_name" />
                  </div>
                  <div className="input-wrapper ">
                    <InputText label="Address" name="children_address" />
                  </div>
                  <div className="input-wrapper ">
                    <InputText label="Email" name="children_email" />
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

export default ModalAddChildren;
