import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import CompanyTable from "./CompanyTable";
import { StoreContext } from "@/store/storeContext";
import { setIsCompanyInfoEdit } from "@/store/storeAction";
import ModalEditCompanyInfo from "./ModalEditCompanyInfo";

const CompanyInfoList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [companyEdit, setCompanyEdit] = React.useState(null);
  const handleEdit = () => {
    dispatch(setIsCompanyInfoEdit(true));
  };
  console.log(companyEdit);
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="settings" submenu="company-info" />
        <div className=" px-4 py-1 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between ">
          <div className="h-screen">
            <div className="list-content">
              <h2>Company Info</h2>
            </div>
            <CompanyTable setCompanyEdit={setCompanyEdit} />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      {store.isCompanyInfoEdit && (
        <ModalEditCompanyInfo companyEdit={companyEdit} />
      )}
    </>
  );
};

export default CompanyInfoList;
