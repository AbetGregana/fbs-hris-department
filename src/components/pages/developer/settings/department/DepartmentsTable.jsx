import useQueryData from "@/components/custom-hooks/useQueryData";
import NoData from "@/components/partials/NoData";
import TableLoader from "@/components/partials/TableLoader";
import ModalArchive from "@/components/partials/modal/ModalArchive";

import ModalDelete from "@/components/partials/modal/ModalDelete";
import ModalRestore from "@/components/partials/modal/ModalRestore";

import {
  setIsAdd,
  setIsArchive,
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
  MdOutlineSearch,
} from "react-icons/md";
const DepartmentsTable = ({ setItemEdit }) => {
  const [id, setIsId] = React.useState("");
  const [archive, setArchive] = React.useState(false);
  const [restore, setRestore] = React.useState(false);
  const [dataItem, setDataItem] = React.useState("");
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
  const { store, dispatch } = React.useContext(StoreContext);
  const handleEdit = (child) => {
    dispatch(setIsAdd(true));
    setItemEdit(child);
    // dispatch(setIsDataEdit(child));
  };
  const handleArchive = (child) => {
    setDataItem(child.departments_name);
    setIsId(child.departments_aid);
    dispatch(setIsArchive(true));
    setArchive(true);
    setRestore(false);
  };
  const handleRestore = (child) => {
    setDataItem(child.departments_name);
    setIsId(child.departments_aid);
    dispatch(setIsRestore(true));
    setArchive(false);
    setRestore(true);
  };
  const handleDelete = (child) => {
    setDataItem(child.departments_name);
    setIsId(child.departments_aid);
    dispatch(setIsDelete(true));
  };

  // console.log(itemEdit);

  let count = 1;
  return (
    <div className="site-table relative">
      {isLoading ? (
        <TableLoader />
      ) : departments.data.length === 0 ? (
        <NoData />
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments?.data.map((child, key) => {
              return (
                <tr key={key}>
                  <td>{count++}</td>
                  <td>{child.departments_name}</td>
                  <td>
                    {child.departments_is_active === 1 ? (
                      <>
                        <span className="bg-green-200 p-1 border-[2px] border-green-200 rounded-md w-[4rem] inline-block text-center text-green-500">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="bg-white p-1 border-[2px] rounded-md w-[4rem] inline-block text-center text-gray-500">
                          Inactive
                        </span>
                      </>
                    )}
                  </td>
                  <td>
                    <ul className="flex gap-2 justify-end -translate-x-5">
                      {child.departments_is_active === 1 ? (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Edit"
                              onClick={() => handleEdit(child)}
                            >
                              <MdOutlineEdit />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(child)}
                            >
                              <MdOutlineArchive />
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(child)}
                            >
                              <MdOutlineRestore size={15} />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(child)}
                            >
                              <MdOutlineDelete size={15} />
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* <FetchingSpinner /> */}

      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/departments/active/${id}`}
          queryKey={"departments"}
          item={dataItem}
          archive={archive}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/departments/active/${id}`}
          queryKey={"departments"}
          item={dataItem}
          restore={restore}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          mysqlApiDelete={`/v2/departments/${id}`}
          queryKey={"departments"}
          item={dataItem}
        />
      )}
    </div>
  );
};

export default DepartmentsTable;
{
  /* <tr className="text-center overflow-x-auto ">
            <td colSpan="100%" className="p-10">
              <ServerError />
            </td>
          </tr>
          <tr className="text-center ">
            <td colSpan="100%" className="p-10">
              <NoData />
            </td>
          </tr> */
}
