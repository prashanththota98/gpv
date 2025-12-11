import "./index.css";

const colors = ["col1", "col2", "col3", "col4", "col5"];

const Languages = (props) => {
  const { languageDetails, index } = props;
  const { name } = languageDetails;
  const randomColor = colors[index % colors.length];

  return (
    <li className={`language-list-item ${randomColor}`}>
      <p className="language-name">{name}</p>
    </li>
  );
};

export default Languages;
