import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import ParentTable from "./ParentTable";
import { parents } from "./data";
import ModalAddParent from "./ModalAddParent";

const Parent = () => {
  const [isAdd, setIsAdd] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState(null);

  const handleAdd = () => {
    setIsAdd(true);
    setDataEdit(null);
  };
  return (
    <>
      <Header avatar="CC" />
      <div className="flex gap-3 min-h-[calc(100vh-50px)]">
        <Navigation menu="parent" />
        <div className="p-4 w-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl mb-5 font-bold"> Parent's List</h2>
            <button
              className="px-4 py-2 bg-red-700 text-white"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <ParentTable
            parents={parents}
            setDataEdit={setDataEdit}
            setIsAdd={setIsAdd}
          />
        </div>
      </div>
      {isAdd && <ModalAddParent setIsAdd={setIsAdd} dataEdit={dataEdit} />}
    </>
  );
};

export default Parent;
