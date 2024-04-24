import useQueryData from "@/components/custom-hooks/useQueryData";
import ModalArchiveRestore from "@/components/partials/modal/ModalArchiveRestore";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import { setIsDelete } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
const ParentsTable = ({ setIsAdd, setDataEdit }) => {
  const [id, setIsId] = React.useState("");
  const [dataItem, setDataItem] = React.useState("");
  const [isArchive, setIsArchive] = React.useState("");
  const [isRestore, setIsRestore] = React.useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  const {
    isLoading,
    isFetching,
    error,
    data: parents,
  } = useQueryData(
    `/v2/parents`, // endpoint
    "get", // method
    "parents" // key
  );

  const handleEdit = (child) => {
    setDataEdit(child);
    dispatch(setIsAdd(true));
  };

  const handleDelete = (child) => {
    setDataItem(child.parents_name);
    setIsId(child.parents_aid);
    dispatch(setIsDelete(true));
  };

  const handleArchive = (child) => {
    setDataItem(child.parents_name);
    setIsId(child.parents_aid);
    setIsArchive(true);
    setIsRestore(false);
  };

  const handleRestore = (child) => {
    setDataItem(child.parents_name);
    setIsId(child.parents_aid);
    setIsArchive(true);
    setIsRestore(true);
  };

  let count = 1;
  return (
    <div>
      {isLoading ? (
        "LOADING ITO"
      ) : parents.data.length === 0 ? (
        "NO DATA"
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Addres</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parents?.data.map((child, key) => {
              return (
                <tr key={key}>
                  <td>{count++}</td>
                  <td>{child.parents_name}</td>
                  <td>{child.parents_address}</td>
                  <td>{child.parents_email}</td>
                  <td>
                    <ul className="flex gap-2">
                      {child.parents_is_active === 1 ? (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="edit"
                              onClick={() => handleEdit(child)}
                            >
                              <MdOutlineEdit />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="archive"
                              onClick={() => handleArchive(child)}
                            >
                              <MdOutlineArchive />
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="restore"
                              onClick={() => handleRestore(child)}
                            >
                              <MdOutlineRestore />
                            </button>
                          </li>
                          <li>
                            <button
                              className="tooltip"
                              data-tooltip="delete"
                              onClick={() => handleDelete(child)}
                            >
                              <MdOutlineDeleteOutline />
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
      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`/v2/parents/${id}`}
          queryKey={"parents"}
          item={dataItem}
          isRestore={isRestore}
        />
      )}
      {isArchive && (
        <ModalArchiveRestore
          setIsArchive={setIsArchive}
          queryKey={"parents"}
          mysqlEndpoint={`/v2/parents/active/${id}`}
          item={dataItem}
          isRestore={isRestore}
        />
      )}
    </div>
  );
};

export default ParentsTable;
