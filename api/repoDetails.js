export default async function handler(req, res) {
  const { username, repoName } = req.query;

  const response = await fetch(
    `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}?api_key=${process.env.GITHUB_TOKEN}`
  );

  const data = await response.json();
  res.status(200).json(data);
}
