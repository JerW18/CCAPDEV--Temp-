const item =
    `<a id="logo" href="temp_guest_reserve.html">Arrow Laboratory</a>
<a id="profile">Login</a>
<a id="search">Search User</a>`;

document.getElementById("navbar").innerHTML = item;

initializeNavBarButtons();

/* initialize navbar buttons*/
function initializeNavBarButtons() {
    const searchButton = document.getElementById("search");
    const profileButton = document.getElementById("profile");
    searchButton.addEventListener("click", (e) => {
        window.location.assign("temp_guest_search_profile.html");
    })
    profileButton.addEventListener("click", (e) => {
        window.location.assign("../index.html");
    })
}