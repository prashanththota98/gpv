import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760249889/Group_7519_ufaahk.png"
      alt="page not found"
      className="notfoundimage"
    />
    <h1 className="notfoundhead">PAGE NOT FOUND</h1>
    <p className="notfounddesc">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/" className="link-style">
      <button type="button" className="gotohomebutton">
        Go to Home
      </button>
    </Link>
  </div>
);

export default NotFound;
