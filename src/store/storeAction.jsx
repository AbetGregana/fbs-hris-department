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

export const setIsSettingsOpen = (val) => {
  return {
    type: "IS_SETTINGS_OPEN",
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

// export const setIsClickOutside = (val) => {
//   return {
//     type: "IS_CLICK-OUTSIDE",
//     payload: val,
//   };
// };
