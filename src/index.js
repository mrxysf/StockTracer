import React from "react";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Anew from "anew";
import rootStore from "./redux";
import "semantic-ui-css/semantic.min.css";

Anew.store(rootStore);

Anew.entry(App);

Anew.mount("root", <App />);
// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
