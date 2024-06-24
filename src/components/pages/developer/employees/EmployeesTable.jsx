import Loadmore from "@/components/partials/LoadMore";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import React from "react";
import { IoPeopleSharp } from "react-icons/io5";

const EmployeesTable = () => {
  return (
    <>
      <div className="site-table-action">
        <div className="site-table-filter flex items-center gap-5">
          <div className="relative w-28 ">
            <label>Status</label>
            <select name="status" className="h-[35px] py-0">
              <option value="all">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="site-table-num-entries flex items-center gap-1 text-[14px] translate-y-2">
            <IoPeopleSharp className="text-gray-500" size={20} />
            {/* {result?.pages[0].data.length} */}
          </div>
        </div>
        <SearchBarWithFilterStatus />
      </div>
      <div className="site-table relative">
        <div className="overflow-auto h-[calc(100vh-250px)] ">
          <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Employee Email</th>
                  <th>Status</th>
                  <th>Job Level</th>
                  <th>Job Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ansbert Gregana</td>
                  <td className="w-[25rem]">
                    ansbert.gregana@frontlinebusiness.com.ph
                  </td>
                  <td className=" w-[10rem]">Active</td>
                  <td className=" w-[10rem]">Entry Level</td>
                  <td className=" w-[15rem]">IT Trainer</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <Loadmore />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesTable;
