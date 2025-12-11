import { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import Header from "../Header";
import userNameContext from "../../context/userNameContext";
import LinearCharts from "../LinearCharts";
import PieCharts from "../PieCharts";
import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class Analysis extends Component {
  state = {
    lastSearchInput: "",
    analysisData: null,
    apiStatus: apiConstants.initial,
  };

  componentDidMount() {
    this.setState({
      analysisData: null,
      apiStatus: apiConstants.initial,
      lastSearchInput: "",
    });
  }

  componentDidUpdate() {
    const { searchInput } = this.context;
    const { lastSearchInput } = this.state;
    if (
      searchInput &&
      searchInput.trim() !== "" &&
      searchInput !== lastSearchInput
    ) {
      console.log("componentDidUpdate - fetching for:", searchInput);
      this.updateAnalysisSearch(searchInput);
    }
  }

  updateAnalysisSearch = (searchInput) => {
    if (searchInput && searchInput.trim() !== "") {
      console.log("Calling fetchRepositories for:", searchInput); // Debugging
      this.fetchAnalysisData(searchInput);
      this.setState({ lastSearchInput: searchInput });
    } else {
      this.setState({
        analysisData: [],
        apiStatus: apiConstants.initial,
        lastSearchInput: "",
      });
      console.log("No search input provided, resetting state."); // Debugging
    }
  };

  fetchAnalysisData = async (searchInput) => {
    this.setState({ apiStatus: apiConstants.inProgress });
    try {
      const apiUrl = `/api/analysis?username=${searchInput}`;
      console.log("Fetching data from:", apiUrl); // Debugging
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({
          analysisData: data,
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
    <div className="a-initial-container">
      <Header />
      <div className="a-initial-body">
        <img
          src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760187940/Empty_Box_Illustration_1_eke2w7.png"
          alt="empty analysis"
          className="emtybox"
        />
        <h1 className="noDataFound">No Data Found</h1>
        <p className="descforempty">
          GitHub Username is empty, please provide a valid username for analysis
        </p>

        <Link to="/" className="gotohome" data-testid="go-to-home">
          <button type="button" className="gthb">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );

  failureViewPage = () => {
    const { lastSearchInput } = this.state;
    return (
      <div className="failed-view-container">
        <Header />
        <img
          src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760248122/Group_7522_1_hbld4y.png"
          alt="failure view"
          className="failed-img"
        />
        <p className="fail-desc-anal">Something went wrong. Please try again</p>
        <button
          type="button"
          className="tryagainbut"
          onClick={() => this.fetchAnalysisData(lastSearchInput)}
        >
          Try again
        </button>
      </div>
    );
  };

  inProgressPage = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
    </div>
  );

  transformDataForChart = (data) =>
    data?.quarterCommitCount
      ? Object.entries(data.quarterCommitCount).map(
          ([quarter, commitCount]) => ({
            name: quarter,
            commits: commitCount,
          })
        )
      : [];

  transformLangRepoCount = (data) => {
    if (!data) return [];
    return Object.entries(data).map(([language, repoCount]) => ({
      name: language,
      value: repoCount,
    }));
  };

  transformRepoCommitCountWithDescriptions = (
    repoCommitCount,
    repoCommitCountDescriptions
  ) =>
    Object.entries(repoCommitCount)
      .sort((a, b) => b[1] - a[1]) // Sort by commit count descending
      .slice(0, 10) // Get only the top 10
      .map(([repoName, commitCount]) => ({
        name: repoName,
        value: commitCount,
        description:
          repoCommitCountDescriptions[repoName] || "No description available",
      }));

  emptyResponse = () => (
    <div className="empty-reponse-container">
      <Header />
      <img
        src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760236418/Layer_3_trxo8y.png"
        alt="no analysis"
        className="empty-image"
      />
      <h1 className="noAnalFound">No Analysis Found!</h1>
    </div>
  );

  analysisResponse = () => {
    const { analysisData } = this.state;
    const { user } = analysisData;
    return (
      <div className="analysis-container">
        <Header />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={user?.avatarUrl}
            alt={user?.login}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              marginLeft: "24px",
              marginTop: "24px",
              marginRight: "20px",
            }}
          />
          <h1 style={{ color: "#ffffff", fontSize: "15px" }}>{user?.login}</h1>
        </div>

        <h2 className="analysis-heading" data-testid="analysisHeading">
          Analysis
        </h2>
        <div className="linearChart" data-testid="line chart">
          <LinearCharts
            quarterCommitCount={this.transformDataForChart(analysisData)}
          />
        </div>
        <div className="lrlc">
          <div className="lpr">
            <h1 className="lang-per-repo">Language Per Repos</h1>
            <div className="l-p-r">
              <PieCharts
                pieData={this.transformLangRepoCount(
                  analysisData.langRepoCount
                )}
                className="analysis-lpr-pie"
              />
            </div>
          </div>
          <div className="lpc">
            <h1 className="lpch">Language Per Commits</h1>
            <div>
              <PieCharts
                pieData={this.transformLangRepoCount(
                  analysisData.langCommitCount
                )}
                className="analysis-lpch-pie"
              />
            </div>
          </div>
        </div>
        <div className="top10commits">
          <h1 className="top10Name">Commits Per Repo (Top 10)</h1>
          <PieCharts
            pieData={this.transformRepoCommitCountWithDescriptions(
              analysisData.repoCommitCount,
              analysisData.repoCommitCountDescriptions
            )}
            className="top10commits-pie"
            legendPosition="top10CommitsSmallScreen"
          />
        </div>
      </div>
    );
  };

  successViewPage = () => {
    const { analysisData } = this.state; // <-- get it from state
    return analysisData ? this.analysisResponse() : this.emptyResponse();
  };

  render() {
    const { analysisData, apiStatus } = this.state;
    if (apiStatus === apiConstants.inProgress) {
      return this.inProgressPage();
    }
    console.log(analysisData);
    return (
      <div>
        {apiStatus === apiConstants.initial && this.initialViewPage()}
        {apiStatus === apiConstants.failure && this.failureViewPage()}
        {apiStatus === apiConstants.success && this.successViewPage()}
      </div>
    );
  }
}

Analysis.contextType = userNameContext;

export default Analysis;

/* 
import {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import userNameContext from '../../context/userNameContext'
import LinearCharts from '../LinearCharts'
import PieCharts from '../PieCharts'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const Analysis = () => {
  const {searchInput} = useContext(userNameContext)
  const [analysisData, setAnalysisData] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const fetchAnalysisData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const apiurl = `https://apis2.ccbp.in/gpv/profile-summary/${searchInput}`
    try {
      const response = await fetch(apiurl)
      if (response.ok) {
        const data = await response.json()

        setAnalysisData(data)
        setApiStatus(apiStatusConstants.success)
        console.log(data)
      } else {
        setApiStatus(apiStatusConstants.failure)
        setAnalysisData(null)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      setAnalysisData(null)
    }
  }

  useEffect(() => {
    fetchAnalysisData()
  }, [searchInput])

  const transformDataForChart = data =>
    Object.entries(data.quarterCommitCount).map(([quarter, commitCount]) => ({
      name: quarter,
      commits: commitCount,
    }))

  const transformLangRepoCount = data => {
    if (!data) return []
    return Object.entries(data).map(([language, repoCount]) => ({
      name: language,
      value: repoCount,
    }))
  }

  const transformRepoCommitCountWithDescriptions = (
    repoCommitCount,
    repoCommitCountDescriptions,
  ) =>
    Object.entries(repoCommitCount)
      .sort((a, b) => b[1] - a[1]) // Sort by commit count descending
      .slice(0, 10) // Get only the top 10
      .map(([repoName, commitCount]) => ({
        name: repoName,
        value: commitCount,
        description:
          repoCommitCountDescriptions[repoName] || 'No description available',
      }))

  const emptyResponse = () => (
    <div className='empty-reponse-container'>
      <Header />
      <img
        src='https://res.cloudinary.com/dn2qzuhss/image/upload/v1760236418/Layer_3_trxo8y.png'
        alt='no analysis'
        className='empty-image'
      />
      <h1 className='noAnalFound'>No Analysis Found!</h1>
    </div>
  )

  const nonEmptyResponse = () => {
    const {user} = analysisData
    return (
      <div className='analysis-container'>
        <Header />
        <h1>{user?.login}</h1>
        <img src={user?.avatarUrl} alt={user?.login} />
        <h1 className='analysis-heading' data-testid='analysisHeading'>
          Analysis
        </h1>
        <div className='linearChart' data-testid='line chart'>
          <LinearCharts data={transformDataForChart(analysisData)} />
        </div>
        <div className='lrlc'>
          <div className='lpr'>
            <h1 className='lang-per-repo'>Language Per Repos</h1>
            <div className='l-p-r'>
              <PieCharts
                pieData={transformLangRepoCount(analysisData.langRepoCount)}
                className='analysis-lpr-pie'
              />
            </div>
          </div>
          <div className='lpc'>
            <h1 className='lpch'>Language Per Commits</h1>
            <div>
              <PieCharts
                pieData={transformLangRepoCount(analysisData.langCommitCount)}
                className='analysis-lpch-pie'
              />
            </div>
          </div>
        </div>
        <div className='top10commits'>
          <h1 className='top10Name'>Commits Per Repo (Top 10)</h1>
          <PieCharts
            pieData={transformRepoCommitCountWithDescriptions(
              analysisData.repoCommitCount,
              analysisData.repoCommitCountDescriptions,
            )}
            className='top10commits-pie'
            legendPosition='top10CommitsSmallScreen'
          />
        </div>
      </div>
    )
  }

  const successView = () =>
    analysisData ? nonEmptyResponse() : emptyResponse()

  const failureView = () => (
    <div className='failed-view-container'>
      <Header />
      <img
        src='https://res.cloudinary.com/dn2qzuhss/image/upload/v1760248122/Group_7522_1_hbld4y.png'
        alt='failure view'
        className='failed-img'
      />
      <p className='fail-desc-anal'>Something went wrong. Please try again</p>
      <button
        type='button'
        className='tryagainbut'
        onClick={() => fetchAnalysisData()}
      >
        Try again
      </button>
    </div>
  )

  const loadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Link to='/' style={{color: 'transparent'}}>
        Home
      </Link>
      <Loader type='TailSpin' color='#3B82F6' height={50} width={50} />
    </div>
  )

  const initialView = () => (
    <div className='a-initial-container'>
      <Header />
      <div className='a-initial-body'>
        <img
          src='https://res.cloudinary.com/dn2qzuhss/image/upload/v1760187940/Empty_Box_Illustration_1_eke2w7.png'
          alt='empty analysis'
          className='emtybox'
        />
        <h1 className='noDataFound'>No Data Found</h1>
        <p className='descforempty'>
          GitHub Username is empty, please provide a valid username for analysis
        </p>

        <Link to='/' className='gotohome'>
          <button type='button' className='gthb'>
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  )

  const renderResult = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.failure:
        return failureView()
      case apiStatusConstants.inProgress:
        return loadingView()
      default:
        return null
    }
  }

  return searchInput ? renderResult() : initialView()
}

export default Analysis






/*
<div className="analysis-container">
      <Header />
      <h1 className="analysis-heading">Analysis</h1>
      <ul>
        {analysisData.quarterCommitCount.map(eachItem => (
          <li>eachItem</li>
        ))}
      </ul>
      </div>

      <ul>
        {Object.entries(analysisData.quarterCommitCount).map(
          ([quarter, commitCount]) => (
            <li key={quarter}>
              {quarter}: {commitCount}
            </li>
          ),
        )}
      </ul>
      */
