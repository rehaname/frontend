import { reduxForm, FieldArray, Field } from "redux-form";
import { Form, Button, Icon, Table, Input } from 'antd';
import { TextField } from 'redux-form-antd';
import React, { Component } from "react";
import { connect } from "react-redux";
import * as PairingActions from "./PairingActions";
import { clone, shuffle } from "lodash";
import EditableCellAndFormRow from "../../components/EditableCellAndFormRow";

class PairingPage extends Component {
    renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
        <div>
            <Button type="button" onClick={() => fields.push({})} style={{ width: '33.4%' }}>Add Member</Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
            {fields.map((member, index) => (
                <Form.Item key={index}
                    wrapperCol={{ span: 8 }}
                >
                    <Field name={`${member}.name`} placeholder="Member's Name" component={TextField} />
                    <Icon style={{ position: 'absolute', marginTop: -50, marginLeft: 575 }}
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                    />
                </Form.Item>
            ))}
        </div>
    );

    getIndices(pair, pairingMatrixRows, pairingMatrixCols) {
        let rowToColNameIndex = pairingMatrixRows.findIndex(a => a.name === pair.name),
            rowToColName1Index = pairingMatrixCols.findIndex(a => a.title === pair.name1);
        let colToRowNameIndex = pairingMatrixRows.findIndex(a => a.name === pair.name1),
            colToRowName1Index = pairingMatrixRows.findIndex(a => a.name === pair.name);
        let rowToColTotalIndex = rowToColNameIndex + rowToColName1Index,
            colToRowTotalIndex = colToRowNameIndex + colToRowName1Index;

        return {
            rowToColTotal: rowToColTotalIndex,
            colToRowTotal: colToRowTotalIndex,
            rowToColNameIndex: rowToColNameIndex,
            rowToColName1Index: rowToColName1Index
        };
    }

    createMatrix = () => {
        let pairingsData = this.props.state.pairings,
            pairs = pairingsData.pairingRows,
            pairingMatrixRows = clone(pairingsData.rows).reverse(),
            pairingMatrixCols = clone(pairingsData.columns),
            me = this;
        pairingMatrixCols.shift();
        pairs.forEach(function (pair) {
            if (pair.name1 !== '') {
                let indicesObj = me.getIndices(pair, pairingMatrixRows, pairingMatrixCols);
                if (indicesObj.rowToColTotal < indicesObj.colToRowTotal) {
                    pairingMatrixRows[indicesObj.rowToColNameIndex][pair.name1] = 1;
                } else {
                    pairingsData.rows[indicesObj.rowToColName1Index][pair.name] = 1;
                }
            }
        });

        return (
            <Table columns={pairingsData.columns} dataSource={pairingMatrixRows} bordered rowSelection={this.props.onSelect()} />
        );
    }

    generatePairs = () => {
        const pairingsData = this.props.state.pairings;
        return (
            <Table
                // components={EditableCellAndFormRow}
                columns={pairingsData.pairingColumn}
                dataSource={pairingsData.pairingRows}
                // rowClassName="editable-row"
                size="small" bordered />
        );
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Item
                    wrapperCol={{ span: 8 }}
                >
                    <Field name="iterationName" component={TextField} placeholder="Iteration Name" />
                </Form.Item>
                <FieldArray name="members" component={this.renderMembers} />< br />
                <div>
                    <Button type="primary" htmlType="submit" disabled={submitting}>Create Matrix</Button>&nbsp;
                    <Button type="primary" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </Button>
                </div>
                < br />
                {this.props.submitSucceeded ? this.generatePairs() : null}
                {this.props.submitSucceeded ? this.createMatrix() : null}
            </Form>);
    }
}

function mapStateToProps(state) {
    return {
        data: state.pairings.data,
        state: state
    };
}

function getShuffledRows(members) {
    let newRows = clone(members),
        shuffledRows = shuffle(newRows);
    return shuffledRows;
}

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows, 'ONCHANGE');
//     },
//     onSelect: (record, selected, selectedRows) => {
//         console.log(record, selected, selectedRows, 'ONSELECT');
//     },
//     onSelectAll: (selected, selectedRows, changeRows) => {
//         console.log(selected, selectedRows, changeRows, 'ONSELECTALL');
//     }
// };

const mapDispatchToProps = dispatch => ({
    onSubmit(values) {
        dispatch(PairingActions.addNewMatrix(values));
        Object.entries(values.members).forEach(([key, value]) => {
            let reversed = clone(values.members).reverse(),
                obj = { name: value };
            obj.reversedName = reversed[key];
            dispatch(PairingActions.mapMembersToTable(value));
        });
        getShuffledRows(values.members).reduce(function (result, value, index, array) {
            if (index % 2 === 0) {
                // dispatch(PairingActions.mapPairsToTable(array.slice(index, index + 2)));
                dispatch(PairingActions.saveNewPair(array.slice(index, index + 2)));
            }
        }, []);
    },
    onSelect(values) {
        console.log("ajdhkjashdjkhadhasldha");
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "pairingForm"
})(PairingPage));