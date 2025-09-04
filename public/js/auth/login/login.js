export async function login(e) {
  e.preventDefault();

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
    const result = await response.json();

    if (response.ok) {
      window.location.href = "/users/dashboard";
    } else {
      console.log(result.message);
    }
  } catch (error) {
    return error;
  }
}
