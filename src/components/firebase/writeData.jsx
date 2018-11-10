import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ButtonElement from "../../elements/button";
import firebase from "firebase";
import { FormInputElement } from "../../elements/input";
import Anew from "anew";

class WriteData extends Component {
  state = {
    iName: "",
    iCost: 0,
    iShip: 0,
    iCut: 0,
    iSold: 0,
    iProfit: 0,
    redirect: false,
    cancel: false
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
  handleWrite = () => {
    var profit =
      this.state.iSold - this.state.iCost - this.state.iShip - this.state.iCut;
    //savin profit to database to not calculate on every reload
    this.setState({ iProfit: profit }, () => {
      console.log(this.state.iProfit);
      firebase
        .database()
        .ref(`users/${this.props.userID}/listOfItems/`)
        .push({
          Name: this.state.iName,
          Sold: this.state.iSold,
          Cost: this.state.iCost,
          Ship: this.state.iShip,
          Profit: this.state.iProfit,
          Cut: this.state.iCut
        })
        .then(data => {
          this.props.setNumItems(this.props.numItems + 1);
          this.setState({
            redirect: true
          });
        })
        .catch(error => {
          //pring if failed
          console.log("error", error);
        });
    });
  };

  redirect = () => {
    this.setState({
      cancel: true
    });
  };

  render() {
    if (this.state.cancel) {
      return <Redirect to="/home" />;
    }
    const inputs = [
      {
        key: "Name",
        type: "text",
        onInput: input => this.setState({ iName: input.target.value }),
        placeholder: "Item Name:"
      },
      {
        key: "Cost",
        type: "number",
        onInput: input => this.setState({ iCost: input.target.value }),
        placeholder: "Item Cost"
      },
      {
        key: "Shipment",
        type: "number",
        onInput: input => this.setState({ iShip: input.target.value }),
        placeholder: "Item Shipment Cost:"
      },
      {
        key: "Cut",
        type: "number",
        onInput: input => this.setState({ iCut: input.target.value }),
        placeholder: "Item Cut"
      },
      {
        key: "Sold",
        type: "number",
        onInput: input => this.setState({ iSold: input.target.value }),
        placeholder: "Item Sold"
      }
    ];
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    return (
      <form className="ui form">
        {inputs.map(input => (
          <FormInputElement key={input.key} {...input} />
        ))}
        <p />
        <ButtonElement onClick={this.handleWrite} text="Submit" />
        <ButtonElement onClick={this.redirect} text="Cancel" />
      </form>
    );
  }
}

export default Anew.connect(WriteData);
