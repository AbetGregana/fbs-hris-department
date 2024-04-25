import NoData from "@/components/partials/NoData";
import ServerError from "@/components/partials/ServerError";
import TableLoader from "@/components/partials/TableLoader";
import ModalArchiveRestore from "@/components/partials/modal/ModalArchive";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import {
  setIsAdd,
  setIsArchive,
  setIsDataEdit,
  setIsDelete,
  setIsRestore,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import {
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineRestore,
} from "react-icons/md";
import ModalAddDepartments from "./ModalAddDepartments";
import ModalArchive from "@/components/partials/modal/ModalArchive";
import ModalRestore from "@/components/partials/modal/ModaleRestore";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import useQueryData from "@/components/custom-hooks/useQueryData";
const DepartmentsTable = () => {
  const {
    isLoading,
    isFetching,
    error,
    data: departments,
  } = useQueryData(
    `/v2/departments`, // endpoint
    "get", // method
    "departments" // key
  );

  console.log(departments);

  const { store, dispatch } = React.useContext(StoreContext);
  const handleEdit = () => {
    dispatch(setIsAdd(true));
    dispatch(setIsDataEdit(true));
  };
  const handleArchive = () => {
    dispatch(setIsArchive(true));
  };
  const handleRestore = () => {
    dispatch(setIsRestore(true));
  };
  const handleDelete = () => {
    dispatch(setIsDelete(true));
  };

  let count = 1;
  return (
    <div className="site-table relative">
      <TableLoader />
      {/* <FetchingSpinner /> */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Department Name</th>
            <th className="flex justify-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {departments?.data.map((child, key) => {})} */}
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
            <td>
              <span className="bg-white p-1 border-[2px] rounded-md w-[4rem] inline-block text-center text-gray-500">
                Inactive
              </span>
            </td>
            <td>Accounting</td>
            <td>
              <ul className="flex gap-2 justify-end -translate-x-5">
                <li>
                  <button
                    className="tooltip"
                    data-tooltip="Restore"
                    onClick={handleRestore}
                  >
                    <MdOutlineRestore size={15} />
                  </button>
                </li>
                <li>
                  <button
                    className="tooltip"
                    data-tooltip="Delete"
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete size={15} />
                  </button>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <span className="bg-green-200 p-1 rounded-md w-[4rem] inline-block text-center text-green-800">
                Active
              </span>
            </td>
            <td>Learning Center Solutions</td>
            <td>
              <ul className="flex gap-2 justify-end -translate-x-5">
                <li>
                  <button
                    className="tooltip"
                    data-tooltip="Edit"
                    onClick={handleEdit}
                  >
                    <MdOutlineEdit size={15} />
                  </button>
                </li>
                <li>
                  <button
                    className="tooltip"
                    data-tooltip="Archive"
                    onClick={handleArchive}
                  >
                    <MdOutlineArchive size={15} />
                  </button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      {store.isAdd && (
        <ModalAddDepartments
          setIsDataEdit={setIsDataEdit}
          setIsAdd={setIsAdd}
        />
      )}
      {store.isArchive && <ModalArchive setIsArchive={setIsArchive} />}
      {store.isRestore && <ModalRestore setIsRestore={setIsRestore} />}
      {store.isDelete && <ModalDelete setIsDelete={setIsDelete} />}
    </div>
  );
};

export default DepartmentsTable;
