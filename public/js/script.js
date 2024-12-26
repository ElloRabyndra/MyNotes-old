// Navbar Button
const profileButton = document.querySelector("#profile-button");
const sideNav = document.querySelector("#side-nav");
const navCloseButton = document.querySelector("#nav-close-button");

profileButton.addEventListener("click", () => {
  sideNav.style.display = "block";
});

navCloseButton.addEventListener("click", () => {
  sideNav.style.display = "none";
});
