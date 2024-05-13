import BreadCrumbs from "@/components/partials/BreadCrumbs";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";
import JobTitleTable from "./JobTitleTable";

const JobTitleList = () => {
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="settings" submenu="job" />
        <div className=" px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between ">
          <div className="h-screen">
            <div className="list-content">
              <BreadCrumbs param={location.search} />
              <button className="btn-add ">
                <MdOutlineAdd size={18} fontWeight="bold" />
                Add
              </button>
            </div>
            <h2 className="text-lg font-bold -translate-y-5">Job Title</h2>
            <JobTitleTable />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default JobTitleList;
