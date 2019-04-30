// $('.message').click(function(){
//     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
//  });


const registerButton = document.getElementById("register");
registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const passwordConf = document.getElementById("passwordConf").value
    const email = document.getElementById("email").value
    $.post("/", {
        username: username,
        password: password,
        passwordConf: passwordConf,
        email: email
    }
    ,function(data, status){
        const msgDiv = document.getElementById("registerMessageReturn");
        if(data.status==402)
            msgDiv.innerHTML = "All fields required.";
        if(data.status==400)
            msgDiv.innerHTML = "Passwords do not match.";
        else
            window.location.replace("/color")

      }
      );

});

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("l_email").value
    const password = document.getElementById("l_password").value
    $.post("/", {
        logemail: email,
        logpassword: password,
    }
    ,function(data, status){
        const msgDiv = document.getElementById("messageReturn");
        if(data.status == 401)
            msgDiv.innerHTML = "Wrong email or password.";
        else if(data.status == 402)
            msgDiv.innerHTML = "All fields required.";
        else
            window.location.replace("/color")


      }
      );

});

// $('#register-form')
//     .ajaxForm({
//         url : '/', // or whatever
//         dataType : 'json',
//         success : function (response) {
//             alert("The server says: " + response);
//         }
//     })
// ;

// $('#login-form')
//     .ajaxForm({
//         url : '/', // or whatever
//         dataType : 'json',
//         success : function (response) {
//             console.log("login return")
//             alert("The server says: " + response);
//         }
//     })
// ;







const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

const showCreate = document.getElementById("showCreate");
showCreate.addEventListener("click", (e) => {

    registerForm.style.display = "block";
    loginForm.style.display = "none";
});

const showLogin = document.getElementById("showLogin");
showLogin.addEventListener("click", (e) => {

    registerForm.style.display = "none";
    loginForm.style.display = "block";

});