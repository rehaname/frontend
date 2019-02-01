export const ADD_NEW_MATRIX = "ADD_NEW_MATRIX";
export const MAP_MEMBERS_TO_TABLE = "MAP_MEMBERS_TO_TABLE";

export const addNewMatrix = (data) => ({
    type: ADD_NEW_MATRIX,
    data
});

export const mapMembersToTable = (data) => ({
    type: MAP_MEMBERS_TO_TABLE,
    data
});