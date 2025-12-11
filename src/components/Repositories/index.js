import { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "../Header";
import RepoList from "../RepoList";
import userNameContext from "../../context/userNameContext";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESSS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class Repositories extends Component {
  state = {
    lastSearchInput: "",
    repoData: [],
    apiStatus: apiConstants.initial,
  };

  componentDidMount() {
    const { searchInput } = this.context;
    console.log("componentDidMount - searchInput:", searchInput); // Debugging
    this.updateRepositorySearch(searchInput);
  }

  componentDidUpdate() {
    const { searchInput } = this.context;
    const { lastSearchInput } = this.state;
    if (searchInput !== lastSearchInput) {
      console.log("componentDidUpdate - new searchInput:", searchInput); // Debugging
      this.updateRepositorySearch(searchInput);
    }
  }

  updateRepositorySearch = (searchInput) => {
    if (searchInput && searchInput.trim() !== "") {
      console.log("Calling fetchRepositories for:", searchInput); // Debugging
      this.fetchRepositories(searchInput);
      this.setState({ lastSearchInput: searchInput });
    } else {
      this.setState({
        repoData: [],
        apiStatus: apiConstants.initial,
        lastSearchInput: "",
      });
      console.log("No search input provided, resetting state."); // Debugging
    }
  };

  toCamelCase = (str) =>
    str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

  convertKeysToCamelCase = (input) => {
    if (Array.isArray(input)) {
      return input.map(this.convertKeysToCamelCase);
    }
    if (input !== null && typeof input === "object") {
      return Object.entries(input).reduce((accumulator, [key, value]) => {
        const newKey = this.toCamelCase(key);
        accumulator[newKey] = this.convertKeysToCamelCase(value);
        return accumulator;
      }, {});
    }
    return input;
  };

  fetchRepositories = async (searchInput) => {
    this.setState({ apiStatus: apiConstants.inProgress });
    try {
      const apiUrl = `/api/repositories?username=${searchInput}`;
      console.log("Fetching data from:", apiUrl); // Debugging
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        // Debugging
        const camelCaseData = this.convertKeysToCamelCase(data);
        this.setState({
          repoData: camelCaseData,
          apiStatus: apiConstants.success,
        });
      } else {
        console.log("API response failed, setting failure status."); // Debugging
        this.setState({ apiStatus: apiConstants.failure });
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Debugging
      this.setState({ apiStatus: apiConstants.failure });
    }
  };

  initialViewPage = () => (
    <>
      <div className="initial-container-repo">
        <img
          src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760187940/Empty_Box_Illustration_1_eke2w7.png"
          alt="empty repositories"
          className="empty-box"
        />
        <h1 className="noDataHead">No Data Found</h1>
        <p className="initialDesc">
          GitHub Username is empty, please provide a valid username for
          Repositories
        </p>
        <Link to="/" className="link-style">
          <button type="button" className="gotohomebuttonRepo">
            Go to Home
          </button>
        </Link>
      </div>
    </>
  );

  inProgressPage = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  );

  failureViewPage = () => (
    <>
      <div className="failure-container-repo">
        <img
          src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760248122/Group_7522_1_hbld4y.png"
          alt="failure view"
          className="failed-image"
        />
        <p className="failed-desc">Something went wrong. Please try again</p>
        <button
          type="button"
          className="failedtryagainbutton"
          onClick={this.fetchRepositories}
        >
          Try again
        </button>
      </div>
    </>
  );

  noDataPage = () => (
    <>
      <div className="noDataView">
        <img
          src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760236418/Layer_3_trxo8y.png"
          alt="no repositories"
          className="norepoimage"
        />
        <h1 className="norepohead">No Repositories Found!</h1>
      </div>
    </>
  );

  dataViewPage = () => {
    const { repoData } = this.state;
    if (repoData.length === 0) {
      return this.noDataPage();
    }
    const ownerLogin = repoData[0]?.owner?.login;
    const ownerAvatar = repoData[0]?.owner?.avatarUrl;
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={ownerAvatar}
            alt={ownerLogin}
            className="owner-avatar"
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              marginLeft: "24px",
              marginTop: "24px",
              marginRight: "20px",
            }}
          />
          <h2 style={{ color: "#ffffff", fontSize: "15px" }}>{ownerLogin}</h2>
        </div>
        <ul className="repolist-container">
          {repoData.map((eachItem) => (
            <RepoList key={eachItem.id} details={eachItem} />
          ))}
        </ul>
      </div>
    );
  };

  successViewPage = () => <div>{this.dataViewPage()}</div>;

  render() {
    const { repoData, apiStatus } = this.state;
    if (apiStatus === apiConstants.inProgress) {
      return this.inProgressPage();
    }
    return (
      <div className="repositories-container">
        <Header />
        {apiStatus === apiConstants.success && repoData.length > 0 && (
          <h1 className="repositories-heading" data-testid="heading">
            Repositories
          </h1>
        )}
        {apiStatus === apiConstants.initial && this.initialViewPage()}
        {apiStatus === apiConstants.failure && this.failureViewPage()}
        {apiStatus === apiConstants.success && this.successViewPage()}
      </div>
    );
  }
}

Repositories.contextType = userNameContext;

export default Repositories;

/* <ul className="repolist-container">
          {repoData.map(eachItem => (
            <RepoList key={eachItem.id} details={eachItem} />
          ))}

           if (repoData.length === 0) {
      return this.noDataPage()
    }

    const ownerLogin = repoData[0]?.owner?.login
    const ownerAvatar = repoData[0]?.owner?.avatarUrl


          <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <img
            src={ownerAvatar}
            alt={ownerLogin}
            className="owner-avatar"
            style={{
              height: '50px',
              width: '50px',
              borderRadius: '50%',
              marginLeft: '24px',
              marginTop: '24px',
              marginRight: '20px',
            }}
          />
          <h2 style={{color: '#ffffff', fontSize: '15px'}}>{ownerLogin}</h2>
        </div>
        </ul> */
