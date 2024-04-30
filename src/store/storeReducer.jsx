export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "INFO":
      return {
        ...state,
        info: action.payload,
      };

    case "MESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "ARCHIVE":
      return {
        ...state,
        isArchive: action.payload,
      };

    case "RESTORE":
      return {
        ...state,
        isRestore: action.payload,
      };

    case "DELETE":
      return {
        ...state,
        isDelete: action.payload,
      };

    case "IS_ADD":
      return {
        ...state,
        isAdd: action.payload,
      };
    case "IS_DATA_EDIT":
      return {
        ...state,
        isDataEdit: action.payload,
      };
    case "IS_SEARCH":
      return {
        ...state,
        isSearch: action.payload,
      };
    case "IS_SETTINGS_OPEN":
      return {
        ...state,
        isSettingsOpen: action.payload,
      };
    case "IS_LEAVE_OPEN":
      return {
        ...state,
        isLeaveOpen: action.payload,
      };
    case "IS_MEMO_OPEN":
      return {
        ...state,
        isMemoOpen: action.payload,
      };
    case "IS_CLIENT_OPEN":
      return {
        ...state,
        isClientOpen: action.payload,
      };
    case "IS_PAYROLL_OPEN":
      return {
        ...state,
        isPayrollOpen: action.payload,
      };
    case "IS_OPEN":
      return {
        ...state,
        isOpen: action.payload,
      };
    case "IS_SHOW":
      return {
        ...state,
        isShow: action.payload,
      };
    case "IS_SEARCH":
      return {
        ...state,
        isSearch: action.payload,
      };
    default:
      return state;
  }
};
