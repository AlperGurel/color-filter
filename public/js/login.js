// $('.message').click(function(){
//     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
//  });


// const registerButton = document.getElementById("register");
// registerButton.addEventListener("click", (e) => {
    
//     const username = document.getElementById("username").value
//     const password = document.getElementById("password").value
//     const passwordConf = document.getElementById("passwordConf").value
//     const email = document.getElementById("email").value
//     $.post("/", {
//         username: username,
//         password: password,
//         passwordConf: passwordConf,
//         email: email
//     }
//     ,function(data, status){
//         alert("Data: " + data + "\nStatus: " + status);
//       }
//       );

// });

// const loginButton = document.getElementById("login");
// loginButton.addEventListener("click", (e) => {
    
//     const email = document.getElementById("l_email").value
//     const password = document.getElementById("l_password").value
//     $.post("/", {
//         logemail: email,
//         logpassword: password,
//     }
//     ,function(data, status){
//         alert("Data: " + data + "\nStatus: " + status);
//       }
//       );

// });

const showCreate = document.getElementById("showCreate");
showCreate.addEventListener("click", (e) => {

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    registerForm.style.display = "block";
    loginForm.style.display = "none";

});
    
const showLogin = document.getElementById("showLogin");
showLogin.addEventListener("click", (e) => {

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    registerForm.style.display = "none";
    loginForm.style.display = "block";

});