import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Repositories from "./components/Repositories";
import Analysis from "./components/Analysis";
import NotFound from "./components/NotFound";
import RepositoryItemDetails from "./components/RepositoryItemDetails";
import userNameContext from "./context/userNameContext";
import "./App.css";

class App extends Component {
  state = { searchInput: "", isMenuOpen: false };

  onChangeUsername = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  render() {
    const { searchInput, isMenuOpen } = this.state;
    return (
      <userNameContext.Provider
        value={{
          searchInput,
          onChangeUsername: this.onChangeUsername,
          isMenuOpen,
          toggleMenu: this.toggleMenu,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/repositories" component={Repositories} />
          <Route
            exact
            path="/repositories/:repoName"
            component={RepositoryItemDetails}
          />
          <Route exact path="/analysis" component={Analysis} />
          <Route component={NotFound} />
        </Switch>
      </userNameContext.Provider>
    );
  }
}

export default App;
