import { updateUser } from "./updateUser.js";

const updateUserForm = document.getElementById("update_user_form");
updateUserForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  await updateUser();
});
