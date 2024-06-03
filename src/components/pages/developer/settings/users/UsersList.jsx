import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";

import { FaDev, FaUserCog, FaUserTie } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { RiUserShared2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const UsersList = () => {
  return (
    <>
      <Header avatar="AG" />
      <div className="flex">
        <Navigation menu="settings" submenu="users" />
        <div className=" px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between ">
          <div className="h-screen">
            <div className="list-content">
              <h2>Users</h2>
            </div>
            <div className="list-content-button">
              <button className="group">
                <span>
                  <FaDev size={20} />
                  System
                </span>
                <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
              </button>
              <button className="group">
                <span>
                  <FaUserCog size={20} />
                  Other
                </span>
                <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
              </button>
              <Link to="/settings/users/role">
                <button className="group">
                  <span>
                    <RiUserShared2Fill size={20} />
                    Role
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

export default UsersList;
