export async function signup(e) {
  e.preventDefault();

  // Get the form field values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  const data = { username, email, password, confirmPassword };

  const response = await fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    window.location.href = "/users/dashboard";
  } else {
    console.log(result.message);
  }
}
