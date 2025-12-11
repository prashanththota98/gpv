import { Link } from "react-router-dom";
import Languages from "../Languages";
import "./index.css";

const RepoList = (props) => {
  const { details } = props;
  const { name, description, languages, stargazersCount, forksCount } = details;

  return (
    <li className="repolist-item">
      <Link to={`/repositories/${name}`} className="reopItemLink-style">
        <div className="item-container">
          <h1 className="projectName">{name}</h1>
          <p className="projectDesc">{description}</p>
          <ul className="languages-container">
            {languages.map((eachLanguage, index) => (
              <Languages
                key={eachLanguage.value}
                languageDetails={eachLanguage}
                index={index}
              />
            ))}
          </ul>
          <div className="stargazers-and-forks-container">
            <div className="stargazerContainer">
              <img
                src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760160287/Icon_rpudls.png"
                alt="star"
                className="logostar"
              />
              <p className="starCount">{stargazersCount}</p>
            </div>
            <div className="forksContainer">
              <img
                src="https://res.cloudinary.com/dn2qzuhss/image/upload/v1760160339/Git_3_ypql11.png"
                alt="fork"
                className="logofork"
              />
              <p className="forkCount">{forksCount}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default RepoList;
