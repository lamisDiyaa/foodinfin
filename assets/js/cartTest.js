import { UserNameNavBar, navToScroll, loginBtnName } from "./nav.js";

let display = document.querySelector(".menu");
let cartTable = document.querySelector(".display");
let cartElements = JSON.parse(localStorage.getItem("addToCart"));
let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
let logedUserName = JSON.parse(localStorage.getItem("currentUserLoged"));
let checkUserLogin = JSON.parse(localStorage.getItem("checkUserLogin"));
let totalPrice = document.querySelector(".tfoot");
let cartBadge = document.querySelector(".cart__badge");
let subTotalPrice = document.querySelector(".sub__total__price");
let taxesPrice = document.querySelector(".taxes__price");
let totalPriceAfterTaxes = document.querySelector(".total__price__price");
let checkOutBtn = document.querySelector(".checkOut__btn a");
let originalPrice = document.querySelector(".original__price");
export let totalForCheckOut;
let count = 0;

UserNameNavBar();
navToScroll();
loginBtnName();
window.onload = function () {
  if (cart.length == 0 || !checkUserLogin) {
    cartBadge.style.backgroundColor = "transparent";
    cartTable.style.display = "none";
  }
};

//    to find which user is loged
let selectUserInfo = UserInfo.find(function (ele) {
  return ele.email == logedUserName;
});
// to find the index of loged user
let selectUserIndex = UserInfo.findIndex(function (ele) {
  return ele.email == logedUserName;
});

UserInfo[selectUserIndex].cartlistForThisClient;

function renderElements(data) {
  let newData = data.map(function ({ id, name, img, price, quantity }) {
    count += quantity * price;
    return `
      <tr class="one__item ">
      <td class="d-flex product__img">
      <button class="btn " >
      <span class="material-symbols-outlined delete__btn "  data-id="${id}">
        close
        </span>
    </button>
      <img src="${img}" alt="" class="text-center d-xl-block  ">
      </td>
      <td class="">
      <div class="td">${name}</div>
      </td>
      <td >
      <div class="td">${price}
      </div>
      </td>
      <td>
      <div class="quantity__container">
      <button class="btn increase__btn" data-id="${id}" >+</button>
      <div class="quantity__td">
      ${quantity}
</div>
      <button class="btn decrease__btn" data-id="${id}" >-</button>
</div>
      </td class="td">
      <td class="">
      <div class="td total__price">${quantity * price}</div>
      </td>
</tr>
      `;
  });
  display.innerHTML += newData.join("");
}
let cart = UserInfo[selectUserIndex].cartlistForThisClient;

renderElements(cart);

function countPrice(selectedItem) {
  totalPrice.textContent = count;
  subTotalPrice.textContent = count;
  taxesPrice.textContent = `20%(${(count * 20) / 100})`;
  totalPriceAfterTaxes.textContent = `${count + (count * 20) / 100 + 200}`;
  totalForCheckOut = `${count + (count * 20) / 100 + 200}`;
}
countPrice();

display.addEventListener("click", function (e) {
  if (e.target.classList.contains("increase__btn")) {
    let id = e.target.dataset.id;

    let increasedItem = cart.find(function (ele) {
      return ele.id == id;
    });
    let increasedItemIndex = cart.findIndex(function (ele) {
      return ele.id == id;
    });

    cart[increasedItemIndex].quantity += 1;
    localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
    let quantity = e.target.parentElement.querySelector(".quantity__td");
    let totalPrice = e.target
      .closest(".one__item")
      .querySelector(".total__price");
    totalPrice.textContent =
      cart[increasedItemIndex].quantity * cart[increasedItemIndex].price;

    quantity.textContent++;

    count += increasedItem.price;

    countPrice();
  } else if (e.target.classList.contains("decrease__btn")) {
    let id = e.target.dataset.id;
    let decreasedItem = cart.find(function (ele) {
      return ele.id == id;
    });
    let decreasedItemIndex = cart.findIndex(function (ele) {
      return ele.id == id;
    });

    cart[decreasedItemIndex].quantity -= 1;
    if (cart[decreasedItemIndex].quantity == 0) {
      deleteItemFromCart(id);
      e.target.parentElement.parentElement.parentElement.remove();
    }
    localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
    let quantity = e.target.parentElement.querySelector(".quantity__td");
    let totalPrice = e.target
      .closest(".one__item")
      .querySelector(".total__price");

    totalPrice.textContent =
      cart[decreasedItemIndex].quantity * cart[decreasedItemIndex].price;
    quantity.textContent--;
    count -= decreasedItem.price;
    countPrice();
  } else if (e.target.classList.contains("delete__btn")) {
    let id = e.target.dataset.id;
    deleteItemFromCart(id);
    e.target.parentElement.parentElement.parentElement.remove();
  }
});
function deleteItemFromCart(id) {
  let deletedItem = cart.find(function (ele) {
    return ele.id == id;
  });
  let deletedItemIndex = cart.findIndex(function (ele) {
    return ele.id == id;
  });
  cart = cart.filter(function (ele) {
    return ele.id != id;
  });
  UserInfo[selectUserIndex].cartlistForThisClient = cart;
  localStorage.setItem("UserInfo", JSON.stringify(UserInfo));
  if (cart.length == 0 || !checkUserLogin) {
    cartBadge.style.backgroundColor = "transparent";
    cartTable.style.display = "none";
  }
  cartBadge.textContent = cart.length;
  count -= deletedItem.price * deletedItem.quantity;
  countPrice();
}
cartBadge.textContent = cart.length;

if (cartElements.length == 0) {
  cartTable.style.display = "none";
} else {
  cartBadge.textContent =
    UserInfo[selectUserIndex].cartlistForThisClient.length;
  cartBadge.style.backgroundColor = "var(--white-color)";
}

checkOutBtn.addEventListener("click", function (e) {
  if (UserInfo[selectUserIndex].cartlistForThisClient.length == 0) {
    e.preventDefault();
  }
});
