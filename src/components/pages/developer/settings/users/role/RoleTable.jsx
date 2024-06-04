import useQueryData from "@/components/custom-hooks/useQueryData";
import NoData from "@/components/partials/NoData";
import Status from "@/components/partials/Status";
import TableLoader from "@/components/partials/TableLoader";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";

import React from "react";
import { FaArchive, FaHistory, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const RoleTable = ({ setRoleEdit, roleEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleEdit = (child) => {
    dispatch(setIsAdd(true));
    setRoleEdit(child);
    // dispatch(setIsDataEdit(child));
  };
  const {
    isFetching,
    error,
    data: result,
    status,
  } = useQueryData(
    `/v2/role`, // endpoint
    "get", // method
    "role" // key
  );
  console.log(result);
  const initVal = {
    role_aid: roleEdit ? roleEdit.role_aid : "",
    role_name: roleEdit ? roleEdit.role_name : "",
    role_name_old: roleEdit ? roleEdit.role_name : "",
  };

  let counter = 1;
  return (
    <>
      <div className="site-table relative">
        <>
          {isLoading ? (
            <TableLoader />
          ) : result?.count === 0 ? (
            <NoData />
          ) : (
            <>
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
                      <th>Role Name</th>
                      <th>Role Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(status === "loading" || result?.count === 0) && (
                      <tr className="text-center hover:bg-transparent ">
                        <td colSpan="100%" className="p-10">
                          {status === "loading" ? (
                            <TableLoading count={20} cols={3} />
                          ) : (
                            <NoData />
                          )}
                        </td>
                      </tr>
                    )}
                    {/* {result?.count.map((page, key) => {
                      <React.Fragment key={key}>
                        {page.data.map((item, key) => (
                          <tr key={key}>
                            <td>{counter++}.</td>
                            <td>
                              {item.role_is_active === 1 ? (
                                <Status text="Active" />
                              ) : (
                                <Status text="Inactive" />
                              )}
                            </td>
                            <td title={`${item.role_name}`}>
                              {item.role_name}
                            </td>
                            <td title={`${item.role_description}`}>
                              {item.role_description}
                            </td>
                            <td
                              colSpan={"100%"}
                              className="opacity-100 sticky -right-3"
                            >
                              <div className="flex items-center gap-3">
                                {item.role_is_active === 1 ? (
                                  <div className="!absolute right-6 flex items-center h-full gap-3">
                                    <button
                                      type="button"
                                      className="tooltip"
                                      data-tooltip="Edit"
                                      // onClick={() => handleEdit(item)}
                                    >
                                      <MdEdit className="text-gray-500" />
                                    </button>
                                    <button
                                      type="button"
                                      className="tooltip"
                                      data-tooltip="Archive"
                                      // onClick={() => handleArchive(item)}
                                    >
                                      <FaArchive className="text-gray-500" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="!absolute right-6 flex items-center h-full gap-3">
                                    <button
                                      type="button"
                                      className="tooltip"
                                      data-tooltip="Restore"
                                      // onClick={() => handleRestore(item)}
                                    >
                                      <FaHistory className="text-gray-500" />
                                    </button>

                                    <button
                                      type="button"
                                      className="tooltip"
                                      data-tooltip="Delete"
                                      // onClick={() => handleDelete(item)}
                                    >
                                      <FaTrash className="text-gray-500" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>;
                    })} */}
                    {result?.count > 0 &&
                      result.data.map((item, key) => (
                        <tr key={key}>
                          <td>{counter++}.</td>
                          <td>
                            {item.role_is_active === 1 ? (
                              <Status text="Active" />
                            ) : (
                              <Status text="Inactive" />
                            )}
                          </td>
                          <td title={`${item.role_name}`}>{item.role_name}</td>
                          <td title={`${item.role_description}`}>
                            {item.role_description}
                          </td>
                          <td
                            colSpan={"100%"}
                            className="opacity-100 sticky -right-3"
                          >
                            <div className="flex items-center gap-3">
                              {item.role_is_active === 1 ? (
                                <div className="!absolute right-6 flex items-center h-full gap-3">
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Edit"
                                    onClick={() => handleEdit(item)}
                                  >
                                    <MdEdit className="text-gray-500" />
                                  </button>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Archive"
                                    // onClick={() => handleArchive(item)}
                                  >
                                    <FaArchive className="text-gray-500" />
                                  </button>
                                </div>
                              ) : (
                                <div className="!absolute right-6 flex items-center h-full gap-3">
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Restore"
                                    // onClick={() => handleRestore(item)}
                                  >
                                    <FaHistory className="text-gray-500" />
                                  </button>

                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Delete"
                                    // onClick={() => handleDelete(item)}
                                  >
                                    <FaTrash className="text-gray-500" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default RoleTable;
