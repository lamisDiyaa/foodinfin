let userObjList = JSON.parse(localStorage.getItem("UserInfo")) ?? [];
let closeResBtn = document.querySelector(".close__reservtion__btn");
let ovrlay = document.querySelector(".overlay");
// for login
const useremail = document.querySelector("#useremail");
const password = document.querySelector("#password");

document
  .querySelector("#login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Your code goes here
    let checkedUser = userObjList.find(function (ele) {
      return ele.email == useremail.value;
    });
    let checkedPassword = userObjList.find(function (ele) {
      return ele.password == password.value;
    });
    console.log(checkedPassword, checkedUser);
    if (checkedUser && checkedPassword) {
      localStorage.setItem("checkUserLogin", JSON.stringify(true));
      localStorage.setItem("loginTxt", JSON.stringify("logout"));
      localStorage.setItem("currentUserLoged", JSON.stringify(useremail.value));
      window.open("../../index.html", "_self");
    } else {
      ovrlay.classList.remove("d-none");
    }
  });

closeResBtn.addEventListener("click", function () {
  ovrlay.classList.add("d-none");
});
