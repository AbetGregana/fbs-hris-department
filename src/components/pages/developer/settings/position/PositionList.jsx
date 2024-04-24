import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import PositionTable from "./PositionTable";
import ModalAddPosition from "./ModalAddPosition";
import { IoAddCircleSharp } from "react-icons/io5";
import { StoreContext } from "@/store/storeContext";
import { setIsAdd, setIsSettingsOpen } from "@/store/storeAction";
import Footer from "@/components/partials/Footer";

const PositionList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  // const [isAdd, setIsAdd] = React.useState(false);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
  };

  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);
  return (
    <>
      <Header avatar="AG" />
      <div className="flex gap-3 min-h-[calc(100vh-80px)]">
        <Navigation menu="settings" submenu="position" />
        <div className="p-4 pb-0 w-full">
          <div className="list-content">
            <h2>Position List</h2>
            <button className="btn-add" onClick={handleAdd}>
              <IoAddCircleSharp size={15} />
              Add
            </button>
          </div>
          <PositionTable />
        </div>
      </div>
      <Footer />
      {store.isAdd && <ModalAddPosition setIsAdd={setIsAdd} />}
    </>
  );
};

export default PositionList;
