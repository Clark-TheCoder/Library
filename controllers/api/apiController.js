export async function getQuote(req, res) {
  try {
    let response = await fetch("https://zenquotes.io/api/today", {
      method: "GET",
    });
    let data = await response.json();
    if (response.ok) {
      return res.status(200).json({ text: data[0].q, author: data[0].a });
    } else {
      return res
        .status(400)
        .json({ message: "No quote available at this time." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No quote available at this time." });
  }
}
