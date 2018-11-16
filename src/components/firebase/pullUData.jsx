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
import Toolbar from "@material-ui/core/Toolbar";
import { Paper, IconButton, Typography, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import classNames from "classnames";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  paper: {
    // ...theme.mixins.gutters(),
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
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  title: {
    flex: "0 0 auto"
  }
});

class PullUData extends Component {
  state = {
    userName: "",
    loading: false,
    selected: [],
    numSelected: 0
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
  handleDelete = () => {
    let selectedList = this.state.selected;
    for (let i = 0; i < selectedList.length; i++) {
      this.setState({
        numSelected: this.state.numSelected - 1
      });
      let key = selectedList[i];
      firebase
        .database()
        .ref(`users/${this.props.userID}/listOfItems/${key}`)
        .remove();
    }
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
  handleSelectAllClick = () => {
    let tempList = this.state.selected;
    let count = this.state.numSelected;
    let temp =
      this.props.userItems === null
        ? 0
        : Object.keys(this.props.userItems).length;

    if (tempList.length === temp) {
      tempList = [];
      count = 0;
    } else if (tempList.length > 0 && tempList.length < temp) {
      Object.keys(this.props.userItems).map(key => {
        tempList.includes(key) ? console.log("includes") : tempList.push(key);
      });
      count = Object.keys(this.props.userItems).length;
    } else if (tempList.length === 0) {
      tempList = Object.keys(this.props.userItems);
      count = Object.keys(this.props.userItems).length;
      console.log("called");
    }

    this.setState({
      selected: tempList,
      numSelected: count
    });
  };
  isSelected = key => {
    var newList = this.state.selected;
    //deletes key from list if key is in list
    if (this.state.selected.includes(key)) {
      newList.splice(newList.indexOf(key), 1);
      this.setState({
        numSelected: this.state.numSelected - 1
      });
    } else {
      newList.push(key);
      this.setState({
        numSelected: this.state.numSelected + 1
      });
    }
    this.setState({
      selected: newList
    });
  };
  componentDidMount() {
    this.getProductList();
  }
  render() {
    const { classes } = { ...this.props };
    return (
      <Paper className={classes.paper} elevation={10}>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: this.state.numSelected > 0
          })}
        >
          <div className={classes.title}>
            {this.state.numSelected > 0 ? (
              <Typography color="inherit" variant="subtitle1">
                {this.state.numSelected} selected
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle">
                Items
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          {this.state.numSelected > 0 ? (
            <IconButton onClick={this.handleDelete} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          ) : null}
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={
                    this.state.numSelected > 0 &&
                    this.state.numSelected <
                      (this.props.userItems === null
                        ? 0
                        : Object.keys(this.props.userItems).length)
                  }
                  checked={
                    this.state.numSelected !== 0 &&
                    this.state.numSelected ===
                      (this.props.userItems === null
                        ? 0
                        : Object.keys(this.props.userItems).length)
                  }
                  onChange={this.handleSelectAllClick}
                />
              </TableCell>
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
              Object.entries(this.props.userItems).map(([key, value]) => {
                return (
                  <TableRow
                    key={key}
                    hover
                    onClick={event => this.isSelected(key)}
                    role="checkbox"
                    aria-checked={key => this.isSelected(key)}
                    // selected={key => this.isSelected(key)}
                  >
                    <TableCell>
                      <Checkbox
                        // onChange={event => this.isSelected(key)}
                        checked={this.state.selected.includes(key)}
                      />
                    </TableCell>
                    <TableCell>{value.Name}</TableCell>
                    <TableCell>$ {value.Cost}</TableCell>
                    <TableCell>$ {value.Ship}</TableCell>
                    <TableCell>$ {value.Cut}</TableCell>
                    <TableCell>$ {value.Sold}</TableCell>
                    <TableCell>$ {value.Profit}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Anew.connect(PullUData));
