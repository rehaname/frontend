export const ADD_NEW_MATRIX = "ADD_NEW_MATRIX";
export const MAP_MEMBERS_TO_TABLE = "MAP_MEMBERS_TO_TABLE";
export const MAP_PAIRS_TO_TABLE = "MAP_PAIRS_TO_TABLE";


export const addNewMatrix = data => ({
    type: ADD_NEW_MATRIX,
    data
});

export const mapMembersToTable = raw => {
    let data = {
        column: {
            title: raw.name,
            dataIndex: raw.name
        },
        row: raw
    }
    return {
        type: MAP_MEMBERS_TO_TABLE,
        data
    };
};

export const mapPairsToTable = raw => {
    let data = {
        name: raw[0].name,
        name1: typeof raw[1] != 'undefined' ? raw[1].name : ''
    }
    return {
        type: MAP_PAIRS_TO_TABLE,
        data
    };
};