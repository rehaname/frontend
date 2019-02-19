import axios from "../../middleware/api";
const APIURL = "/pairings"

export const ADD_NEW_MATRIX = "ADD_NEW_MATRIX";
export const MAP_MEMBERS_TO_TABLE = "MAP_MEMBERS_TO_TABLE";
export const ADD_NEW_PAIR = "ADD_NEW_PAIR";

export const addNewMatrix = data => ({
    type: ADD_NEW_MATRIX,
    data
});

export const mapMembersToTable = raw => {
    let data = {
        column: {
            title: raw.name,
            dataIndex: raw.name,
            editable: true
        },
        row: raw
    }
    return {
        type: MAP_MEMBERS_TO_TABLE,
        data
    };
};

// export const mapPairsToTable = raw => {
//     let data = {
//         name: raw[0].name,
//         name1: typeof raw[1] != 'undefined' ? raw[1].name : ''
//     }
//     return {
//         type: MAP_PAIRS_TO_TABLE,
//         data
//     };
// };

export const addNewPair = data => ({
    type: ADD_NEW_PAIR,
    data
});

export const saveNewPair = raw => dispatch => {
    let newPair = {
        name: raw[0].name,
        name1: typeof raw[1] != 'undefined' ? raw[1].name : '',
        pairCount: 1
    }
    return axios
        .post(APIURL+"/addNewPair/", newPair)
        .then(response => {
            let responseValue = response.data;
            dispatch(addNewPair({
                name: responseValue.name,
                name1: responseValue.name1
            }));
        })
        .catch(error => {
            throw error;
        });
}