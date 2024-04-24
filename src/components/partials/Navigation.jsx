import { setIsSettingsOpen, setIsShow } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React, { useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";

// import { AiOutlineMenuUnfold } from "react-icons/ai";
const Navigation = ({ menu, submenu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleOpen = () => {
    dispatch(setIsSettingsOpen(!store.isSettingsOpen));
  };
  const handleShow = () => {
    dispatch(setIsShow(!store.isShow));
  };

  //used for closing when clicked outside the component
  // let navRef = useRef();
  // useEffect(() => {
  //   let handler = (event) => {
  //     if (!navRef.current.contains(event.target)) {
  //       dispatch(setIsShow(false));
  //       console.log(navRef.current);
  //     }
  //   };
  //   document.addEventListener("click", handler);
  //   return () => {
  //     document.removeEventListener("click", handler);
  //   };
  // });
  return (
    <>
      <div className="navigation">
        <div className="navigation-wrapper">
          <div
            className={`navigation-content duration-200 overflow-hidden ${
              store.isShow ? "w-[200px]" : "w-0"
            }`}
          >
            <nav className="w-[200px]">
              <ul className="overflow-auto h-full pt-2">
                <li
                  className={`px-5 py-2 flex items-center justify-between ${
                    menu === "settings" ? "bg-white/20 text-white" : ""
                  }`}
                  onClick={handleOpen}
                >
                  <div className="navigation-item">
                    <IoSettingsSharp />
                    SETTINGS
                  </div>

                  <GoChevronDown
                    size={15}
                    className={`duration-200 ${
                      store.isSettingsOpen && "-rotate-180 duration-200"
                    }`}
                  />
                </li>
                {store.isSettingsOpen && (
                  <div className="submenu ml-8">
                    <ul className="flex flex-col gap-3 my-3 ">
                      <li
                        className={`${
                          submenu === "services"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/users">Users</Link>
                      </li>
                      <li
                        className={`${
                          submenu === "services"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/job">Job</Link>
                      </li>
                      <li
                        className={`${
                          submenu === "departments"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/departments">Departments</Link>
                      </li>
                      <li
                        className={`${
                          submenu === "services"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/company-info">Company Info</Link>
                      </li>
                      <li
                        className={`${
                          submenu === "position"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/leave">Leave</Link>
                      </li>
                      <li
                        className={`${
                          submenu === "services"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/notification">Notification</Link>
                      </li>
                      <li
                        className={`${
                          submenu === "services"
                            ? "border-l-2 border-[#ffa700] text-[#ffa700]"
                            : "border-transparent text-white"
                        }`}
                        onClick={handleShow}
                      >
                        <Link to="/settings/direct-report">Direct Report</Link>
                      </li>
                    </ul>
                  </div>
                )}
                {/* <li
                  className={`px-5 py-2 flex items-center justify-between ${
                    menu === "table-freeze" ? "bg-white text-[#1c74e9]" : ""
                  }`}
                  onClick={handleShow}
                >
                  <Link to="/table-freeze">TABLE FREEZE</Link>
                </li> */}
              </ul>
            </nav>
          </div>

          <div
            className={`toggle-menu duration-200 translate-x-0 bg-[#9f1659] h-fit p-1 ${
              !store.isShow && "translate-x-0"
            }`}
          >
            {store.isShow ? (
              <RiMenuFoldFill
                size={20}
                onClick={handleShow}
                className="text-white"
              />
            ) : (
              <RiMenuUnfoldFill
                size={20}
                onClick={handleShow}
                className="text-white"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
