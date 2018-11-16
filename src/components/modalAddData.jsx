import React, { Component } from "react";
import Anew from "anew";
import firebase from "firebase";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class ModalAddData extends Component {
  state = {
    iType: "",
    iName: "",
    iCost: 0,
    iShip: 0,
    iCut: 0,
    iSold: 0,
    iProfit: 0
  };
  static mapStateToProps(select) {
    return {
      userID: select.userInfo.getUserID(),
      numItems: select.userInfo.getNumItems()
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      setNumItems: dispatch.reducers.userInfo.setNumItems
    };
  }
  handleChange = stateKey => event => {
    this.setState({
      [stateKey]: event.target.value
    });
  };
  handleWrite = () => {
    var profit =
      this.state.iSold - this.state.iCost - this.state.iShip - this.state.iCut;
    //saving profit to database to not calculate on every reload
    this.setState({ iProfit: profit }, () => {
      firebase
        .database()
        .ref(`users/${this.props.userID}/listOfItems/`)
        .push({
          Name: this.state.iName,
          Sold: this.state.iSold,
          Cost: this.state.iCost,
          Ship: this.state.iShip,
          Profit: this.state.iProfit,
          Cut: this.state.iCut,
          Type: this.state.iType
        })
        .then(data => {
          this.props.onClose();
        })
        .catch(error => {
          //pring if failed
          console.log("error", error);
        });
    });
  };
  render() {
    const inputs = [
      {
        key: "Name",
        onChange: input => this.setState({ iName: input.target.value }),
        label: "Item Name:"
      },
      {
        key: "Cost",
        type: "number",
        onChange: input => this.setState({ iCost: input.target.value }),
        label: "Item Cost"
      },
      {
        key: "Shipment",
        type: "number",
        onChange: input => this.setState({ iShip: input.target.value }),
        label: "Item Shipment Cost:"
      },
      {
        key: "Cut",
        type: "number",
        onChange: input => this.setState({ iCut: input.target.value }),
        label: "Item Cut"
      },
      {
        key: "Sold",
        // type: "number",
        onChange: input => this.setState({ iSold: input.target.value }),
        label: "Item Sold"
      }
    ];
    const { classes } = { ...this.props };
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.isOpen}
        onClose={this.onClose}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div className={classes.paper}>
          <Typography className={classes.margin} variant="h6" id="modal-title">
            Add New Item
          </Typography>

          {inputs.map(input => (
            <TextField
              fullWidth
              className={classes.margin}
              key={input.key}
              variant="outlined"
              {...input}
            />
          ))}
          <TextField
            select
            fullWidth
            className={classes.margin}
            label="Item Type"
            value={this.state.iType}
            onChange={this.handleChange("iType")}
          >
            <MenuItem value="Book">Book</MenuItem>
            <MenuItem value="Board Game">Board Game</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={() => this.handleWrite()}
          >
            Add
          </Button>
          <Button
            variant="contained"
            className={classes.margin}
            onClick={this.props.onClose}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(Anew.connect(ModalAddData));
