export async function getBestSellers() {
  try {
    let response = await fetch("/getBestSellers", {
      method: "GET",
    });

    let data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.log("not okay");
    }
  } catch (error) {
    return "Unable to get best sellers today :(";
  }
}
