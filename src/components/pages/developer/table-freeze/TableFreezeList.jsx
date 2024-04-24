import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import { setIsAdd } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import TableFreezeTable from "./TableFreezeTable";

const TableFreezeList = () => {
  return (
    <>
      <Header avatar="AG" />
      <div className="page-list flex min-h-[calc(100vh-70px)] gap-4 ">
        <Navigation menu="table-freeze" />
        <div className=" p-4 pt-1 pb-0 w-full">
          <div className="list-content">
            <h2>Table's List</h2>
            {/* <button className="btn-add " onClick={handleAdd}>
              <IoAddCircleSharp size={15} />
              Add
            </button> */}
          </div>
          <TableFreezeTable />
          {/* <DepartmentsTable setDataEdit={setDataEdit} /> */}
        </div>
      </div>
    </>
  );
};

export default TableFreezeList;
