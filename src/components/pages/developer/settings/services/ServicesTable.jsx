import useQueryData from "@/components/custom-hooks/useQueryData";
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

const ServicesTable = () => {
  return (
    <div className="site-table relative">
      <TableLoader />
      <FetchingSpinner />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center ">
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
            <td>Web Hosting</td>
            <td>Web Development</td>
            <td>
              <p className="bg-green-200 w-fit px-3 py-1 rounded-full">
                Active
              </p>
            </td>
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
          <tr>
            <td>2</td>
            <td>Bookkeeping</td>
            <td>Accounting</td>
            <td>
              <p className="bg-green-200 w-fit px-3 py-1 rounded-full">
                Active
              </p>
            </td>
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
          <tr>
            <td>3</td>
            <td>On-Job-Training</td>
            <td>Learning Center Solutions</td>
            <td>
              <p className="bg-green-200 w-fit px-3 py-1 rounded-full">
                Active
              </p>
            </td>
            <td>
              <ul className="flex gap-2">
                <li>
                  <button className="tooltip" data-tooltip="Restore">
                    <MdOutlineRestore size={15} />
                  </button>
                </li>
                <li>
                  <button className="tooltip" data-tooltip="Delete">
                    <MdOutlineDelete size={15} />
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      {/* )} */}
    </div>
  );
};

export default ServicesTable;
