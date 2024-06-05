import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import OtherTable from "./OtherTable";
import ModalAddOther from "./ModalAddOther";
import { setIsAdd } from "@/store/storeAction";

const OtherList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const [roleEdit, setRoleEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="settings" submenu="users" />
        <div className=" px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between ">
          <div className="h-screen">
            <div className="list-content">
              <BreadCrumbs param={location.search} />
              <button className="btn-add " onClick={handleAdd}>
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <h2 className="text-lg font-bold -translate-y-5">Users Other</h2>
            <OtherTable />
          </div>
          <Footer />
        </div>
      </div>
      {store.isAdd && <ModalAddOther />}
    </>
  );
};

export default OtherList;
