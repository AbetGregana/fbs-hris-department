import useQueryData from "@/components/custom-hooks/useQueryData";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaArchive } from "react-icons/fa";
import { MdOutlineRestore } from "react-icons/md";
import { MdDelete } from "react-icons/md";
const ChildrenTable = ({ kids, setDataEdit, setIsAdd }) => {
  // ito yung nagpapakita ng data o para lumabas ang output sa network tab
  const {
    isLoading,
    isFetching,
    error,
    data: children,
  } = useQueryData(
    `./v2/children`, // endpoint
    "get", // method , nakaget para ma-read ang data
    "children" // key , kapag may bagong data ay mag re refresh ang table kaya may key
  );

  console.log(children);

  const handleEdit = (child) => {
    setDataEdit(child);
    setIsAdd(true);
  };

  let count = 1;
  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : children.data.length === 0 ? (
        "No Data"
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {children?.data.map((child, key) => {
              return (
                <tr key={key}>
                  <td>{count++}</td>
                  <td>{child.children_name}</td>
                  <td>{child.children_address}</td>
                  <td>{child.children_email}</td>
                  <td>
                    <ul className="flex gap-2">
                      {child.children_is_active === 1 ? (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="edit"
                              onClick={() => handleEdit(child)}
                            >
                              <CiEdit />
                            </button>
                          </li>
                          <li>
                            <button>
                              <FaArchive />
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button>
                              <MdOutlineRestore />
                            </button>
                          </li>
                          <li>
                            <button>
                              <MdDelete />
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
    </div>
  );
};

export default ChildrenTable;
