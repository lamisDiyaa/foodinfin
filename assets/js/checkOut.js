let data = JSON.parse(localStorage.getItem("UserInfo"));
let logedUserName = JSON.parse(localStorage.getItem("currentUserLoged"));
let price = document.querySelector(".original__price");
let checkOutAmount = document.querySelector(".checkOutAmount");
let checkOutPrice = document.querySelector(".checkOutPrice");
const user = data.find((ele) => ele.email === logedUserName);

const total =
  user?.cartlistForThisClient
    ?.map((ele) => ele.quantity * ele.price)
    .reduce((acc, item) => acc + item, 0) ?? 0;

const subtotal = total + (total * 20) / 100 + 200;
price.textContent = subtotal;
checkOutAmount.textContent = `total(${user?.cartlistForThisClient.length} ${
  user?.cartlistForThisClient.length > 1 ? "items" : item
})`;
checkOutPrice.textContent = subtotal;
