import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import { setIsAdd, setIsSettingsOpen } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import DepartmentsTable from "./DepartmentsTable";
import ModalAddDepartments from "./ModalAddDepartments";
import ModalError from "@/components/partials/modal/ModalError";
import SearchDepartments from "./SearchDepartments";
const DepartmentsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  console.log(store.isAdd);
  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="settings" submenu="departments" />
        <div className=" px-4 py-1 pb-0 w-full flex flex-col justify-between ">
          <div>
            <div className="list-content">
              <h2>Department</h2>
              <button className="btn-add " onClick={handleAdd}>
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <SearchDepartments />
            <DepartmentsTable setIsAdd={setIsAdd} setItemEdit={setItemEdit} />
          </div>
          <Footer />
        </div>
      </div>
      {store.isAdd && (
        <ModalAddDepartments itemEdit={itemEdit} setIsAdd={setIsAdd} />
      )}
      {store.error && <ModalError />}
    </>
  );
};

export default DepartmentsList;
