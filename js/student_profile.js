initializeNavBarButtons();


/* initialize navbar buttons*/
function initializeNavBarButtons(){
    const searchButton=document.getElementById("search");
    const profileButton=document.getElementById("profile");
    searchButton.addEventListener("click",(e)=>{
        window.location.assign("search_profile.html");
    })
    profileButton.addEventListener("click",(e)=>{
        window.location.assign("student_profile_reservations.html");
    })
}