let protou=await fetch("/getUsers");
let users=await protou.json();
console.log(users);

// Animation of Forms
$('#registerMessage a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// Guest Log In
$('#guestMessage a').click(function(){
    window.location.assign("../html/temp_guest_reserve.html");;
});

// Login Form
const loginForm = document.getElementById("login");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.logEmail.value;
    const password = loginForm.logPassword.value;
    let isLogin = false;
    let isAdmin = false;

    for (const user of users) {
        if (user.email === username && user.password === password) {
            isLogin = true;

            loginForm.logEmail.value = "";
            loginForm.logPassword.value = "";
            
            if (user.isAdmin === true) {
                isAdmin = true;
            }
        }
    }

    if (isLogin && !isAdmin) {
        window.location.assign("html/reserve.html");
    } else if (isLogin && isAdmin) {
        window.location.assign("html/temp_admin_reserve.html");
    } else {
        alert("Invalid username or password.");
    }
})

// Register Form
const registerForm = document.getElementById("register");
const registerButton = document.getElementById("register-form-submit");

registerButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = registerForm.regEmail.value;
    const name=username.substring(0,username.search("@dlsu.edu.ph"));
    const password = registerForm.regPassword.value;
    const confirmPassword = registerForm.regConfirmPassword.value;
    let isRegister = true;

    if(username.search("@dlsu.edu.ph")==-1){
        alert("Invalid email address.");
        isRegister=false;
    }

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
        console.log("Registering...");
        let request = new Request("/addUser", {
            method: "post",
            body: JSON.stringify({name:name,email: username, password: password, isAdmin: false}),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        let result=await fetch(request);
        console.log(result);
 
        if(result.status==201){
            alert("You have successfully registered.");
            window.location.assign("index.html");    
        }
        else{
            alert("Registration failed.");
        }
        
    }
})