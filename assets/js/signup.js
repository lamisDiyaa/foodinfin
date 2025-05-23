const nameSignUp = document.querySelector('.name');
const email = document.querySelector('#email');
const passwordSignUp = document.querySelector('#password__signUp');
const confirmPassword = document.querySelector('#confirm-password');
let closeResBtn=document.querySelector(".close__reservtion__btn")
let ovrlay=document.querySelector(".overlay")
let userObjList=JSON.parse(localStorage.getItem("UserInfo"))??[]
let userObj={}


console.log(nameSignUp)
// for signup
document.querySelector('#signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Your code goes here
    let signUpcheckedName=userObjList.find(function(ele){
        return ele.userName== nameSignUp.value
    })
    let signUpcheckedEmail=userObjList.find(function(ele){
        return ele.email== email.value
    })
    let signUpcheckedPass=userObjList.find(function(ele){
        return ele.password== passwordSignUp.value
    })
    console.log(signUpcheckedName,signUpcheckedEmail)
    if(signUpcheckedName || signUpcheckedEmail ){
        ovrlay.classList.remove("d-none")
        event.preventDefault()
    }else{
        userObj.userName=nameSignUp.value
        userObj.email=email.value
        userObj.password=passwordSignUp.value
        userObjList.push(userObj)
        localStorage.setItem("UserInfo", JSON.stringify(userObjList));
        window.open("../../login.html", "_self");
    }
    console.log(userObjList)
  });
 
console.log(userObjList)



closeResBtn.addEventListener("click",function(){
    ovrlay.classList.add("d-none")
  
  })