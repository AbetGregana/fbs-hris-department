import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import EmployeesTable from "./EmployeesTable";
import Footer from "@/components/partials/Footer";
import { StoreContext } from "@/store/storeContext";
import ModalAddEmployees from "./ModalAddEmployees";
import { setIsAdd } from "@/store/storeAction";

const EmployeesList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="employees" />
        <div className=" px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between ">
          <div className="h-screen">
            <div className="list-content">
              <h2 className="text-lg font-bold ">Employees</h2>
              <button className="btn-add" onClick={handleAdd}>
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <EmployeesTable />
          </div>
          <Footer />
        </div>
      </div>
      {store.isAdd && <ModalAddEmployees />}
    </>
  );
};

export default EmployeesList;
