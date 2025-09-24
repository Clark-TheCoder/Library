import { login } from "./login.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login_form");
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    await login();
  });
});
