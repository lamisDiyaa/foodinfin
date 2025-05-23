import {
  UserNameNavBar,
  navToScroll,
  loginBtnName,
  getData,
  cartBadgeContent,
} from "./nav.js";

let navBar = document.querySelector(".navbar");
let maimBg = document.querySelector(".main__section");
let mainPraragraph = document.querySelector(".main__section p");
let happyCustomer = document.querySelector(".happy__customers");
let selectedMenu = document.querySelector(".selected__menu");
let lunchSpecialLeft = document.querySelector(".lunch__special__left");
let lunchSpecialright = document.querySelector(".lunch__special__right");
let customerNumber = document.querySelectorAll(".customer__numbers");
let filteredMenus = document.querySelector(".filtered__menus");
let steakCard = document.querySelector(".steak__card");
let allMenuBtn = document.querySelector(".menus__btn");
let newData = JSON.parse(localStorage.getItem("menuData")) ?? [];
// let loginBtn=document.querySelector(" .login__btn a")
localStorage.setItem("menuTitle", JSON.stringify("our menu"));
let checkUserLogin = JSON.parse(localStorage.getItem("checkUserLogin"));
let logintxt = JSON.parse(localStorage.getItem("loginTxt"));
let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
let logedUserName = JSON.parse(localStorage.getItem("currentUserLoged"));
let userNameTitle = document.querySelector(".userNameTitle");
let counterCheck = true;
let filteredElements = [];

//////////////////////////////////////////////////////////////////

cartBadgeContent();
UserNameNavBar();

loginBtnName();
getData();

let backgroundImageArr = [
  "home-4-background-4.jpg",
  "test.jpg",
  "bg-3.jpeg",
  "benefits-carousel-1.jpg",
];
let backgroundTxtArr = [
  "Nuttritious & tasty",
  "Vegan Asian Experience",
  "American Steak",
  "Best Resturant",
];
let count = 0;
let customerContent = 0;
console.log(maimBg);
document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    maimBg.style.backgroundImage = `url(./assets/images/${backgroundImageArr[count]})`;
    maimBg.style.animation = "leftToRight 4s ease ";
    maimBg.style.animationIterationCount = "infinite";
    mainPraragraph.textContent = backgroundTxtArr[count];
    mainPraragraph.style.animation = "leftToRight 4s ease";
    mainPraragraph.style.animationIterationCount = "infinite";
    count++;
    if (count > backgroundImageArr.length - 1) {
      count = 0;
    }
  }, 4000);
});

document.addEventListener("DOMContentLoaded", function () {
  window.onscroll = function () {
    if (window.scrollY > navBar.offsetTop + 490) {
      navBar.style.backgroundColor = "#0e0d0a";
      navBar.style.top = "0";
      if (window.scrollY > happyCustomer.offsetTop - 290 && counterCheck) {
        counter();
        counterCheck = false;
      } else if (window.scrollY > selectedMenu.offsetTop - 400) {
        lunchSpecialLeft.style.animation = "leftToRight 2.5s ease forwards";
        lunchSpecialright.style.animation = "RightToleft 2.5s ease forwards";
      }
    } else if (window.scrollY < 50) {
      navBar.style.backgroundColor = "transparent";
    }
  };
});

function counter() {
  customerNumber.forEach(function (ele) {
    let num = ele.textContent;
    ele.textContent = 0;
    let increase = (num * 5) / 100;
    let counnter = setInterval(function () {
      ele.textContent = +ele.textContent + increase;
      if (+ele.textContent == +num) {
        clearInterval(counnter);
      }
    }, 60);
  });
}

// function to filter data in menu page
function filterMenu(element, ele) {
  let newData = element.filter(function (item) {
    return item.category == `${ele}`;
  });
  return newData;
}

// function to save filtered data in local storage
function saveTolocalStorage(elements, img, title, hiddenClass = null) {
  localStorage.setItem("menuData", JSON.stringify(elements));
  localStorage.setItem("menuImg", JSON.stringify(`${img}`));
  localStorage.setItem("menuTitle", JSON.stringify(`${title}`));
  if (hiddenClass !== null) {
    localStorage.setItem("hiddenClass", JSON.stringify(`${hiddenClass}`));
  }
}

filteredMenus.addEventListener("click", function (e) {
  if (e.target.classList.contains("steak__card")) {
    function filterMenu(element) {
      let newData = element.filter(function (item) {
        return item.category == "steak";
      });
      return newData;
    }
    filteredElements = filterMenu(newData, "steak");
    saveTolocalStorage(
      filteredElements,
      "chad-montano-iSDSIrV9zEo-unsplash-3.jpg",
      "steak menu"
    );
    window.open("../../menu.html", "_self");
  } else if (e.target.classList.contains("asian__card")) {
    function filterMenu(element) {
      let newData = element.filter(function (item) {
        return item.category == "asian";
      });
      console.log(newData);
      return newData;
    }
    filteredElements = filterMenu(newData);
    saveTolocalStorage(filteredElements, "home-bg-2-1.jpg", "asian menu");
    window.open("../../menu.html", "_self");
  } else if (e.target.classList.contains("desserts__card")) {
    function filterMenu(element) {
      let newData = element.filter(function (item) {
        return item.category == "dessert";
      });
      console.log(newData);
      return newData;
    }
    filteredElements = filterMenu(newData);
    saveTolocalStorage(
      filteredElements,
      "intro-1605294330.jpg",
      "dessert menu",
      "d-none"
    );
    window.open("../../menu.html", "_self");
  }
});

////////////////////////////////////////////////////////
