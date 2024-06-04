import useQueryData from "@/components/custom-hooks/useQueryData";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import Loadmore from "@/components/partials/LoadMore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
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
  setIsSearch,
} from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaHistory, FaTrash } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";

const JobTitleTable = ({ jobTitleEdit, setJobTitleEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [jobTitleStatus, setJobTitleStatus] = React.useState("all");
  const search = React.useRef({ value: "" });
  const [isFilter, setIsFilter] = React.useState(false);
  const { ref, inView } = useInView();
  const [isTableScroll, setIsTableScroll] = React.useState(false);
  const scrollRef = React.useRef(null);
  const [archive, setArchive] = React.useState(false);
  const [restore, setRestore] = React.useState(false);
  const [dataItem, setDataItem] = React.useState("");
  const [id, setIsId] = React.useState("");
  const handleEdit = (child) => {
    dispatch(setIsAdd(true));
    setJobTitleEdit(child);
    // dispatch(setIsDataEdit(child));
  };
  const handleArchive = (child) => {
    setDataItem(child.jobtitle_name);
    setIsId(child.jobtitle_aid);
    dispatch(setIsArchive(true));
    setArchive(true);
    setIsRestore(false);
  };
  const handleRestore = (child) => {
    setDataItem(child.jobtitle_name);
    setIsId(child.jobtitle_aid);
    dispatch(setIsRestore(true));
    setArchive(false);
    setIsRestore(true);
  };
  const handleDelete = (child) => {
    setDataItem(child.jobtitle_name);
    setIsId(child.jobtitle_aid);
    dispatch(setIsDelete(true));
  };
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["jobtitle", onSearch, store.isSearch, jobTitleStatus],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/jobtitle/search`, // search endpoint
        `/v2/jobtitle/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        {
          searchValue: search?.current?.value,
          id: "",
          isFilter,
          jobtitle_is_active: jobTitleStatus,
        }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });
  const handleChangeJobTitleStatus = (e) => {
    setJobTitleStatus(e.target.value);
    setIsFilter(false);
    dispatch(setIsSearch(false));
    search.current.value = "";
    if (e.target.value !== "all") {
      setIsFilter(true);
      dispatch(setIsSearch(true));
    }
    setPage(1);
    console.log(jobTitleStatus);
  };
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setIsTableScroll(false);
    }
    if (e.target.scrollTop > 0) {
      setIsTableScroll(true);
    }
  };
  const initVal = {
    jobtitle_aid: jobTitleEdit ? jobTitleEdit.jobtitle_aid : "",
    jobtitle_name: jobTitleEdit ? jobTitleEdit.jobtitle_name : "",
    jobtitle_name_old: jobTitleEdit ? jobTitleEdit.jobtitle_name : "",
    jobtitle_joblevel_id: jobTitleEdit ? jobTitleEdit.jobtitle_joblevel_id : "",
  };
  const yupSchema = Yup.object({
    jobtitle_name: Yup.string().required("Required"),
  });
  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);
  let counter = 1;
  return (
    <>
      <div className="site-table-action">
        <div className="site-table-filter flex items-center gap-5">
          <div className="relative w-28 ">
            <label>Status</label>
            <select
              name="status"
              value={jobTitleStatus}
              onChange={(e) => handleChangeJobTitleStatus(e)}
              disabled={isFetching || status === "pending"}
              className="h-[35px] py-0"
            >
              <option value="all">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="site-table-num-entries flex items-center gap-1 text-[14px]">
            <IoPeopleSharp className="text-gray-500" size={20} />
            {result?.pages[0].data.length}
          </div>
        </div>
        <SearchBarWithFilterStatus
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
          isFilter={isFilter}
        />
      </div>
      <div className="site-table relative">
        <div
          className="overflow-auto h-[calc(100vh-250px)] "
          ref={scrollRef}
          onScroll={(e) => handleScroll(e)}
        >
          <div>
            {isLoading ? (
              <TableLoader />
            ) : result?.pages.length === 0 ? (
              <NoData />
            ) : (
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
                  {(status === "loading" ||
                    result?.pages[0].data.length === 0) && (
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
                  {result?.pages.map((page, key) => {
                    return (
                      <React.Fragment key={key}>
                        {page.data.map((item, key) => (
                          <tr key={key}>
                            <td>{counter++}.</td>
                            <td>
                              {item.jobtitle_is_active === 1 ? (
                                <Status text="Active" />
                              ) : (
                                <Status text="Inactive" />
                              )}
                            </td>
                            <td>{item.joblevel_name}</td>
                            <td title={`${item.jobtitle_name}`}>
                              {item.jobtitle_name}
                            </td>
                            <td
                              colSpan={"100%"}
                              className="opacity-100 sticky -right-3 "
                            >
                              <div className="flex items-center gap-3">
                                {item.jobtitle_is_active === 1 ? (
                                  <div className="!absolute right-6 flex items-center h-full gap-3 top-0">
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
                                      onClick={() => handleArchive(item)}
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
                                      onClick={() => handleRestore(item)}
                                    >
                                      <FaHistory className="text-gray-500" />
                                    </button>

                                    <button
                                      type="button"
                                      className="tooltip"
                                      data-tooltip="Delete"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <FaTrash className="text-gray-500" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
            <Loadmore />
            {store.isArchive && (
              <ModalArchive
                setIsArchive={setIsArchive}
                mysqlEndpoint={`/v2/jobtitle/active/${id}`}
                queryKey={"jobtitle"}
                item={dataItem}
                archive={archive}
              />
            )}
            {store.isRestore && (
              <ModalRestore
                setIsRestore={setIsRestore}
                mysqlEndpoint={`/v2/jobtitle/active/${id}`}
                queryKey={"jobtitle"}
                item={dataItem}
                restore={restore}
              />
            )}
            {store.isDelete && (
              <ModalDelete
                setIsDelete={setIsDelete}
                mysqlApiDelete={`/v2/jobtitle/${id}`}
                queryKey={"jobtitle"}
                item={dataItem}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobTitleTable;
