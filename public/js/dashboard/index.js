import { getBestSellers } from "./api/getBestSellers.js";
import { getQuote } from "./api/getQuote.js";
import { getWeather, findReadingDay } from "./api/getWeather.js";
import { createBooks } from "./ui/displayBestSellers.js";
import { displayQuote } from "./ui/displayQuote.js";
import { displayGoodReadingDay } from "./ui/displayWeather.js";

document.addEventListener("DOMContentLoaded", async () => {
  let { text, author } = await getQuote();
  displayQuote(text, author);

  const data = await getBestSellers();
  createBooks(data);

  let forecast = await getWeather();
  console.log(forecast);
  let day = findReadingDay(forecast);
  displayGoodReadingDay(day);
});
