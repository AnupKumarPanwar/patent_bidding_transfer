import { SORT_PATENTS, GET_PATENTS, CHANGE_PATENT_TYPE, CHANGE_PATENT_NAME, CHANGE_PATENT_SUB_TYPE, CHANGE_COLLABORATORS, CHANGE_FILE_NAME } from "./PatentActionTypes";

export const getPatentAction = (patents) => {
  return {
    type: GET_PATENTS,
    patents: patents
  }
};

export const sortPatentAction = (ascending) => {
  return {
    type: SORT_PATENTS,
    ascending: !ascending
  }
};

export const changePatentType = (patentType) => {
  return {
    type: CHANGE_PATENT_TYPE,
    patentType
  }
};


export const changePatentSubType = (patentType) => {
  return {
    type: CHANGE_PATENT_SUB_TYPE,
    patentType
  }
};

export const changePatentName = (patentName) => {
  return {
    type: CHANGE_PATENT_NAME,
    patentName
  }
};


export const changeCollaborators = (collaborators) => {
  return {
    type: CHANGE_COLLABORATORS,
    owners: collaborators
  }
};

export const changeFileName = (uploadFileName) => {
  return {
    type: CHANGE_FILE_NAME,
    uploadFileName
  }
};