import fetch from "node-fetch";
export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${process.env.GITHUB_TOKEN}`,
    );

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.message || "GitHub API error" });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
