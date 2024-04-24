import { setSuccess } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
const ModalSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => dispatch(setSuccess(false));

  return (
    <div className="modal fixed top-0 left-0 h-screen w-full flex justify-center items-center">
      <div className=" backdrop bg-black/80 h-full w-full absolute top-0 left-0 z-[-1] "></div>
      <div className="max-w-[450px] w-full bg-white rounded-md">
        <div className="flex justify-between items-center p-4 mb-4">
          <h2>Success</h2>
          <button onClick={handleClose}>Close</button>
        </div>
        <div className="p-2">
          <h3>{store.message}</h3>
          <div className="flex justify-end mt-5 gap-5">
            <button
              className="px-2 py-1.5 bg-gray-200 text-gray-800"
              onClick={handleClose}
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
