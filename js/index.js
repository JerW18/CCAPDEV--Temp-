// Hardcoded Values
let users = [
    {
        email: "tyler_tan@dlsu.edu.ph", 
        password: "tyler_tan",
        isAdmin: false
    },
    {
        email: "jeremy_wang@dlsu.edu.ph", 
        password: "jeremy_wang",
        isAdmin: false
    },
    {
        email: "lanz_lim@dlsu.edu.ph", 
        password: "lanz_lim",
        isAdmin: false
    },
    {
        email: "admin1@dlsu.edu.ph", 
        password: "admin1",
        isAdmin: true
    },
    {
        email: "admin2@dlsu.edu.ph", 
        password: "admin2",
        isAdmin: true
    },
    {
        email: "admin3@dlsu.edu.ph", 
        password: "admin3",
        isAdmin: true
    }
];

// Animation of Forms
$('#registerMessage a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// Guest Log In
$('#guestMessage a').click(function(){
    window.location.assign("../html/temp_reserve_guest.html");;
});

// Login Form
const loginForm = document.getElementById("login");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.logEmail.value;
    const password = loginForm.logPassword.value;
    let isLogin = false;

    for (const user of users) {
        if (user.email === username && user.password === password) {
            isLogin = true;
        }
    }

    if (isLogin) {
        loginForm.logEmail.value = "";
        loginForm.logPassword.value = "";
        
        window.location.assign("/html/reserve.html");
    } else {
        alert("Invalid username or password.");
    }
})

// Register Form
const registerForm = document.getElementById("register");
const registerButton = document.getElementById("register-form-submit");

registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = registerForm.regEmail.value;
    const password = registerForm.regPassword.value;
    const confirmPassword = registerForm.regConfirmPassword.value;
    let isRegister = true;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        isRegister = false;
    }

    for (const user of users) {
        if (user.email === username) {
            alert("Username already exists.");
            isRegister = false;
        }
    }

    if (isRegister) {
        users.push({ username: username, password: password, isAdmin: false});
        alert("You have successfully registered.");
        console.log(users);
    }
})