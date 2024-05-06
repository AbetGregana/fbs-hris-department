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
import {
  MdEdit,
  MdOutlineArchive,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineRestore,
  MdOutlineSearch,
} from "react-icons/md";
import { useInView } from "react-intersection-observer";

const DepartmentsTable = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setIsId] = React.useState("");
  const [archive, setArchive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [restore, setRestore] = React.useState(false);
  const [dataItem, setDataItem] = React.useState("");
  const [searchDept, setSearchDept] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const search = React.useRef(null);
  const [page, setPage] = React.useState(1);
  const { ref, inView } = useInView();
  const scrollRef = React.useRef(null);
  const [isTableScroll, setIsTableScroll] = React.useState(false);

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["departments", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/departments/search`, // search endpoint
        `/v2/departments/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        { searchValue: search.current.value, id: "" } // search value
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });
  console.log(result);
  const handleEdit = (child) => {
    dispatch(setIsAdd(true));
    setItemEdit(child);
    // dispatch(setIsDataEdit(child));
  };
  const handleSearchDept = (event) => {
    setSearchDept(event.target.value);
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
  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setIsTableScroll(false);
    }
    if (e.target.scrollTop > 0) {
      setIsTableScroll(true);
    }
  };

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  let counter = 1;
  return (
    <>
      <SearchBar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />
      <div className="site-table relative">
        {isLoading ? (
          <TableLoader />
        ) : result?.pages.length === 0 ? (
          <NoData />
        ) : (
          <>
            <div
              className="overflow-auto h-[calc(100vh-185px)] "
              ref={scrollRef}
              onScroll={(e) => handleScroll(e)}
            >
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
                  {result?.pages.map((page, key) => (
                    <React.Fragment key={key}>
                      {page.data.map((item, key) => (
                        <tr key={key} className="group relative cursor-pointer">
                          <td className="text-center">{counter++}.</td>
                          <td title={`${item.departments_name}`}>
                            {item.departments_name}
                          </td>
                          <td>
                            {item.departments_is_active === 1 ? (
                              <Status text="Active" />
                            ) : (
                              <Status text="Inactive" />
                            )}
                          </td>
                          <td
                            colSpan={"100%"}
                            className="opacity-0 group-hover:opacity-100 sticky -right-3"
                          >
                            <div className="flex items-center gap-3">
                              {item.departments_is_active === 1 ? (
                                <div className="!absolute right-6 flex items-center h-full gap-3">
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Edit"
                                    onClick={() => handleEdit(item)}
                                  >
                                    <MdEdit />
                                  </button>
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Archive"
                                    onClick={() => handleArchive(item)}
                                  >
                                    <FaArchive />
                                  </button>
                                </div>
                              ) : (
                                <div className="!absolute right-6 flex items-center h-full gap-3">
                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Restore"
                                    onClick={() => handleRestore(item)}
                                  >
                                    <FaHistory />
                                  </button>

                                  <button
                                    type="button"
                                    className="tooltip"
                                    data-tooltip="Delete"
                                    onClick={() => handleDelete(item)}
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <Loadmore
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                result={result?.pages[0]}
                setPage={setPage}
                page={page}
                refView={ref}
              />
            </div>
          </>
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
    </>
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
