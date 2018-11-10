import React, { Component } from "react";
import firebase from "firebase";
import ButtonElement from "../../elements/button";
import { FormInputElement } from "../../elements/input";
import { Redirect } from "react-router-dom";
import { Form, Grid, Header, Segment } from "semantic-ui-react";

class FirebaseSignUp extends Component {
  state = {
    email: "",
    password: "",
    redirect: false
  };
  handleSignUp = () => {
    if (this.state.password.length < 6) {
      alert("Please enter at least 6 characters");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.initUser();
        this.setState({
          redirect: true
        });
      })
      .catch(err => {
        alert(err.toString());
      });
  };
  initUser = () => {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .set({
        email: this.state.email,
        listOfItems: "empty"
      })
      .then(data => {
        //log if successful
        console.log("data", data);
      })
      .catch(error => {
        //log if error
        console.log("error", error);
      });
  };
  render() {
    const buttons = [
      {
        key: "button 1",
        text: "Sign Up",
        color: "teal",
        fluid: true,
        size: "large",
        onClick: this.handleSignUp
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
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-form">
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
              Sign-up for an account
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default FirebaseSignUp;
