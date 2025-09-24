export async function login() {
  // Get the form field values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = { username, password };

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = "/users/dashboard";
    } else if (response.status === 400) {
      alert("Please fill out all required fields");
    } else if (response.status === 401) {
      alert("Incorrect login credentials");
    } else if (response.status === 404) {
      alert("We are having trouble locating this service");
    }
  } catch (error) {
    alert("Something went wrong. Please check your connection and try again.");
  }
}
