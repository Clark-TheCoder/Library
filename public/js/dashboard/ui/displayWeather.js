export function displayGoodReadingDay(day) {
  const status = document.getElementById("status");
  const num = document.getElementById("num_until");
  const days = document.querySelector(".days_text");
  const weatherDescription = document.getElementById("weather");
  const weatherImage = document.getElementById("weather_img");

  if (day.index == 0) {
    status.innerHTML = "Hooray! Today is a good day to read!";
    num.innerHTML = "1";
    days.innerHTML = "book";
    weatherDescription.innerHTML = "a day keeps the bordom away... ";
    weatherImage.src = "/media/dashboard/weather/read.png";
  } else if (day.index > 0) {
    status.innerHTML = "It will be a great day to read in:";
    let daysUntil = day.index;
    num.innerHTML = daysUntil;
    weatherDescription.innerHTML = day.reason;
    weatherImage.src = setImage(day.weatherCondition);
    if (daysUntil == 1) {
      days.innerHTML = "Day";
    } else if (daysUntil > 1) {
      days.innerHTML = "Days";
    }
  } else if (day.index == -1) {
    status.innerHTML = "Everyday is a good day to read!";
    weatherImage.src = "/media/dashboard/weather/read.png";
    num.innerHTML = "1";
    days.innerHTML = "book";
    weatherDescription.innerHTML = "a day keeps the bordom away... ";
  }
}

function setImage(weatherCondition) {
  if (weatherCondition == "Rain") {
    return "/media/dashboard/weather/rainy.png";
  }
  if (weatherCondition == "Wind") {
    return "/media/dashboard/weather/windy.png";
  }
  if (weatherCondition == "Sunny") {
    return "/media/dashboard/weather/sunscreen.png";
  }
  if (weatherCondition == "Hot") {
    return "/media/dashboard/weather/desert.png";
  }
  if (weatherCondition == "Cold") {
    return "/media/dashboard/weather/snow.png";
  }
  if (weatherCondition == "Snow") {
    return "/media/dashboard/weather/igloo.png";
  }
}
