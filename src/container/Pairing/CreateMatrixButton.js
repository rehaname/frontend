import React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { Button } from "antd";

class CreateMatrixButton extends React.Component {
    render() {
        return(<Button type="button" onClick={this.props.onClickSubmit}>
            Create Matrix
        </Button>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    onClickSubmit() {
        dispatch(submit("pairingForm"));
    }
})

export default connect(mapDispatchToProps)(CreateMatrixButton);
