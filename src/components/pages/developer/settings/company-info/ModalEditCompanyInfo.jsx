import ModalSideWrapper from "@/components/partials/modal/ModalSideWrapper";
import React from "react";
import { GrFormClose } from "react-icons/gr";

const ModalEditCompanyInfo = ({ setIsCompanyInfoEdit }) => {
  const handleClose = () => {
    setIsCompanyInfoEdit(false);
  }
  return (
    <>
      <ModalSideWrapper>
        <main className="modal">
          <div className="modal-title">
            <h2>Update Company Info</h2>
            <button onClick={handleClose}>
              <GrFormClose size={25} />
            </button>
          </div>
        </main>
      </ModalSideWrapper>
    </>
  );
};

export default ModalEditCompanyInfo;
