import { Component } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Link } from "react-router-dom";
import "./index.css";

class Header extends Component {
  state = { isMenuOpen: false };

  toggleMenu = () => {
    console.log("changing state");
    this.setState((prevState) => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  render() {
    const { isMenuOpen } = this.state;
    console.log(isMenuOpen);
    return (
      <nav className="nav">
        <div className="sm-style">
          <Link to="/" className="logoheadlink-style">
            <div className="logo-head-con">
              <h1 className="logo-head">GitHub Profile Visualizer</h1>
            </div>
          </Link>

          <button
            type="button"
            aria-label="hamburger-button"
            className="hamburger-container"
            onClick={this.toggleMenu}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <ul className={`ul-con ${isMenuOpen ? "showMenu" : "hideMenu"}`}>
          <li>
            <NavLink to="/" exact className="liHome" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/repositories"
              className="liRepo"
              activeClassName="active"
            >
              Repositories
            </NavLink>
          </li>
          <li>
            <NavLink to="/analysis" activeClassName="active" className="liAnal">
              Analysis
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
