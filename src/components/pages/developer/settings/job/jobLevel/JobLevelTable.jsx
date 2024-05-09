import useQueryData from "@/components/custom-hooks/useQueryData";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import Loadmore from "@/components/partials/LoadMore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import Status from "@/components/partials/Status";
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
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaHistory, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const JobLevelTable = ({ setJobLevelEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const [restore, setRestore] = React.useState(false);
  const [archive, setArchive] = React.useState(false);
  const [dataItem, setDataItem] = React.useState("");
  const [id, setIsId] = React.useState("");
  const handleEdit = (child) => {
    dispatch(setIsAdd(true));
    setJobLevelEdit(child);
    // dispatch(setIsDataEdit(child));
  };
  const handleArchive = (child) => {
    setDataItem(child.joblevel_name);
    setIsId(child.joblevel_aid);
    dispatch(setIsArchive(true));
    setArchive(true);
    setRestore(false);
  };
  const handleRestore = (child) => {
    setDataItem(child.joblevel_name);
    setIsId(child.joblevel_aid);
    dispatch(setIsRestore(true));
    setArchive(false);
    setRestore(true);
  };
  const handleDelete = (child) => {
    setDataItem(child.joblevel_name);
    setIsId(child.joblevel_aid);
    dispatch(setIsDelete(true));
  };
  const {
    isLoading,
    isFetching,
    error,
    data: joblevel,
  } = useQueryData(
    `/v2/joblevel`, // endpoint
    "get", // method
    "joblevel" // key
  );
  let count = 1;
  return (
    <>
      <div className="site-table-action">
        <div className="site-table-filter">
          <p className="text-sm">Status</p>
        </div>
        <SearchBar />
      </div>
      <div className="site-table relative">
        {isLoading ? (
          <TableLoader />
        ) : joblevel?.data.length === 0 ? (
          <NoData />
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Job Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {joblevel?.data.map((child, key) => {
                  return (
                    <tr key={key}>
                      <td>{count++}</td>
                      <td>
                        {child.joblevel_is_active === 1 ? (
                          <Status text="Active" />
                        ) : (
                          <Status text="Inactive" />
                        )}
                      </td>
                      <td>{child.joblevel_name}</td>
                      <td
                        colSpan={"100%"}
                        className="opacity-100 sticky -right-3 "
                      >
                        <div className="flex items-center gap-3">
                          {child.joblevel_is_active === 1 ? (
                            <div className="!absolute right-6 flex items-center h-full gap-3 top-0">
                              <button
                                type="button"
                                className="tooltip"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(child)}
                              >
                                <MdEdit className="text-gray-500" />
                              </button>
                              <button
                                type="button"
                                className="tooltip"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(child)}
                              >
                                <FaArchive className="text-gray-500" />
                              </button>
                            </div>
                          ) : (
                            <div className="!absolute right-6 flex items-center h-full gap-3 top-0">
                              <button
                                type="button"
                                className="tooltip"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(child)}
                              >
                                <FaHistory className="text-gray-500" />
                              </button>

                              <button
                                type="button"
                                className="tooltip"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(child)}
                              >
                                <FaTrash className="text-gray-500" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <Loadmore />
      </div>
      {store.isArchive && (
        <ModalArchive
          setIsArchive={setIsArchive}
          mysqlEndpoint={`/v2/joblevel/active/${id}`}
          queryKey={"joblevel"}
          item={dataItem}
          archive={archive}
        />
      )}
      {store.isRestore && (
        <ModalRestore
          setIsRestore={setIsRestore}
          mysqlEndpoint={`/v2/joblevel/active/${id}`}
          queryKey={"joblevel"}
          item={dataItem}
          restore={restore}
        />
      )}
      {store.isDelete && (
        <ModalDelete
          setIsDelete={setIsDelete}
          mysqlApiDelete={`/v2/joblevel/${id}`}
          queryKey={"joblevel"}
          item={dataItem}
        />
      )}
    </>
  );
};

export default JobLevelTable;
