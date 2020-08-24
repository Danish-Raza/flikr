import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Group from "./components/Group";
import { Provider } from "react-redux";
import storeConfig from "./store/configStore";
//import "bootstrap4/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

require('dotenv').config()
const store = storeConfig();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route exact path="/group/:nsid" component={Group} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
