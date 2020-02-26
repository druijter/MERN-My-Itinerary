import React, { Component } from "react";

import "../CSS/App.css";
import Landing from "./Landing";
import Cities from "./Cities";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import HamburgerMenu from "./HamburgerMenu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HamburgerMenuList from "./HamburgerMenuList";
import Itinerary from "./Itinerary";
import { loadUser } from "../store/actions/authActions";
import store from "../index.js";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.store.dispatch(loadUser());
  }

  state = {
    hamburgerMenuList: false
  };

  drawerToggleClickHandler = e => {
    console.log(e.target);
    this.setState(prevState => {
      return { hamburgerMenuList: !prevState.hamburgerMenuList };
    });
  };

  backdropClickHandler = () => {
    this.setState({ hamburgerMenuList: false });
  };

  routesGenerator() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/Cities" component={Cities} />
        <Route exact path="/Create-account" component={CreateAccount} />
        <Route exact path="/Login" component={Login} />
        <Route path="/itinerary/:name/:cityName" component={Itinerary} />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="hamburger-grid">
          <HamburgerMenu
            drawerToggleClickHandler={this.drawerToggleClickHandler}
          ></HamburgerMenu>
        </div>

        <main className="main-content">
          <BrowserRouter>
            {this.state.hamburgerMenuList ? (
              <HamburgerMenuList />
            ) : (
              this.routesGenerator()
            )}
          </BrowserRouter>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state
  };
};
export default connect(mapStateToProps)(App);

// export default App;
