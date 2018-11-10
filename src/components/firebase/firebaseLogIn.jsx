import React, { Component } from "react";
import Anew from "anew";
import firebase from "firebase";
import ButtonElement from "../../elements/button";
import { FormInputElement } from "../../elements/input";
import { Redirect } from "react-router-dom";
import { Form, Grid, Header, Message, Segment } from "semantic-ui-react";
class FirebaseLogIn extends Component {
  state = {
    email: "",
    password: "",
    sInRed: false,
    sUpRed: false,
    btnLoading: false
  };

  static mapStateToProps(select) {
    return {
      userID: select.userInfo.getUserID(),
      userItems: select.userInfo.getUserItems()
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      setUserID: dispatch.reducers.userInfo.setUserID,
      setAuth: dispatch.reducers.authenticate.authenticated
    };
  }

  handleLogIn = () => {
    this.setState({
      btnLoading: true
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.props.setUserID(user.user.uid);
        //set auth true
        this.props.setAuth();
        this.setState({
          btnLoading: false,
          sInRed: true
        });
      })
      .catch(err => {
        console.log(err.toString());
        this.setState({
          btnLoading: false
        });
      });
  };

  render() {
    const buttons = [
      {
        key: "button 1",
        text: "Log In",
        appearance: "primary",
        shouldFitContainer: true,
        isLoading: this.state.btnLoading,
        // className: classes.button,
        onClick: this.handleLogIn
      }
    ];
    const inputs = [
      {
        key: "Email Input",
        type: "text",
        fluid: true,
        icon: "user",
        iconPosition: "left",
        onInput: input => this.setState({ email: input.target.value }),
        placeholder: "E-Mail Address:"
      },
      {
        key: "Password Input",
        fluid: true,
        icon: "lock",
        iconPosition: "left",
        onInput: input => this.setState({ password: input.target.value }),
        placeholder: "Password",
        type: "password"
      }
    ];
    //login redirect
    if (this.state.sInRed) {
      return (
        <Redirect
          to={{
            pathname: "/home"
          }}
        />
      );
    }
    return (
      <div className="login-form">
        {/* css */}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                {inputs.map(input => (
                  <FormInputElement key={input.key} {...input} />
                ))}
                {buttons.map(link => (
                  <ButtonElement key={link.key} {...link} />
                ))}
              </Segment>
            </Form>
            <Message>
              New to us?{" "}
              <a
                href="/signUp"
                // onClick={() => {
                //   this.setState({
                //     sUpRed: true
                //   });
                // }}
              >
                Sign Up
              </a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Anew.connect(FirebaseLogIn);
