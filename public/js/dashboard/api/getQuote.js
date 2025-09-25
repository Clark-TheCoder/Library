export async function getQuote() {
  try {
    let response = await fetch("/getQuote", {
      method: "GET",
    });

    let data = await response.json();

    if (!response.ok) {
      return {
        text: "Error fetching quote",
        author: "",
      };
    } else if (response.ok) {
      return {
        text: data.text,
        author: data.author,
      };
    }
  } catch (error) {
    console.log("Cannot connect to daily quotes");
    return {
      text: "Error fetching quote",
      author: "",
    };
  }
}
