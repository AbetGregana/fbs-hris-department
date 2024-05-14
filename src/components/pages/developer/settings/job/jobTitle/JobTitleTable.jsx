import Loadmore from "@/components/partials/LoadMore";
import SearchBar from "@/components/partials/SearchBar";
import React from "react";
import { FaArchive } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const JobTitleTable = () => {
  return (
    <>
      <div className="site-table-action">
        <div className="site-table-filter flex items-center gap-5">
          <p>Status</p>
          <div className="site-table-num-entries flex items-center gap-1 text-[14px]">
            <IoPeopleSharp className="text-gray-500" size={20} />
            {/* {result?.pages.map(page, key)} */}
          </div>
        </div>
        <SearchBar />
      </div>
      <div className="site-table relative">
        <div
          className="overflow-auto h-[calc(100vh-250px)] "
          //   ref={scrollRef}
          //   onScroll={(e) => handleScroll(e)}
        >
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Job Level</th>
                <th>Job Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Active</td>
                <td>Entry Level</td>
                <td>Frontend Developer</td>
                <td colSpan={"100%"} className="opacity-100 sticky -right-3 ">
                  <div className="flex items-center gap-3">
                    <div className="!absolute right-6 flex items-center h-full gap-3 top-0">
                      <button
                        type="button"
                        className="tooltip"
                        data-tooltip="Edit"
                      >
                        <MdEdit />
                      </button>
                      <button
                        type="button"
                        className="tooltip"
                        data-tooltip="Archive"
                      >
                        <FaArchive />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <Loadmore />
        </div>
      </div>
    </>
  );
};

export default JobTitleTable;
