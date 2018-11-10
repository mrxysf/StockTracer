import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Anew from "anew";

//Components
import FirebaseLogIn from "./components/firebase/firebaseLogIn";
import Home from "./components/home";
import ErrorPage from "./components/errorPage";
import WriteData from "./components/firebase/writeData";
import FirebaseSignUp from "./components/firebase/firebaseSignUp";
import PrivateRoute from "./components/privateRoute";

var config = {
  apiKey: "AIzaSyD6EnWKbB_24rOlml6_Cf8HkpyrKokrBrY",
  authDomain: "expo-project-e7272.firebaseapp.com",
  databaseURL: "https://expo-project-e7272.firebaseio.com",
  projectId: "expo-project-e7272",
  storageBucket: "expo-project-e7272.appspot.com",
  messagingSenderId: "68218292012"
};
firebase.initializeApp(config);

class App extends Component {
  static mapStateToProps(select) {
    return {
      isAuth: select.authenticate.getAuth()
    };
  }

  render() {
    const PrivateRoutes = [
      {
        key: "home",
        authed: this.props.isAuth,
        path: "/home",
        component: Home
      },
      {
        key: "newData",
        authed: this.props.isAuth,
        path: "/newData",
        component: WriteData
      }
    ];

    // const renderLogin = () =>
    //   this.props.isAuth ? <Redirect to="/home" /> : <FirebaseLogIn />;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={FirebaseLogIn} exact />
          <Route path="/login" component={FirebaseLogIn} exact />
          <Route path="/signUp" component={FirebaseSignUp} exact />
          {PrivateRoutes.map(props => (
            <PrivateRoute key={props.key} {...props} />
          ))}
          <Route path="*" component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Anew.connect(App);
