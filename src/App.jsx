import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ChildrenList from "./components/pages/developer/children-list/ChildrenList";
import ParentList from "./components/pages/developer/parent/ParentList";
import Settings from "./components/pages/developer/settings/Settings";
import CompanyInfoList from "./components/pages/developer/settings/company-info/CompanyInfoList";
import DepartmentsList from "./components/pages/developer/settings/department/DepartmentsList";
import JobList from "./components/pages/developer/settings/job/JobList";
import JobLevelList from "./components/pages/developer/settings/job/jobLevel/JobLevelList";
import JobTitleList from "./components/pages/developer/settings/job/jobTitle/JobTitleList";
import PositionList from "./components/pages/developer/settings/position/PositionList";
import ServicesList from "./components/pages/developer/settings/services/ServicesList";
import UsersList from "./components/pages/developer/settings/users/UsersList";
import TableFreezeList from "./components/pages/developer/table-freeze/TableFreezeList";
import { StoreProvider } from "./store/storeContext";

import EmployeesList from "./components/pages/developer/employees/EmployeesList";
import OtherList from "./components/pages/developer/settings/users/other/OtherList";
import RoleList from "./components/pages/developer/settings/users/role/RoleList";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path={`*`} element={<h1>404 Error</h1>} />
              <Route path={`/children`} element={<ChildrenList />} />
              <Route path={`/parent`} element={<ParentList />} />
              <Route path={`/employees`} element={<EmployeesList />} />
              <Route path={`/settings`} element={<Settings />} />
              <Route path={`/settings/users`} element={<UsersList />} />
              <Route path={`/settings/users/role`} element={<RoleList />} />
              <Route path={`/settings/users/other`} element={<OtherList />} />
              <Route path={`/settings/job`} element={<JobList />} />
              <Route
                path={`/settings/job/job-level`}
                element={<JobLevelList />}
              />
              <Route
                path={`/settings/job/job-title`}
                element={<JobTitleList />}
              />
              <Route
                path={`/settings/departments`}
                element={<DepartmentsList />}
              />
              <Route
                path={`/settings/company-info`}
                element={<CompanyInfoList />}
              />
              <Route path={`/settings/services`} element={<ServicesList />} />
              <Route path={`/settings/position`} element={<PositionList />} />
              <Route path={`/table-freeze`} element={<TableFreezeList />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
