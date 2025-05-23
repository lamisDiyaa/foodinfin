let UserInfo = JSON.parse(localStorage.getItem("UserInfo")) ?? [];
let logedUserName = JSON.parse(localStorage.getItem("currentUserLoged"));
let userNameTitle = document.querySelector(".userNameTitle");
let checkUserLogin = JSON.parse(localStorage.getItem("checkUserLogin"));
let navBar = document.querySelector(".navbar");
let logintxt = JSON.parse(localStorage.getItem("loginTxt"));
let loginBtn = document.querySelector(" .login__btn a");
let newData = JSON.parse(localStorage.getItem("menuData")) ?? [];
let cartBadge = document.querySelector(".cart__badge");

let selectUserIndex = UserInfo.findIndex(function (ele) {
  return ele.email == logedUserName;
});

let cart = UserInfo[selectUserIndex]?.cartlistForThisClient;

export function cartBadgeContent() {
  if (cart) {
    cartBadge.textContent = cart.length;
    cartBadge.style.backgroundColor = "white";
    if (cart.length == 0 || checkUserLogin == false) {
      cartBadge.style.backgroundColor = "transparent";
    }
  }
}

export function UserNameNavBar() {
  let selectUserInfo = UserInfo.find(function (ele) {
    return ele.email == logedUserName;
  });
  let selectUserIndex = UserInfo.findIndex(function (ele) {
    return ele.email == logedUserName;
  });

  userNameTitle.textContent = checkUserLogin ? selectUserInfo.userName : " ";
}

export function navToScroll() {
  window.onscroll = function () {
    if (window.scrollY > 650 || window.innerWidth <= 990) {
      navBar.style.backgroundColor = "#0e0d0a";
      navBar.style.top = "0";
    } else if (window.scrollY < 650) {
      navBar.style.backgroundColor = "transparent";
    }
  };
}

export function loginBtnName() {
  loginBtn.textContent = logintxt ?? "login";
  loginBtn.addEventListener("click", function () {
    if (checkUserLogin) {
      localStorage.setItem("checkUserLogin", JSON.stringify(false));
      localStorage.setItem("loginTxt", JSON.stringify("login"));
      loginBtn.textContent = "login";
    } else {
      loginBtn.href = "../../login.html";
    }
  });
}

export async function getData() {
  let data = await fetch("data.json");
  newData = await data.json();

  localStorage.setItem("menuData", JSON.stringify(newData));
}
