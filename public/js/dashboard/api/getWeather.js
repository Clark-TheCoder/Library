import { getLocation } from "./getLocation.js";

export async function getWeather() {
  let userLocation;
  try {
    userLocation = await getLocation();
  } catch (error) {
    console.log("Error using the getLocation function");
  }

  try {
    let response = await fetch(
      `/getWeather?lat=${userLocation.lat}&long=${userLocation.long}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (response.ok) {
      let forecast = data;
      let simpleForecast = forecast.map((day) => ({
        date: day.datetime,
        description: day.description,
        maxTemp: day.tempmax,
        minTemp: day.tempmin,
        precipprob: day.precipprob,
        snow: day.snow,
        uvindex: day.uvindex,
        windspeed: data.windspeed,
      }));
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log("error getting to backend");
  }
}
