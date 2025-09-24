const logoutButton = document.getElementById("logout_button");
logoutButton.addEventListener("click", async () => {
  try {
    let response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("Unable to log user out at this time.");
    } else {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  } catch (error) {
    alert("Unable to log user out at this time.");
  }
});
