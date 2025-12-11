import React from "react";

const userNameContext = React.createContext({
  searchInput: "",
  onChangeUsername: () => {},
  isMenuOpen: false,
  toggleMenu: () => {},
});

export default userNameContext;
