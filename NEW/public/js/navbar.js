
let credLevel = 0;
let credEmail = "";

initialize();

async function initialize() {
    let protoc = await fetch("/getCredentials");
    let creds = await protoc.json();
    credLevel = creds.credLevel;
    credEmail = creds.email;

    let item = `<a id="logo" href="reserve.html">Arrow Laboratory</a>`;
    if (credLevel != 0)
        item += `<a id="profile">Profile</a>`;
    item += `<a id="search">Search User</a>`;

    document.getElementById("navbar").innerHTML = item;
    initializeNavBarButtons();
}



/* initialize navbar buttons*/
function initializeNavBarButtons() {
    const searchButton = document.getElementById("search");
    searchButton.addEventListener("click", (e) => {
        window.location.assign("search_profile.html");
    })
    if (credLevel != 0) {
        const profileButton = document.getElementById("profile");
        profileButton.addEventListener("click", (e) => {
            if (credLevel == 2) {
                window.location.assign("admin_profile.html");
            }
            else if (credLevel == 1) {
                window.location.assign("student_profile.html");
            }
            else if (credLevel == 0) {
                alert("You are not logged in!");
            }
        })
    }
}