import { queryData } from "@/components/helpers/queryData";
import { setIsDelete } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import {
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

const ModalDelete = ({ mysqlApiDelete, queryKey, item }) => {
  const { dispatch } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setIsDelete(false));

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlApiDelete, "delete", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      // dispatch(setIsDelete(false));

      if (!data.success) {
        // dispatch(setError(true));
        // dispatch(setMessage(data.error));
        console.log("May error!");
      } else {
        dispatch(setIsDelete(false));
        console.log("Naysuu!");
        // dispatch(setSuccess(true));
        // dispatch(setMessage(successMsg));
      }
    },
  });

  const handleYes = async () => {
    // mutate data
    mutation.mutate({
      item: item,
    });
  };
  return (
    <div className="modal fixed top-0 left-0 h-screen w-full flex justify-center items-center">
      <div className=" backdrop bg-black/80 h-full w-full absolute top-0 left-0 z-[-1] "></div>
      <div className="max-w-[450px] w-full bg-white rounded-md">
        <div className="flex justify-between items-center p-4 mb-4">
          <h2>Delete</h2>
          <button onClick={handleClose}>Close</button>
        </div>
        <div className="p-2">
          <h3>Are you sure you want to delete {item}?</h3>
          <div className="flex justify-end mt-5 gap-5">
            <button
              className="px-2 py-1.5 bg-red-700 text-white"
              onClick={handleYes}
            >
              Delete
            </button>
            <button
              className="px-2 py-1.5 bg-gray-200 text-gray-800"
              onClick={handleClose}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
