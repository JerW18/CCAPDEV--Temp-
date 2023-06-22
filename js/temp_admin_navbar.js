const item = 
`<a id="logo" href="reserve.html">Arrow Laboratory</a>
<a id="profile">Profile</a>
<a id="search">Search User</a>`

document.getElementById("navbar").innerHTML = item;

initializeNavBarButtons();

/* initialize navbar buttons*/
function initializeNavBarButtons(){
    const searchButton = document.getElementById("search");
    const profileButton = document.getElementById("profile");
    searchButton.addEventListener("click",(e)=>{
        window.location.assign("search_profile.html");
    })
    profileButton.addEventListener("click",(e)=>{
        window.location.assign("temp_admin_profile.html");
    })
}