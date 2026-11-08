const fullName = sessionStorage.getItem("fullName");
const email = sessionStorage.getItem("email");
const github = sessionStorage.getItem("github");
const profilePhoto = sessionStorage.getItem("image");

console.log("Profile photo:", profilePhoto);
console.log("All session storage:", sessionStorage);

if (!fullName || !email || !github || !profilePhoto) {
  alert("Cannot go to ticket.html until login info is uploaded.");
  window.location.href = "index.html";
} else {
  generateTicket();
}

function generateTicket() {

  console.log(profilePhoto);
  document.getElementById("client-name").textContent = fullName;
  document.getElementById("email-span").textContent = email;
  document.getElementById("name-fill").textContent = fullName;
  document.getElementById("github-fill").textContent = github;
  document.getElementById("pfp").src = profilePhoto;
}

