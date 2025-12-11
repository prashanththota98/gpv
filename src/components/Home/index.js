import { Component } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { RiBuildingLine } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import Loader from "react-loader-spinner";
import Header from "../Header";
import userNameContext from "../../context/userNameContext";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
class Home extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
    errMsg: "",
    err: false,
  };

  componentDidMount() {
    this.setState({
      profileData: [],
      apiStatus: apiStatusConstants.initial,
      errMsg: "",
      err: false,
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      this.setState({
        profileData: [],
        apiStatus: apiStatusConstants.initial,
        errMsg: "",
        err: false,
      });
    }
  }

  getProfile = async (searchInput) => {
    this.setState({
      errMsg: "",
      err: false,
      apiStatus: apiStatusConstants.inProgress,
    });

    try {
      console.log(process.env.REACT_APP_GITHUB_TOKEN);
      const url = `/api/profile?username=${searchInput}`;
      const options = { method: "GET" };
      const response = await fetch(url, options);

      if (!response.ok) {
        console.log("API response not OK");
        this.setState({ apiStatus: apiStatusConstants.failure });
        return;
      }

      const data = await response.json();

      const updateData = {
        avatarUrl: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        company: data.company,
        createdAt: data.created_at,
        email: data.email,
        eventsUrl: data.events_url,
        followers: data.followers,
        followersUrl: data.followers_url,
        followingUrl: data.following_url,
        following: data.following,
        gistsUrl: data.gists_url,
        gravatarId: data.gravatar_id,
        hireable: data.hireable,
        htmlUrl: data.html_url,
        id: data.id,
        location: data.location,
        login: data.login,
        name: data.name,
        nodeId: data.node_id,
        organizationsUrl: data.organizations_url,
        publicGists: data.public_gists,
        publicRepos: data.public_repos,
        receivedEventsUrl: data.received_events_url,
        reposUrl: data.repos_url,
        siteAdmin: data.site_admin,
        subscriptionsUrl: data.subscriptions_url,
        twitterUsername: data.twitter_username,
        type: data.type,
        updatedAt: data.updated_at,
        url: data.url,
      };

      this.setState((prevState) => ({
        profileData: [...prevState.profileData, updateData],
        apiStatus: apiStatusConstants.success,
      }));
    } catch (error) {
      console.error("Error fetching profile:", error);
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  /* onChangeUsername = event => {
    this.setState({searchInput: event.target.value, err: false, errMsg: ''})
  } */

  onClickSearch = (searchInput) => {
    if (searchInput.trim() === "") {
      this.setState({
        errMsg: "Enter the valid github username",
        err: true,
        apiStatus: apiStatusConstants.failure,
        profileData: [],
      });
    } else {
      this.setState({ errMsg: "", err: false });
      this.getProfile(searchInput);
    }
  };

  initialView = () => {
    const { apiStatus, profileData } = this.state;
    if (profileData.length === 0) {
      return (
        <>
          <div className="initialHeader">
            {apiStatus !== apiStatusConstants.inProgress && <Header />}
          </div>
          <div className="initial-main">
            <div className="search-bar-container">{this.searchBar()}</div>

            <div className="initial-container">
              <h1 className="body-headd">GitHub Profile Visualizer</h1>
              <img
                src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1759139812/Group_2_qzmo7w.png"
                alt="gitHub profile visualizer home page"
                className="initail-logo"
              />
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  successView = () => {
    const { profileData, apiStatus } = this.state;
    const object = profileData[0];

    const {
      avatarUrl,
      name,
      login,
      bio,
      blog,
      followers,
      following,
      publicRepos,
      company,
      location,
      organizationsUrl,
    } = object;

    return (
      <div className="successView-con">
        {apiStatus !== apiStatusConstants.inProgress && <Header />}
        <div className="searchbar-success">{this.searchBar()}</div>

        <div className="success-container">
          <img src={avatarUrl} alt={name} className="profile-img" />
          <h1 className="profile-login">{name}</h1>
          <p className="profile-name">{login}</p>
          <p className="profile-bio">{bio}</p>
          <p style={{ display: "none" }}>{blog}</p>
          <p style={{ display: "none" }}>Blog</p>
          <p style={{ display: "none" }}>BIO</p>
          <div className="profile-follers-con">
            <div className="sub-profile-follwers-con">
              <p className="f-count">{followers}</p>
              <p className="f-name">FOLLOWERS</p>
            </div>
            <hr className="line" />
            <div className="sub-profile-follwing-con">
              <p className="f-count">{following}</p>
              <p className="f-name">FOLLOWING</p>
            </div>
            <hr className="line" />
            <div className="sub-profile-repo-con">
              <p className="f-count">{publicRepos}</p>
              <p className="f-name">PUBLIC REPOS</p>
            </div>
          </div>
          <div className="profile-contact-con">
            <div className="sub-profile-company-con">
              <p className="f-count" data-testid="company-text">
                Company
              </p>
              <div className="logo-social">
                <RiBuildingLine
                  className="logo-s"
                  style={{ color: "#ffffff" }}
                />
                <p className="f-name">{company}</p>
              </div>
            </div>
            <div className="sub-profile-c-url-con">
              <p className="f-count" data-testid="companyUrl">
                Compeny Url
              </p>
              <div className="logo-social">
                <IoMdLink className="logo-s" style={{ color: "#ffffff" }} />
                <p className="f-name">{organizationsUrl}</p>
              </div>
            </div>
            <div className="sub-profile-location-con">
              <p className="f-count">Location</p>
              <div className="logo-social">
                <IoLocationOutline
                  className="logo-s"
                  style={{ color: "#ffffff" }}
                />
                <p className="f-name">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  );

  failureView = () => {
    const { apiStatus } = this.state;
    return (
      <>
        <div className="failureHeader">
          {apiStatus !== apiStatusConstants.inProgress && <Header />}
        </div>
        <div className="failure-container-home">
          <div className="search-bar-container">{this.searchBar()}</div>
          <div className="image-head-containerr">
            <h1 className="body-headd">Github Profile Visualizer</h1>
            <img
              src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1759140054/Group_7522_jk6e81.png"
              className="failed-imagee"
              alt="failure view"
            />
          </div>
          <p className="failed-descc">Something went wrong. Please try again</p>
          <userNameContext.Consumer>
            {({ searchInput }) => (
              <button
                className="fail-try-again-button"
                type="button"
                onClick={() => this.onClickSearch(searchInput)}
              >
                Try Again
              </button>
            )}
          </userNameContext.Consumer>
        </div>
      </>
    );
  };

  renderBasedApi = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.initialView();
      case apiStatusConstants.success:
        return this.successView();
      case apiStatusConstants.failure:
        return this.failureView();
      case apiStatusConstants.inProgress:
        return this.inProgressView();
      default:
        return null;
    }
  };

  searchBar = () => {
    const { err, errMsg, apiStatus } = this.state;
    const searchBorder = err ? "red-border" : "";
    return (
      <userNameContext.Consumer>
        {(value) => {
          const { searchInput, onChangeUsername } = value;
          return (
            <>
              {apiStatus !== apiStatusConstants.inProgress && (
                <div className="search-container">
                  <div className="input-con">
                    <input
                      type="search"
                      className={`input ${searchBorder}`}
                      value={searchInput}
                      onChange={onChangeUsername}
                      placeholder="Enter github username"
                    />
                    <button
                      className="but"
                      type="button"
                      data-testid="searchButton"
                      aria-label="Search input"
                      onClick={() => this.onClickSearch(searchInput)}
                    >
                      <HiOutlineSearch className="search-icon" />
                    </button>
                  </div>
                  {err && <h1 className="errMsg">{errMsg}</h1>}
                </div>
              )}
            </>
          );
        }}
      </userNameContext.Consumer>
    );
  };

  render() {
    return <div className="home-con">{this.renderBasedApi()}</div>;
  }
}

export default Home;

/*
      <h1 className="body-head">Github Profile Visualizer</h1>
      <img
        src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1759140054/Group_7522_jk6e81.png"
        className="failed-image"
        alt="failed-imag"
      />
      <p className="failed-desc">Something went wrong. Please try again</p>
      <button
        className="fail-try-again-button"
        type="button"
        onClick={this.getProfile}
      >
        Try Again
      </button> */

/* <div className="home-con">
              {apiStatus !== apiStatusConstants.inProgress && <Header />}
              {this.searchBar()}
              <div className="home-body">
                <div className="api-based-content">{this.renderBasedApi()}</div>
              </div>
            </div> */

// https://apis2.ccbp.in/gpv/profile-details/${searchInput}?api_key=token`
