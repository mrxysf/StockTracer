import React, { Component } from "react";
import firebase from "firebase";
import Anew from "anew";

//Material UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    marginTop: "3%",
    marginBottom: "3%"
  },
  load: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class PullUData extends Component {
  state = {
    userName: "",
    loading: false
  };

  static mapStateToProps(select) {
    return {
      userID: select.userInfo.getUserID(),
      userItems: select.userInfo.getUserItems(),
      numItems: select.userInfo.getNumItems()
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      setUserItems: dispatch.reducers.userInfo.setUserItems,
      setNumItems: dispatch.reducers.userInfo.setNumItems
    };
  }
  handleDelete = key => {
    firebase
      .database()
      .ref(`users/${this.props.userID}/listOfItems/${key}`)
      .remove();
  };
  getUserName = () => {
    firebase
      .database()
      .ref(`users/${this.props.userID}`)
      .on("value", snapshot => {
        let userName = snapshot.val();
        this.setState({
          userName: userName.email
        });
      });
  };
  getProductList = () => {
    this.setState({ loading: true });
    firebase
      .database()
      .ref(`users/${this.props.userID}/listOfItems`)
      .on("value", snapshot => {
        //List items object data
        let data = snapshot.val();
        this.props.setUserItems(data);
      });
  };
  componentDidMount() {
    this.getProductList();
  }
  render() {
    const { classes } = { ...this.props };
    return (
      <Paper className={classes.paper} elevation={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Cost</TableCell>
              <TableCell>Item Shipment</TableCell>
              <TableCell>Item Cut</TableCell>
              <TableCell>Item Sold</TableCell>
              <TableCell>Item Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.userItems === null ? (
              <TableRow>
                <TableCell />
              </TableRow>
            ) : (
              Object.entries(this.props.userItems).map(([key, value]) => (
                <TableRow key={key} hover>
                  <TableCell>{value.Name}</TableCell>
                  <TableCell>{value.Cost}</TableCell>
                  <TableCell>{value.Ship}</TableCell>
                  <TableCell>{value.Cut}</TableCell>
                  <TableCell>{value.Sold}</TableCell>
                  <TableCell>{value.Profit}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => this.handleDelete(key)}
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Anew.connect(PullUData));
