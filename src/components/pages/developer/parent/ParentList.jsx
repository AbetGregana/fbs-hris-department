import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { magulang } from "./data";
import ModalAddParent from "./ModalAddParent";
import ParentsTable from "./ParentTable";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd } from "@/store/storeAction";
import ModalSuccess from "@/components/partials/modal/modalSuccess";
import ModalError from "@/components/partials/modal/ModalError";
const ParentList = () => {
  // const [isAdd, setIsAdd] = React.useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataEdit, setDataEdit] = React.useState(null);
  const handleAdd = () => {
    setDataEdit(null);
    dispatch(setIsAdd(true));
  };
  console.log(store.isAdd);
  return (
    <>
      <Header avatar="AG" />
      <div className="flex gap-3 min-h-[calc(100vh-53px)]">
        <Navigation menu="parent" />
        <div className="p-4 w-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl mb-5 font-bold">Parent's List</h2>
            <button
              className="py-2 px-4 bg-red-700 text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <ParentsTable
            magulang={magulang}
            setIsAdd={setIsAdd}
            setDataEdit={setDataEdit}
          />
        </div>
        {store.isAdd && <ModalAddParent dataEdit={dataEdit} />}
        {store.success && <ModalSuccess />}
        {store.error && <ModalError />}
      </div>
    </>
  );
};

export default ParentList;
