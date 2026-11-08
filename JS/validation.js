function saveInfo(event) {
  //Prevent Page Reload
  event.preventDefault();

  //Variable Declarations
  const photoInput = document.getElementById("input-file");
  let profilePhoto = photoInput.files[0];

  const nameInput = document.getElementById("name");
  let fullName = nameInput.value.trim();

  const emailInput = document.getElementById("email");
  let email = emailInput.value.trim();

  const githubInput = document.getElementById("github");
  let github = githubInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  //Error Texts
  document.getElementById("name-error").textContent = "";
  document.getElementById("github-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("pfp-error").textContent = "";


  //Name and Github Validations
  if (fullName === "") {
    document.getElementById("name-error").textContent =
      "Please enter your full name.";
    isValid = false;
  }

  if (!github.startsWith("@")) {
    document.getElementById("github-error").textContent = "Username must start with @."
    isValid = false;
  }

  //Email Validation
  if (!emailPattern.test(email)) {
    document.getElementById("email-error").textContent =
      "Please enter a valid email address.";
    isValid = false;
  }

  // Avatar Validation
  if (!profilePhoto) {
    document.getElementById("pfp-error").textContent =
      "Please upload a profile photo.";
    isValid = false;
  } else {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 500 * 1024;

    if (!allowedTypes.includes(profilePhoto.type)) {
      document.getElementById("pfp-error").textContent =
        "Please upload a JPEG or PNG image.";
      isValid = false;
    } else if (profilePhoto.size >= maxSize) {
      document.getElementById("pfp-error").textContent =
        "Image must be smaller than 500KB.";
      isValid = false;
    }
  }

  //Saving Values
  if (isValid) {
    sessionStorage.setItem("fullName", fullName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("github", github);

    //Profile Photo Loading
    if (profilePhoto) {
      const reader = new FileReader();
      reader.onload = function (e) {
        sessionStorage.setItem("image", e.target.result);
        document.getElementById("drag-drop-text").textContent = "Picture Uploaded";

        //So that the Picture Uploaded text can show before the page is redirected
        setTimeout(function () {
          window.location.href = "ticket.html";
        }, 1000)
      }

      //Error handler for if the profile photo doesnt load
      reader.onerror = function () {
        document.getElementById("pfp-error").textContent = "Failed to Upload Profile Photo.";
      }
      reader.readAsDataURL(profilePhoto);
    }

  }

}

let registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", saveInfo);