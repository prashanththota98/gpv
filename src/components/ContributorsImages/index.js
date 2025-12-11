import "./index.css";

const ContributorsImages = (props) => {
  const { contributorDetails } = props;
  const { avatarUrl } = contributorDetails;
  return (
    <li className="contributorItem">
      <img src={avatarUrl} alt="contributor profile" className="avatarImage" />
    </li>
  );
};

export default ContributorsImages;
