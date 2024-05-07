import { StoreContext } from "@/store/storeContext";
import React from "react";
import { GrEdit } from "react-icons/gr";
import ModalEditCompanyInfo from "./ModalEditCompanyInfo";
import { setIsCompanyInfoEdit } from "@/store/storeAction";
import useQueryData from "@/components/custom-hooks/useQueryData";

const CompanyTable = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isCompanyEdit, setIsCompanyEdit] = React.useState(null);
  const handleEdit = () => {
    dispatch(setIsCompanyInfoEdit(true));
  };
  const {
    isLoading,
    isFetching,
    error,
    data: company,
  } = useQueryData(
    `/v2/company`, // endpoint
    "get", // method
    "company" // key
  );
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
            <tbody className="flex flex-col pt-2">
              {company?.data.map((child, key) => {
                return (
                  <>
                    <tr key={key} className="border-b border-transparent">
                      <th>Company Name:</th>
                      <td>{child.company_name}</td>
                    </tr>
                    <tr>
                      <th>Company Email:</th>
                      <td>{child.company_email}</td>
                    </tr>
                    <tr>
                      <th>Company Phone:</th>
                      <td>{child.company_phone}</td>
                    </tr>
                    <tr>
                      <th>Street:</th>
                      <td>{child.company_street}</td>
                    </tr>
                    <tr>
                      <th>City:</th>
                      <td>{child.company_city}</td>
                    </tr>
                    <tr>
                      <th>Province:</th>
                      <td>{child.company_province}</td>
                    </tr>
                    <tr>
                      <th>Postal:</th>
                      <td>{child.company_postal}</td>
                    </tr>
                    <tr>
                      <th>Country:</th>
                      <td>{child.company_country}</td>
                    </tr>
                    <tr>
                      <th>Navigation Background Color:</th>
                      <td>{child.navigation_bgc}</td>
                    </tr>
                    <tr>
                      <th>Sub Menu Color:</th>
                      <td>{child.submenu_color}</td>
                    </tr>
                    <tr>
                      <th>Accent Color:</th>
                      <td>{child.accent_color}</td>
                    </tr>
                    <tr>
                      <th>Company Logo:</th>
                    </tr>
                  </>
                );
              })}
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
            <tbody className="flex flex-col pt-2">
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
      {store.isCompanyInfoEdit && (
        <ModalEditCompanyInfo
          setIsCompanyInfoEdit={setIsCompanyInfoEdit}
          isCompanyEdit={isCompanyEdit}
        />
      )}
    </>
  );
};

export default CompanyTable;
