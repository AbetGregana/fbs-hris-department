export const setError = (val) => {
  return {
    type: "ERROR",
    payload: val,
  };
};

export const setInfo = (val) => {
  return {
    type: "INFO",
    payload: val,
  };
};

export const setMessage = (val) => {
  return {
    type: "MESSAGE",
    payload: val,
  };
};

export const setSuccess = (val) => {
  return {
    type: "SUCCESS",
    payload: val,
  };
};

export const setIsArchive = (val) => {
  return {
    type: "ARCHIVE",
    payload: val,
  };
};

export const setIsRestore = (val) => {
  return {
    type: "RESTORE",
    payload: val,
  };
};

export const setIsDelete = (val) => {
  return {
    type: "DELETE",
    payload: val,
  };
};

export const setIsAdd = (val) => {
  return {
    type: "IS_ADD",
    payload: val,
  };
};

export const setIsDataEdit = (val) => {
  return {
    type: "IS_DATA_EDIT",
    payload: val,
  };
};

export const setIsSettingsOpen = (val) => {
  return {
    type: "IS_SETTINGS_OPEN",
    payload: val,
  };
};

export const setIsLeaveOpen = (val) => {
  return {
    type: "IS_LEAVE_OPEN",
    payload: val,
  };
};
export const setIsMemoOpen = (val) => {
  return {
    type: "IS_MEMO_OPEN",
    payload: val,
  };
};
export const setIsClientOpen = (val) => {
  return {
    type: "IS_CLIENT_OPEN",
    payload: val,
  };
};
export const setIsPayrollOpen = (val) => {
  return {
    type: "IS_PAYROLL_OPEN",
    payload: val,
  };
};

export const setIsOpen = (val) => {
  return {
    type: "IS_OPEN",
    payload: val,
  };
};

export const setIsShow = (val) => {
  return {
    type: "IS_SHOW",
    payload: val,
  };
};
export const setIsSearch = (val) => {
  return {
    type: "IS_SEARCH",
    payload: val,
  };
};
export const setIsCompanyInfoEdit = (val) => {
  return {
    type: "IS_COMPANY_INFO_EDIT",
    payload: val,
  };
};
export const setIsDepartmentInfoEdit = (val) => {
  return {
    type: "IS_DEPARTMENT_INFO_EDIT",
    payload: val,
  };
};
export const setIsActive = (val) => {
  return {
    type: "IS_ACTIVE",
    payload: val,
  };
};
