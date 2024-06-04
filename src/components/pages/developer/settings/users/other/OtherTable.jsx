import SearchBarWithFilterStatus from "@/components/partials/SearchBarWithFilterStatus";
import React from "react";

const OtherTable = ({ setOtherEdit, otherEdit }) => {
  const initVal = {
    other_aid: otherEdit ? otherEdit.other_aid : "",
    other_name: otherEdit ? otherEdit.other_name : "",
    other_name_old: otherEdit ? otherEdit.other_name : "",
  };
  return (
    <>
      <div className="site-table-action">
        <SearchBarWithFilterStatus />
      </div>
      <div className="site-table relative">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Active</td>
              <td>Manoy Manalo</td>
              <td>emmanuel.manalo@frontlinebusiness.com.ph</td>
              <td>Admin</td>
              <td>FBS001</td>
              <td>Edit | Archive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OtherTable;
