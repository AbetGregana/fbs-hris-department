import useQueryData from "@/components/custom-hooks/useQueryData";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import Loadmore from "@/components/partials/LoadMore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import Status from "@/components/partials/Status";
import TableLoader from "@/components/partials/TableLoader";
import { setIsSearch } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import * as Yup from "yup";

const JobTitleTable = ({ jobtitleEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [jobTitleStatus, setJobTitleStatus] = React.useState("all");
  const search = React.useRef({ value: "" });
  const [isFilter, setIsFilter] = React.useState(false);
  const { ref, inView } = useInView();
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
  const initVal = {
    jobtitle_aid: jobtitleEdit ? jobtitleEdit.jobtitle_aid : "",
    jobtitle_joblevel_id: jobtitleEdit ? jobtitleEdit.jobtitle_joblevel_id : "",
    jobtitle_name: jobtitleEdit ? jobtitleEdit.jobtitle_name : "",
    jobtitle_name_old: jobtitleEdit ? jobtitleEdit.jobtitle_name : "",
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
        <SearchBar />
      </div>
      <div className="site-table relative">
        <div
          className="overflow-auto h-[calc(100vh-250px)] "
          //   ref={scrollRef}
          //   onScroll={(e) => handleScroll(e)}
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
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            )}
            <Loadmore />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobTitleTable;
