import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import CompanyTable from "./CompanyTable";
import { StoreContext } from "@/store/storeContext";

const CompanyInfoList = () => {
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
            <CompanyTable />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
};

export default CompanyInfoList;
