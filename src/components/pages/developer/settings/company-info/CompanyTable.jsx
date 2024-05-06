import React from "react";
import { GrEdit } from "react-icons/gr";

const CompanyTable = () => {
  return (
    <>
      <div className="company-info-wrapper">
        <div className="company-info-top">
          <div className="company-info-top-title">
            <h2>DETAILS</h2>
            <button>
              <GrEdit />
              <span>Update</span>
            </button>
          </div>
          <table>
            <tbody className="flex flex-col gap-2">
              <tr className="border-b border-transparent">
                <td>Company Name:</td>
                <td>Frontline Business Solutions</td>
              </tr>
              <td>
                <td>Company Email:</td>
                <td>info@frontlinebusiness.com.ph</td>
              </td>
              <td>
                <td>Company Phone:</td>
                <td>(049) 501 3592 | (+63) 927 168 6810</td>
              </td>
              <td>
                <td>Street:</td>
                <td>Baloc Road, Brgy. San Ignacio</td>
              </td>
              <td>
                <td>City:</td>
                <td>San Pablo City</td>
              </td>
              <td>
                <td>Province:</td>
                <td>Laguna</td>
              </td>
              <td>
                <td>Postal:</td>
                <td>4000</td>
              </td>
              <td>
                <td>Country:</td>
                <td>Philippines</td>
              </td>
              <td>
                <td>Navigation Background Color:</td>
                <td>#9f11659</td>
              </td>
              <td>
                <td>Sub Menu Color:</td>
                <td>#e33589</td>
              </td>
              <td>
                <td>Accent Color:</td>
                <td>f7e300</td>
              </td>
              <td>
                <td>Company Logo:</td>
                <td>
                  <img src="" alt="" />
                </td>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CompanyTable;
