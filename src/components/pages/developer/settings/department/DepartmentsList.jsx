import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import DepartmentsTable from "./DepartmentsTable";
import ModalAddDepartments from "./ModalAddDepartments";
import { departments } from "./data";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd, setIsSettingsOpen } from "@/store/storeAction";
import Footer from "@/components/partials/Footer";
import { MdOutlineAdd } from "react-icons/md";
const DepartmentsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataEdit, setDataEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setDataEdit(null);
  };

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
            <DepartmentsTable setDataEdit={setDataEdit} />
          </div>
          <Footer />
        </div>
      </div>

      {store.isAdd && <ModalAddDepartments dataEdit={dataEdit} />}
    </>
  );
};

export default DepartmentsList;
