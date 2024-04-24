import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import TableLoader from "@/components/partials/TableLoader";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import React from "react";
import {
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineRestore,
} from "react-icons/md";
const DepartmentsTable = ({ setIsAdd, setDataEdit }) => {
  const handleEdit = (child) => {
    setIsAdd(true);
    setDataEdit(child);
  };

  let count = 1;
  return (
    <div className="site-table relative">
      <TableLoader />
      <FetchingSpinner />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Supervisor</th>
            <th>Supervisor Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center overflow-x-auto ">
            <td colSpan="100%" className="p-10">
              <ServerError />
            </td>
          </tr>
          <tr className="text-center ">
            <td colSpan="100%" className="p-10">
              <NoData />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Accounting</td>
            <td>Virgil Calalang</td>
            <td>virgil.calalang@frontlinebusiness.com.ph</td>
            <td>
              <ul className="flex gap-2">
                <li>
                  <button className="tooltip" data-tooltip="Edit">
                    <MdOutlineEdit size={15} />
                  </button>
                </li>
                <li>
                  <button className="tooltip" data-tooltip="Archive">
                    <MdOutlineArchive size={15} />
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsTable;
