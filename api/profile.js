export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const response = await fetch(
      `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${process.env.GITHUB_TOKEN}`
    );

    const data = await response.json();

    if (response.status !== 200) {
      return res
        .status(response.status)
        .json({ error: data.message || "API error" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
