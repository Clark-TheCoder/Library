export async function updateUser() {
  const username = document.getElementById("username")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const newPassword = document.getElementById("new_password")?.value.trim();
  const confirmPassword = document
    .getElementById("confirm_new_password")
    ?.value.trim();

  const formData = {};
  if (username) formData.username = username;
  if (email) formData.email = email;
  if (newPassword) formData.newPassword = newPassword;
  if (confirmPassword) formData.confirmPassword = confirmPassword;

  if ((newPassword && !confirmPassword) || (!newPassword && confirmPassword)) {
    alert("Please confirm password");
    return;
  }

  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("/users/updateUser", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(" Updated successfully:", data);
    } else {
      alert("Could not update user credentials at this time.");
    }
  } catch (error) {
    window.location.href = "/error";
  }
}
