import React, { Component } from "react";
import PullUData from "./firebase/pullUData";
import { Redirect } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ModalAddData from "./modalAddData";
const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class Home extends Component {
  state = {
    redirect: false,
    isOpen: false
  };
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/newData" />;
    }
    const { classes } = { ...this.props };
    return (
      <div>
        <PullUData />
        <ModalAddData
          isOpen={this.state.isOpen}
          onClose={() => this.handleClose()}
        />
        <Button
          className={classes.fab}
          variant="fab"
          color="primary"
          aria-label="Add"
          text="Add New Item"
          onClick={() => this.handleOpen()}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
