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
        uvindex: day.uvindex,
        windspeed: data.windspeed,
      }));
      return simpleForecast;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export function findReadingDay(weatherArray) {
  for (let i = 0; i < weatherArray.length; i++) {
    let day = weatherArray[i];
    let reason = [];
    let weatherCondition = [];
    if (day.maxTemp >= 105) {
      reason.push("Extreme heat warning");
      weatherCondition.push("Hot");
    }
    if (day.minTemp <= 10 && day.precipprob < 40) {
      reason.push("Extreme cold warning");
      weatherCondition.push("Cold");
    }
    if (day.precipprob > 40 && day.maxTemp <= 32) {
      reason.push("High chance of snow");
      weatherCondition.push("Snow");
    }
    if (day.precipprob > 40 && day.maxTemp > 32) {
      reason.push("High chance of rain");
      weatherCondition.push("Rain");
    }
    if (day.uvindex > 9) {
      reason.push("High UV index");
      weatherCondition.push("Sunny");
    }
    if (day.windspeed >= 74) {
      reason.push("High winds");
      weatherCondition.push("Wind");
    }
    // If this day has reasons, return it
    if (reason.length > 0) {
      return {
        index: i,
        day,
        reason,
        weatherCondition,
      };
    }
    if (reason.length > 0) {
      return {
        index: i,
        day,
        reason,
        weatherCondition,
      };
    }
  }
  return {
    index: -1,
    day: null,
    reason: null,
    weatherCondition: null,
  };
}
