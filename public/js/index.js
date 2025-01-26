let protou = await fetch("/getUsers");
let users = await protou.json();

// Animation of Forms
$('#registerMessage a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});

// Guest Log In
$('#guestMessage a').click(function () {
    window.location.assign("../html/reserve.html");;
});

// Login Form
const loginForm = document.getElementById("login");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = loginForm.logEmail.value;
    const password = loginForm.logPassword.value;
    const rememberMe = loginForm.rememberMe.checked;

    const loginData = {
        email: email,
        password: password,
        rememberMe: rememberMe,
        success: null,
        message: "No message"
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        if (response.ok) {
            // Login successful
            window.location.href = 'reserve.html';

        } else {
            // Login failed
            alert(data.message);
        }

    } catch (error) {
        console.error('Error:', error);
        // Handle any network or other errors that may occur
    }
})


// Register Form
const registerForm = document.getElementById("register");
const registerButton = document.getElementById("register-form-submit");

registerButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = registerForm.regEmail.value;
    const name = username.substring(0, username.search("@dlsu.edu.ph"));
    const password = registerForm.regPassword.value;
    const confirmPassword = registerForm.regConfirmPassword.value;
    let isRegister = true;

    if (username.search("@dlsu.edu.ph") == -1) {
        alert("Invalid email address.");
        isRegister = false;
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
        let request = new Request("/addUser", {
            method: "post",
            body: JSON.stringify({ name: name, email: username, password: password, isAdmin: false }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });

        let result = await fetch(request);

        if (result.status == 201) {
            alert("You have successfully registered.");
            window.location.assign("index.html");
        }
        else {
            alert("Registration failed.");
        }

    }
})