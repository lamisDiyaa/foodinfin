import {
  UserNameNavBar,
  navToScroll,
  loginBtnName,
  cartBadgeContent,
} from "./nav.js";

let newData = JSON.parse(localStorage.getItem("menuData")) ?? [];
let menuBg = document.querySelector(".filtered__menu__bg");
let menuTitle = document.querySelector(".main__p");
let menuLink = document.querySelector(".menu__link");
let backGround = JSON.parse(localStorage.getItem("menuImg")) ?? "seaff.jpeg";
let mainHeader = JSON.parse(localStorage.getItem("menuTitle")) ?? "our menu";
let hiddenClass = JSON.parse(localStorage.getItem("hiddenClass")) ?? " ";
let steakHeader = document.querySelector(".steak__category");
let asianHeader = document.querySelector(".asian");
let asianBg = document.querySelector(".asianBg");
let dessertHeader = document.querySelector(".dessert");
let dessertBg = document.querySelector(".dessertBg");
let steakCategory = document.querySelector(".steak__filtered__items");
let asianCategory = document.querySelector(".asian__filtered__items");
let dessertCategory = document.querySelector(".dessert__filtered__items");
let notificationImg = document.querySelector(".notification__img");
let notificationCard = document.querySelector(".notification__card");
let notificationDetails = document.querySelector(".notification__details");
let checkUserLogin = JSON.parse(localStorage.getItem("checkUserLogin"));
let UserInfo = JSON.parse(localStorage.getItem("UserInfo")) ?? [];
let logedUserName = JSON.parse(localStorage.getItem("currentUserLoged"));
let cartBadge = document.querySelector(".cart__badge");
let ovrlay = document.querySelector(".overlay");
let closeResBtn = document.querySelector(".close__reservtion__btn");

//    to find which user is loged
let selectUserInfo = UserInfo.find(function (ele) {
  return ele.email == logedUserName;
});
// to find the index of loged user
let selectUserIndex = UserInfo.findIndex(function (ele) {
  return ele.email == logedUserName;
});
let cartList = UserInfo[selectUserIndex]?.cartlistForThisClient ?? [];

UserNameNavBar();
navToScroll();
loginBtnName();
cartBadgeContent();
async function getData() {
  try {
    let response = await fetch("data.json");
    newData = await response.json();
    localStorage.setItem("menuData", JSON.stringify(newData));
  } catch (error) {
    alert(error);
  }
}
getData();

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.tagName === "IMG" && img.dataset.src) {
          img.src = img.dataset.src;
          img.onload = () => {
            img.classList.add("loaded");
          };
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".lazy-img").forEach((img) => observer.observe(img));

menuBg.style.backgroundImage = `url(./assets/images/food-new/home-bg-2-1.jpg)`;
onload = function () {
  getData();
  localStorage.setItem("menuTitle", JSON.stringify("our menu"));
  localStorage.setItem("menuImg", JSON.stringify("seaff.jpeg"));
};
closeResBtn.addEventListener("click", function () {
  ovrlay.classList.add("d-none");
});

function setMenuBackgroundAndTiltle() {
  menuBg.style.backgroundImage = `url(./assets/images/${backGround})`;
  menuTitle.textContent = mainHeader;
}
setMenuBackgroundAndTiltle();

function displayCategory(data, categoryElement) {
  let filteredData = newData.filter(function (ele) {
    return ele.category == data;
  });
  let categoryData = filteredData.map(function ({
    id,
    name,
    img,
    price,
    description,
    lazyImg,
  }) {
    return `
      <div class="col-xl-6 menu__card__display  border__b p-4  text-center">
        <div class="row ">
          <div class="col-sm-5  mb-4 menu__img__div">
            <img  data-src="${img}" data-id=${id} src="${lazyImg}"  alt="" class="menu__img  lazy-img">
          </div>
          <div class="col-sm-6 menu__des">
            <div class="food__details">
              <p class="menu__content">
                ${name}
              </p>
              <div class="menu__line">
              </div>
              <p class="menu__content">
                $${price}
              </p>
            </div>
            <div class="food__description">
              <p>
                ${description}
              </p>
            </div>
            <button class="cart__btn" data-id=${id} "> add to cart</button>
           
          </div>
        </div>
      </div>
    `;
  });
  categoryElement.innerHTML += categoryData.join("");

  const lazyImages = categoryElement.querySelectorAll(".lazy-img");
  const cards = categoryElement.querySelectorAll(".menu__card__display");

  lazyImages.forEach((img) => observer.observe(img));
  cards.forEach((card) => observer.observe(card));
}

function displayNotification(addedElement) {
  notificationImg.innerHTML = `<img src="${addedElement.img}" >`;
  notificationDetails.innerHTML = `<div class="d-flex justify-content-between p-3"><p>${addedElement.name}</p>
<p>${addedElement.price}</p></div>
<div class="notification__des text-start p-3">${addedElement.description}</div>
<div class="d-flex  justify-content-between added__cart mt-4 p-3">
<p>the quantity increased</p>
<div>
<span class="material-symbols-outlined">
done
</span>
</div>
</div>`;
  notificationCard.style.transform = "translateX(-50px)";

  setTimeout(function () {
    notificationCard.style.transform = "translateX(300px)";
  }, 1500);
}
window.addEventListener("click", function (e) {
  if (e.target.classList.contains("cart__btn")) {
    let ID = e.target.dataset.id;
    if (checkUserLogin) {
      let addedElement = newData.find(function (item) {
        return item.id == ID;
      });
      //   to find selected element to add to cart
      let checkeditem = cartList.find(function (ele) {
        return ele.id == ID;
      });
      console.log(addedElement);
      if (checkeditem) {
        checkeditem.quantity += 1;
        localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
        displayNotification(addedElement);
      } else {
        cartList.push({ ...addedElement, quantity: 1 });
        cartBadge.textContent = cartList.length;
        cartBadge.style.backgroundColor = "var(--white-color)";
        localStorage.setItem("addToCart", JSON.stringify(cartList));
        UserInfo[selectUserIndex] = {
          ...selectUserInfo,
          cartlistForThisClient: cartList,
        };
        localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
        displayNotification(addedElement);
      }
    } else {
      ovrlay.classList.remove("d-none");
    }
  } else if (e.target.classList.contains("menu__img")) {
    let ID = e.target.dataset.id;
    e.target.style.cursor = " pointer";
    let checkeditem = newData.find(function (ele) {
      return ele.id == ID;
    });

    localStorage.setItem("oneItem", JSON.stringify(checkeditem));
    window.open("../../oneProduct.html", "_self");
  }
});

function hiddenElement(...ele) {
  ele.forEach((eachElement) => (eachElement.style.display = "none"));
}
if (JSON.parse(localStorage.getItem("menuTitle")) == "steak menu") {
  displayCategory("steak", steakCategory);
  hiddenElement(dessertHeader, asianBg, asianHeader);
} else if (JSON.parse(localStorage.getItem("menuTitle")) == "asian menu") {
  displayCategory("asian", asianCategory);
  hiddenElement(steakHeader, asianBg, dessertHeader);
} else if (JSON.parse(localStorage.getItem("menuTitle")) == "dessert menu") {
  displayCategory("dessert", dessertCategory);
  hiddenElement(steakHeader, asianHeader, dessertBg);
} else {
  displayCategory("steak", steakCategory);
  displayCategory("asian", asianCategory);
  displayCategory("dessert", dessertCategory);
}
