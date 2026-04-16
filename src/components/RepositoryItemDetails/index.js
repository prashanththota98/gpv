import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "react-loader-spinner";
import Header from "../Header";
import Languages from "../Languages";
import ContributorsImages from "../ContributorsImages";
import PieCharts from "../PieCharts";
import userNameContext from "../../context/userNameContext";
import "./index.css";

const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

const convertKeysToCamelCase = (input) => {
  if (Array.isArray(input)) {
    return input.map(convertKeysToCamelCase);
  }
  if (input !== null && typeof input === "object") {
    return Object.entries(input).reduce((acc, [key, value]) => {
      acc[toCamelCase(key)] = convertKeysToCamelCase(value);
      return acc;
    }, {});
  }
  return input;
};

const fetchRepository = async ({ queryKey }) => {
  const [_key, searchInput, repoName] = queryKey;

  const response = await fetch(
    `/api/repoDetails?username=${searchInput}&repoName=${repoName}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository");
  }

  const data = await response.json();
  return convertKeysToCamelCase(data);
};

const RepositoryItemDetails = () => {
  const { searchInput } = useContext(userNameContext);
  const { repoName } = useParams();

  const {
    data: itemDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["repoDetails", searchInput, repoName],
    queryFn: fetchRepository,
    enabled: !!searchInput && !!repoName,
  });

  // 🔄 Loading
  if (isLoading) {
    return (
      <div className="loading-container" data-testid="loader">
        <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fail-con">
        <Header />
        <img
          src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760248122/Group_7522_1_hbld4y.png"
          alt="failure view"
          className="fail-image"
        />
        <p className="failed-paraa">Something went wrong. Please try again</p>
        <button className="tryButtton" onClick={refetch}>
          Try again
        </button>
      </div>
    );
  }


  if (!itemDetails) return null;

  
  const contributorsLength = itemDetails.contributors.length;
  const contributorsToShow = 5;
  const remainingContributors = contributorsLength - contributorsToShow;

  return (
    <div className="repoItem-container">
      <Header />

      <div className="itemDetailsContainer">
        <h1 className="itemheading">{itemDetails.name}</h1>
        <p className="itemDesc">{itemDetails.description}</p>

        <ul className="lang-container">
          {itemDetails.languages?.map((eachItem, index) => (
            <Languages
              key={eachItem.value}
              languageDetails={eachItem}
              index={index}
            />
          ))}
        </ul>

        <div className="stars-forks-container">
          <div className="stars-container">
            <img
              src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760160287/Icon_rpudls.png"
              alt="star"
              className="star-logo"
            />
            <p className="count">{itemDetails.stargazersCount}</p>
          </div>

          <div className="forks-container">
            <img
              src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760160339/Git_3_ypql11.png"
              alt="fork"
              className="fork-logo"
            />
            <p className="count">{itemDetails.forksCount}</p>
          </div>
        </div>

        <div className="commits-issues-container">
          <div className="commits-container">
            <p className="ci-name">Watchers Counts</p>
            <p className="cicount">{itemDetails.watchersCount}</p>
          </div>

          <div className="issues-contianer">
            <p className="ci-name">Issues Counts</p>
            <p className="cicount">{itemDetails.openIssuesCount}</p>
          </div>
        </div>

        <h1 className="contributorHead">Contributors :</h1>
        <p className="noofcontributors">{contributorsLength} Members</p>

        <ul className="contributorsImagesContainer">
          {itemDetails.contributors.slice(0, 5).map((eachContributor) => (
            <ContributorsImages
              key={eachContributor.id}
              contributorDetails={eachContributor}
            />
          ))}

          {contributorsLength > 5 && (
            <div className="remaining-count">
              <h1 className="remaining-count-image">
                +{remainingContributors}
              </h1>
            </div>
          )}
        </ul>

        <h1 className="pieChartHeadingLanguages">Languages :</h1>

        <PieCharts pieData={itemDetails.languages} />
      </div>
    </div>
  );
};

export default RepositoryItemDetails;
