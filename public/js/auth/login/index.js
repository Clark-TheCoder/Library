import { login } from "./login.js";

const loginForm = document.getElementById("login_form");
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  await login();
});
