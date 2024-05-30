import useQueryData from "@/components/custom-hooks/useQueryData";
import { queryDataInfinite } from "@/components/helpers/queryDataInfinite";
import Loadmore from "@/components/partials/LoadMore";
import NoData from "@/components/partials/NoData";
import SearchBar from "@/components/partials/SearchBar";
import TableLoader from "@/components/partials/TableLoader";
import { StoreContext } from "@/store/storeContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const JobTitleTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [jobLevelStatus, setJobLevelStatus] = React.useState("all");
  const search = React.useRef({ value: "" });
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["joblevel", onSearch, store.isSearch, jobLevelStatus],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v2/joblevel/search`, // search endpoint
        `/v2/joblevel/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        {
          searchValue: search?.current?.value,
          id: "",
          isFilter,
          joblevel_is_active: jobLevelStatus,
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
  return (
    <>
      <div className="site-table-action">
        <div className="site-table-filter flex items-center gap-5">
          <div className="relative w-28 ">
            <label>Status</label>
            <select
              name="status"
              // value={jobLevelStatus}
              // onChange={(e) => handleChangeJobLevelStatus(e)}
              // disabled={isFetching || status === "pending"}
              className="h-[35px] py-0"
            >
              <option value="all">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
          <div className="site-table-num-entries flex items-center gap-1 text-[14px]">
            <IoPeopleSharp className="text-gray-500" size={20} />
            {/* {result?.pages.map(page, key)} */}
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
                  <tr>
                    <td>1</td>
                    <td>Active</td>
                    <td>Entry Level</td>
                    <td>Frontend Developer</td>
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
