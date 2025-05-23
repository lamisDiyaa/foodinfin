import {
  UserNameNavBar,
  navToScroll,
  loginBtnName,
  cartBadgeContent,
} from "./nav.js";

UserNameNavBar();
navToScroll();
loginBtnName();
cartBadgeContent();

let oneItem = JSON.parse(localStorage.getItem("oneItem"));
let oneItemImg = document.querySelector(".oneItem__img");
let oneTtemTxt = document.querySelector(".oneItem__txt");

console.log(oneItem);
oneItemImg.innerHTML = ` <img src="${oneItem.img}" alt="" class="item__details__img">`;
oneTtemTxt.innerHTML = `<div class="d-flex align-items-center" ><span class="material-symbols-outlined">
filter_vintage
</span><h1>${oneItem.name}</h1></div>
<p class="p pb-5 ">${oneItem.description}</p>
<p class=" mini__p pt-5">Food is the foundation of true happiness.</p><p class=" pt-3 mini__p"> 

We see our customers as invited guests to a party, and we are the hosts. It’s our job every day to make every important aspect of the customer experience a little bit better.</p>
<div class="details__footer ">
<div class="pt-5 forMoreDetails">
<h5 >for more details please call us : 
  </h5>
  <p >
    Phone: (212) 555-6767<br>
    Fax: (212) 722-5541
  </p>

</div>

  

</div>
`;
