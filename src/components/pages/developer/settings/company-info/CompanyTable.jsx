import { StoreContext } from "@/store/storeContext";
import React from "react";
import { GrEdit } from "react-icons/gr";
import ModalEditCompanyInfo from "./ModalEditCompanyInfo";

const CompanyTable = () => {
  const [isCompanyInfoEdit, setIsCompanyInfoEdit] = React.useState(false);
  const handleEdit = () => {
    setIsCompanyInfoEdit(true);
  };
  return (
    <>
      <div className="company-info-wrapper">
        <div className="company-info-top">
          <div className="company-info-top-title">
            <h2 className="text-sm font-semibold text-[16px] pb-2">DETAILS</h2>
            <button className="flex items-center gap-2" onClick={handleEdit}>
              <GrEdit className="text-[#9f1659]" />
              <span className="text-[16px]  font-light text-[#9f1659]">
                Update
              </span>
            </button>
          </div>
          <table>
            <tbody className="flex flex-col pt-1">
              <tr className="border-b border-transparent">
                <td>Company Name:</td>
                <td>Frontline Business Solutions</td>
              </tr>
              <tr>
                <td>Company Email:</td>
                <td>info@frontlinebusiness.com.ph</td>
              </tr>
              <tr>
                <td>Company Phone:</td>
                <td>(049) 501 3592 | (+63) 927 168 6810</td>
              </tr>
              <tr>
                <td>Street:</td>
                <td>Baloc Road, Brgy. San Ignacio</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>San Pablo City</td>
              </tr>
              <tr>
                <td>Province:</td>
                <td>Laguna</td>
              </tr>
              <tr>
                <td>Postal:</td>
                <td>4000</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>Philippines</td>
              </tr>
              <tr>
                <td>Navigation Background Color:</td>
                <td>#9f11659</td>
              </tr>
              <tr>
                <td>Sub Menu Color:</td>
                <td>#e33589</td>
              </tr>
              <tr>
                <td>Accent Color:</td>
                <td>f7e300</td>
              </tr>
              <tr>
                <td>Company Logo:</td>
                <td>
                  <img
                    src="/src/components/partials/svg-icon/logo-fbs.png"
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="company-info-top mt-[4rem]">
          <div className="company-info-top-title">
            <h2 className="text-sm font-semibold text-[16px] pb-2">
              SUBSCRIPTION
            </h2>
          </div>
          <table>
            <tbody className="flex flex-col pt-1">
              <tr className="border-b border-transparent">
                <td>Company Name:</td>
                <td>Frontline Business Solutions</td>
              </tr>
              <tr>
                <td>Company Email:</td>
                <td>info@frontlinebusiness.com.ph</td>
              </tr>
              <tr>
                <td>Company Phone:</td>
                <td>(049) 501 3592 | (+63) 927 168 6810</td>
              </tr>
              <tr>
                <td>Street:</td>
                <td>Baloc Road, Brgy. San Ignacio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isCompanyInfoEdit && (
        <ModalEditCompanyInfo setIsCompanyInfoEdit={setIsCompanyInfoEdit} />
      )}
    </>
  );
};

export default CompanyTable;
