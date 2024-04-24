import useQueryData from "@/components/custom-hooks/useQueryData";
import NoData from "@/components/partials/NoData";
import TableLoader from "@/components/partials/TableLoader";
import ModalArchiveRestore from "@/components/partials/modal/ModalArchiveRestore";
import ModalDelete from "@/components/partials/modal/ModalDelete";
import { setIsAdd, setIsDelete } from "@/store/storeAction";
import { StoreContext } from "@/store/storeContext";
import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
const ChildrenTable = ({ setDataEdit }) => {
  const [id, setIsId] = React.useState("");
  const [dataItem, setDataItem] = React.useState("");
  const [isArchive, setIsArchive] = React.useState("");
  const [isRestore, setIsRestore] = React.useState(false);
  const { store, dispatch } = React.useContext(StoreContext);
  const {
    isLoading,
    isFetching,
    error,
    data: children,
  } = useQueryData(
    `/v2/children`, // endpoint
    "get", // method
    "children" // key
  );

  const handleEdit = (child) => {
    setDataEdit(child);
    dispatch(setIsAdd(true));
  };

  const handleDelete = (child) => {
    setDataItem(child.children_name);
    setIsId(child.children_aid);
    dispatch(setIsDelete(true));
  };

  const handleArchive = (child) => {
    setDataItem(child.children_name);
    setIsId(child.children_aid);
    setIsArchive(true);
    setIsRestore(false);
  };

  const handleRestore = (child) => {
    setDataItem(child.children_name);
    setIsId(child.children_aid);
    setIsArchive(true);
    setIsRestore(true);
  };

  let count = 1;
  return (
    <div>
      {isLoading ? (
        <TableLoader />
      ) : children.data.length === 0 ? (
        <NoData />
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
          setIsDelete={setIsDelete}
          mysqlApiDelete={`/v2/children/${id}`}
          queryKey={"children"}
          item={dataItem}
        />
      )}
      {isArchive && (
        <ModalArchiveRestore
          setIsArchive={setIsArchive}
          queryKey={"children"}
          mysqlEndpoint={`/v2/children/active/${id}`}
          item={dataItem}
          isRestore={isRestore}
        />
      )}
    </div>
  );
};

export default ChildrenTable;
