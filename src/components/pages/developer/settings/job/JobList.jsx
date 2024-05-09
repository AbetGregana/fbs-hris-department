import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";

const JobList = () => {
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="settings" submenu="job" />
        <div className=" px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between ">
          <div className="h-screen">
            <div className="list-content">
              <h2>Job</h2>
            </div>
            <div className="list-content-button">
              <Link to="/settings/job/job-level">
                <button className="group">
                  <span>
                    <BsFillBarChartLineFill size={20} />
                    Job Level
                  </span>
                  <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
                </button>
              </Link>
              <Link to="/settings/job/job-title">
                <button className="group">
                  <span>
                    <FaUserTie size={20} />
                    Job Title
                  </span>
                  <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default JobList;
