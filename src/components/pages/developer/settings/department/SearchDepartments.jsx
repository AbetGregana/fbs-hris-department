import React from "react";
import { MdOutlineSearch } from "react-icons/md";

const SearchDepartments = () => {
  return (
    <div className="searchDept">
      <input id="searchdept" type="search" placeholder="Search here . . ." />
      <div className="searchDept-icon">
        <MdOutlineSearch />
      </div>
    </div>
  );
};

export default SearchDepartments;
