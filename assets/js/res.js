import {
  UserNameNavBar,
  navToScroll,
  loginBtnName,
  cartBadgeContent,
} from "./nav.js";

const reservationForm = document.querySelector("#reservationForm");
const dateHeader = document.querySelector(".date h1");
const dateTxt = document.querySelector(".date p");
let guestsNumber = document.querySelector("#numGuests");
let reservationTime = document.querySelector(".res__time");
let closeResBtn = document.querySelector(".close__reservtion__btn");
let reservedUserName = document.querySelector(".reservedUserName");
let reservedUserDetails = document.querySelector(".reservedUserDetails");
let nonLoggedUser = document.querySelector(".res-nonlogged");
let reservedNumbers = document.querySelector(".reservedNumbers");
let ovrlay = document.querySelector(".overlay");
let exactDay = "";
let exactMonth;
let checkUserLogin = JSON.parse(localStorage.getItem("checkUserLogin"));
let logedUserName = JSON.parse(localStorage.getItem("currentUserLoged"));
let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
let dateInput = document.querySelector(".date__input");
let allAboutReservation = document.querySelector(".allAboutReservation");
console.log(!exactDay || !dateHeader);
UserNameNavBar();
navToScroll();
loginBtnName();
cartBadgeContent();

const date = new Date();
const renderCalendar = () => {
  date.setDate(1); // نبدأ أول يوم في الشهر

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const firstDayIndex = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();
  const nextDays = 6 - lastDayIndex;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // تحديث العناوين
  dateHeader.innerHTML = months[date.getMonth()];
  exactMonth = months[date.getMonth()];
  dateTxt.innerHTML = new Date().toDateString();

  let days = "";

  // الأيام من الشهر السابق (لملء البداية)
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  // الأيام الحالية
  const today = new Date();
  for (let i = 1; i <= lastDay; i++) {
    if (
      i === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div class="allDays">${i}</div>`;
    }
  }

  // الأيام من الشهر التالي (لملء النهاية)
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }

  // عرض جميع الأيام
  monthDays.innerHTML = days;
};

// const
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

dateInput.addEventListener("focus", function () {
  if (!checkUserLogin) {
    ovrlay.classList.remove("d-none");

    console.log("oooooooooooooooooooooo");
  }
});

closeResBtn.addEventListener("click", function (e) {
  ovrlay.classList.add("d-none");
});
// to find the selected user from all array
let selectUserInfo = UserInfo.find(function (ele) {
  return ele.email == logedUserName;
});
let selectUserIndex = UserInfo.findIndex(function (ele) {
  return ele.email == logedUserName;
});
console.log(document.querySelector(".today"));
// to show and close the calendar
document.querySelector(".date__input").addEventListener("click", function (e) {
  if (e.target.classList.contains("date__input")) {
    document.querySelector(".calendar__container").classList.toggle("d-none");
    document.querySelector(".today").style.backgroundColor =
      "#222227 !important";
  }
});
//  to save reservation details to local stotage
document.querySelector(".form__res").addEventListener("click", function (e) {
  if (
    e.target.classList.contains("allDays") ||
    e.target.classList.contains("today") ||
    e.target.classList.contains("next-date") ||
    e.target.classList.contains("prev-date")
  ) {
    //  إذا ضغط على يوم من الشهر التالي
    if (e.target.classList.contains("next-date")) {
      date.setMonth(date.getMonth() + 1);
      renderCalendar();
      return;
    }

    //  إذا ضغط على يوم من الشهر السابق
    if (e.target.classList.contains("prev-date")) {
      date.setMonth(date.getMonth() - 1);
      renderCalendar();
      return;
    }

    //  تلوين كل الأيام بلون ثابت
    document.querySelectorAll(".allDays, .today").forEach(function (ele) {
      ele.style.backgroundColor = "#222227";
    });

    //  تلوين اليوم المحدد وتحديث البيانات
    exactDay = e.target.textContent;
    dateInput.value = `${exactDay} - ${exactMonth}`;
    reservedUserDetails.innerHTML = `you reserved in ${exactDay} - ${exactMonth}`;
    e.target.style.backgroundColor = "var(--main-color)";
    document.querySelector(".calendar__container").classList.add("d-none");
  } else if (e.target.classList.contains("submit__btn")) {
    e.preventDefault();

    UserInfo[selectUserIndex] = {
      ...selectUserInfo,
      guestsNum: guestsNumber.value,

      reservation: ` ${exactDay} - ${exactMonth}`,
    };

    localStorage.setItem("UserInfo", JSON.stringify(UserInfo));

    selectUserInfo = UserInfo.find(function (ele) {
      return ele.email == logedUserName;
    });

    reservedUserDetails.innerHTML = displayReservationInf(selectUserInfo);

    window.scrollTo({
      top:
        allAboutReservation.offsetTop -
        document.querySelector(".reservedUserName").clientHeight,
    });

    dateInput.value = "";
    guestsNumber.value = "";
  }
});

reservedUserName.innerHTML = `Hello ${
  checkUserLogin ? selectUserInfo.userName : " "
}  <span class="material-symbols-outlined">favorite</span>`;
if (!checkUserLogin) {
  reservedUserDetails.classList.add("d-none");
  nonLoggedUser.classList.remove("d-none");
} else {
  console.log("ffffffffffffkkkkkkkkkkkkkk");
  nonLoggedUser.classList.add("d-none");
}

function displayReservationInf(obj) {
  return `<div class="reservation__display ">
 
<div class="">

${
  obj.reservation && obj.guestsNum
    ? `
    <div>
      <p class="">
      
        
       
          ${`<span class="material-symbols-outlined me-2">
calendar_month
</span> your reservation for <span> ${obj.reservation} </span> has been confirmed.`}
       
      </p>
      <p class="">
       
        ${` <span class="material-symbols-outlined me-2"> 
groups
</span> A table for <span>${obj.guestsNum}</span> has been reserved `} has
        been reserved.
      </p>
      <p class=" text-center"> "We eagerly await the opportunity to warmly welcome you and make your visit a memorable experience!"</p>
    </div>
    </div>
          <div class="reservation__footer p-3 ">
                 <img src="./assets/images/Tavolini a 4 metri di distanza_ Una bufala! Ecco le vere regole per riaprire.jpeg" alt="" />
          </div>
    </div>
  `
    : `
          <div class=" all__details__txts mt-5">
            <div class="reservation__parking__opening__Hours my-2">
              <div class="opening__Hours">
                <h4 class="my-2">OPENING HOURS</h4>
                <p>
                  Lunch: Monday – Friday 12 pm to 3:30 pm<br />
                  Dinner: Monday – Saturday 4 pm to 11 pm<br />
                  Dinner: Sunday 4 pm to 10 pm
                </p>
              </div>
              <div class="dining">
                <h4 class="my-2">DINING</h4>
                <p>
                  indoor Dining & Heated Outdoor Patios<br />
                  Private Rooms & Terrace
                </p>
              </div>
            </div>
            <div class="reservation__parking__opening__Hours my-2">
              <div class="reservation">
                <h4 class="my-2">RESERVATION</h4>
                <p>
                  Call (212) 555-6767<br />
                  Email foodinfin@gmail.com
                </p>
              </div>
              <div class="Dress__Attire">
                <h4 class="my-3">Dress Attire</h4>
                <p>
                  Guests are welcome in a variety of attire<br />
                  from elegant casual to business suits.<br />
                  Shorts are accepted, but discouraged.
                </p>
              </div>
            </div>
            <div class="reservation__parking__opening__Hours my-2">
              <div>
                <h4 class="my-3">PARKING DETAILS</h4>
                <p>
                  Street Parking after 7:00pm<br />
                  Monday to Saturday, feed the meter.<br />
                  Sunday free street parking.
                </p>
              </div>
              <div>
                <h4 class="my-2">PUBLIC TRANSIT</h4>
                <p>
                  Walking Distance from Penn Station 34th<br />
                  Street Herald Square: B,D,F,M & N,Q,R <br />33rd street
                  station 4,6.
                </p>
              </div>
            </div>
          </div>
            `
}
 




`;
}

reservedUserDetails.innerHTML = displayReservationInf(selectUserInfo);
