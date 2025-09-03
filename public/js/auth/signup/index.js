import { signup } from "./signup.js";
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup_form");
  signupForm?.addEventListener("submit", signup);
});
