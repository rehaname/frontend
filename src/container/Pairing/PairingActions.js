export const ADD_NEW_MATRIX = "ADD_NEW_MATRIX";
export const MAP_MEMBERS_TO_TABLE = "MAP_MEMBERS_TO_TABLE";
export const MAP_PAIRS_TO_TABLE = "MAP_PAIRS_TO_TABLE";

export const addNewMatrix = (data) => ({
    type: ADD_NEW_MATRIX,
    data
});

export const mapMembersToTable = (data) => ({
    type: MAP_MEMBERS_TO_TABLE,
    data
});

export const mapPairsToTable = (data) => ({
    type: MAP_PAIRS_TO_TABLE,
    data
});