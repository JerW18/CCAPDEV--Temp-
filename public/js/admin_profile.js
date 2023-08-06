let protor = await fetch("/getReservations");
let reservations = await protor.json();
console.log(reservations);

let protoc = await fetch("/getCredentials");

let creds = await protoc.json();
let credLevel = creds.credLevel;
let credEmail = creds.email;

let protou = await fetch("/getUser?email=" + credEmail);
let user = await protou.json();

const imgRes = await fetch("/getImage?email=" + user.email);
const imageNum = await imgRes.json();


if (credLevel != 2) {
    window.location.href = "/html/index.html";
}

//initialization of user info
const emailfield = document.getElementById("email");
const usernamefield = document.getElementById("username");
const profilepic = document.getElementById("profilepic");

console.log(user.email);

profilepic.src = "../images/default_" + imageNum + ".png";


emailfield.innerHTML = user.email;
usernamefield.innerHTML = user.name;


const saveChangesButton = document.getElementById("saveBtn");
const cancelButton = document.getElementById("cancelBtn");
const logoutButton = document.getElementById("logoutBtn");
const deleteButton = document.getElementById("deleteBtn");
const bioText = document.getElementById("bioText");
const saveChangesPwButton = document.getElementById("saveBtnPw");



// Print Reservations
updateViewResTable();
updateDeleteResTable();




function updateViewResTable() {
    let insert = `<thead>
                        <tr class="sticky">
                            <th class="th-sm">Reservation</th>
                            <th class="th-sm">Room</th>
                            <th class="th-sm">Seat</th>
                            <th class="th-sm">Requested At</th>
                            <th class="th-sm">Reserved For</th>
                            <th class="th-sm">Anonymous?</th>
                            <th class="th-sm"></th>
                        </tr>
                    </thead>`;
    const table = document.getElementById("viewTable");
    for (let i of reservations) {

        insert += "<tr>";

        insert += "<td>" + i["reservationID"] + "</td>";
        insert += "<td>" + i["labSeat"].lab + "</td>";
        insert += "<td>" + i["labSeat"].seat + "</td>";
        insert += "<td>" + i["requestDateAndTime"].date + "<br>" + i["requestDateAndTime"].startTime + "</td>";
        insert += "<td>" + i["reservedDateAndTime"].date + "<br>";

        let time = [parseInt(i["reservedDateAndTime"].startTime), parseInt(i["reservedDateAndTime"].endTime) + 1];
        for (let i = 0; i < 2; i++) {
            let morning = true;
            let minutes = time[i] % 2;
            time[i] /= 2;
            time[i] = Math.floor(time[i]);
            if (time[i] > 12) {
                time[i] -= 12;
                morning = false;
            }
            time[i] = time[i].toString();
            if (minutes == 0) {
                time[i] += ":00";
            }
            else {
                time[i] += ":30";
            }
            if (!morning) {
                time[i] += " PM";
            }
            else {
                time[i] += " AM";
            }
            insert += time[i];
            if (i == 0)
                insert += " to ";

        }
        if (i.isAnonymous) {
            insert += `<td>Yes!</td>`;
        } else {
            insert += `<td>No!</td>`;
        }
        insert += `<td><a href="reserve.html?edit=${i["reservationID"]}"><img id=E${i["reservationID"]} class=editIconBtn src = "../images/edit.png"> </a></td>`;
        insert += "</tr>";
    }
    table.innerHTML = insert;
}


let editButtons = document.getElementsByClassName("editIconBtn");
for(const element of editButtons){
    element.addEventListener('click', function (e) {
        e.preventDefault();
        let resID = element.id.substring(1);

        let valid = true;
        // alert the user if they are deleting a reservation that is in the past by one day
        for (let r of reservations) {  
            if (r.reservationID == resID) {
                let today = new Date();
                let yearNow = today.getFullYear();
                let dayNow = today.getDate();
                let monthNow = today.getMonth()+1;

                let resDate = new Date(r.reservedDateAndTime.date);
                let yearRes = resDate.getFullYear();
                let dayRes = resDate.getDate();
                let monthRes = resDate.getMonth()+1;

                if (yearRes < yearNow) {
                    alert("You cannot edit a reservation that has already passed!");
                    valid = false;
                }
                else if (yearRes == yearNow && monthRes < monthNow) {
                    alert("You cannot edit a reservation that has already passed!");
                    valid = false;
                }
                else if (yearRes == yearNow && monthRes == monthNow && dayRes <= dayNow) {
                    alert("You cannot edit a reservation that has already passed!");
                    valid = false;
                }
            }
        }
        if(valid==true){
            let result=confirm("Are you sure you want to edit this reservation?");
            if(result==true){   
                window.location.assign(`reserve.html?edit=${resID}`)
            }
        }
    });
}

function updateDeleteResTable() {
    let insert = `<thead>
                        <tr class="sticky">
                            <th class="th-sm">Reservation</th>
                            <th class="th-sm">Room</th>
                            <th class="th-sm">Seat</th>
                            <th class="th-sm">Requested At</th>
                            <th class="th-sm">Reserved For</th>
                            <th class="th-sm">Anonymous?</th>
                            <th class="th-sm"></th>
                        </tr>
                    </thead>`;
    const table = document.getElementById("deleteTable");

    for (let i of reservations) {
        insert += "<tr>";

        insert += "<td>" + i["reservationID"] + "</td>";
        insert += "<td>" + i["labSeat"].lab + "</td>";
        insert += "<td>" + i["labSeat"].seat + "</td>";
        insert += "<td>" + i["requestDateAndTime"].date + "<br>" + i["requestDateAndTime"].startTime + "</td>";
        insert += "<td>" + i["reservedDateAndTime"].date + "<br>";

        let time = [parseInt(i["reservedDateAndTime"].startTime), parseInt(i["reservedDateAndTime"].endTime) + 1];
        for (let i = 0; i < 2; i++) {
            let morning = true;
            let minutes = time[i] % 2;
            time[i] /= 2;
            time[i] = Math.floor(time[i]);
            if (time[i] > 12) {
                time[i] -= 12;
                morning = false;
            }
            time[i] = time[i].toString();
            if (minutes == 0) {
                time[i] += ":00";
            }
            else {
                time[i] += ":30";
            }
            if (!morning) {
                time[i] += " PM";
            }
            else {
                time[i] += " AM";
            }
            insert += time[i];
            if (i == 0)
                insert += " to ";

        }
        if (i.isAnonymous) {
            insert += `<td>Yes!</td>`;
        } else {
            insert += `<td>No!</td>`;
        }
        insert += `<td><a><img id=${i["reservationID"]} class=deleteIconBtn src = "../images/delete.png"> </a></td>`;
        insert += "</tr>";
    }
    table.innerHTML = insert;
}

// can only delete a reservation 10 minutes after startime
let deleteButtons = document.getElementsByClassName("deleteIconBtn");
for(let i = 0; i < deleteButtons.length; i++){
    deleteButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        let resID = deleteButtons[i].id;
        let valid = true;
        for(let r of reservations){
            if(resID == r.reservationID){
                let today = new Date();
                let resDate= new Date(r.reservedDateAndTime.date);
                let yearRes = resDate.getFullYear();
                let dayRes = resDate.getDate();
                let monthRes = resDate.getMonth()+1;
                let startTimeRes = r.reservedDateAndTime.startTime;

                //formatting the time of reservation to +10 minutes
                let minutes = startTimeRes % 2;
                startTimeRes /= 2;
                let startTimeResHour = Math.floor(startTimeRes);
                let startTimeResMin;
                if (minutes == 0) {
                    startTimeResMin =10;
                }
                else {
                    startTimeResMin = 40;
                }
                startTimeRes= startTimeRes;
                console.log(startTimeResHour);
                console.log(startTimeResMin);
                resDate= new Date(yearRes, monthRes-1, dayRes, startTimeResHour, startTimeResMin);
                console.log(resDate);
                if(resDate>today){
                    alert("You cannot delete a reservation that has not started yet!");
                    valid = false;
                }
                if(valid == true){
                    let result = confirm("Are you sure you want to delete this reservation?");
                    if (result == true) {
                        let data = {"reservationID": resID}
                        console.log(data);
                        let deleteData = fetch("/deleteReservation", {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        }).then((response) => {
                            if (response.status == 201) {
                                alert("Reservation deleted!")
                                window.location.href = "/html/admin_profile.html";
                            }
                            else {
                                alert("Error deleting reservation");
                            }
                        });
                    }
                }

            }
        }
    });
}



// // Confirm Delete Account Popup
// const deleteBtn = document.getElementById("deleteBtn");

// deleteBtn.addEventListener('click', function (e) {
//     e.preventDefault();
//     const res = confirm("Are you sure you want to delete your account?");
//     console.log("clicked");
    
//     if(res == 1){
//         let result = fetch("/deleteUser", {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ "email": credEmail }),
//         }).then((response) => {
//             if (response.status == 200) {
//                 window.location.href = "/html/index.html";
//             }
//             else {
//                 alert("Error deleting account");
//             }
//         });
//     }


// });

logoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    let result = confirm("Are you sure you want to log out?");
    if (result == true) {
        let logoutdata = fetch("/logout").then((response) => {
            if (response.status == 200) {
                window.location.href = "/html/index.html";
            }
            else {
                alert("Error logging out");
            }
        });
    }
})
