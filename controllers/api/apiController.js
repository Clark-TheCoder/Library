import dotenv from "dotenv";
dotenv.config();

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

export async function getBestSellers(req, res) {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_KEY}`,
      { method: "GET" }
    );

    let data = await response.json();
    if (response.ok) {
      const topThree = data.results.books.map((book) => ({
        title: book.title,
        author: book.author,
        description: book.description,
        rank: book.rank,
        weeks_on_list: book.weeks_on_list,
        book_image: book.book_image,
        amazon_link: book.amazon_product_url,
        book_review_link: book.book_review_link,
      }));
      return res.status(200).json(topThree);
    } else {
      return res
        .status(400)
        .json({ message: "Cannot get the best sellers at this moment." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Cannot get the best sellers at this moment." });
  }
}

export async function getWeather(req, res) {
  const { lat, long } = req.query;

  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?unitGroup=us&key=${process.env.WEATHER_KEY}&contentType=json`
    );

    const data = await response.json();
    if (response.ok) {
      return res.status(200).json(data.days);
    } else {
      return res
        .status(400)
        .json({ message: "Cannot get your local weather at this time" });
    }

    return res.status(200).json({ message: "Got to backend!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
