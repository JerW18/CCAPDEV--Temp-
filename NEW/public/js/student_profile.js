


let protoc = await fetch("/getCredentials");

let creds = await protoc.json();
let credLevel = creds.credLevel;
let credEmail = creds.email;
if (credLevel != 1) {
    window.location.href = "/html/index.html";
}
let protou = await fetch("/getUser?email=" + credEmail);
let user = await protou.json();

let protor = await fetch("/getUserReservations?email=" + credEmail);
let reservations = await protor.json();

// Filter reservations so that only the ones that are in the future by one day are shown
//TODO: check if this works


const emailfield = document.getElementById("email");
const usernamefield = document.getElementById("username");
const biofield = document.getElementById("bioText");
const profilepic = document.getElementById("profilepic");

profilepic.src = user.picture;
emailfield.innerHTML = user.email;
usernamefield.innerHTML = user.name;
biofield.innerHTML = user.bio;

const saveChangesButton = document.getElementById("saveBtn");
const cancelButton = document.getElementById("cancelBtn");
const logoutButton = document.getElementById("logoutBtn");
const deleteButton = document.getElementById("deleteBtn");
const bioText = document.getElementById("bioText");
const saveChangesPwButton = document.getElementById("saveBtnPw");

saveChangesButton.addEventListener("click", (e) => {
    let newBio = bioText.value;
    let data = { "bio": newBio, "email": credEmail };
    fetch("/updateBio", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.status == 201) {
            alert("Bio updated!");
            window.location.href = "/html/student_profile.html";
        }
        else {
            alert("Error updating bio");
        }
    });
});

saveChangesPwButton.addEventListener("click", (e) => {
    let oldPw = document.getElementById("oldPw").value;
    let newPw = document.getElementById("newPw").value;
    let confirmPw = document.getElementById("confirmPw").value;
    let valid = true;
    if (oldPw == "" || newPw == "" || confirmPw == "") {
        alert("Please fill out all fields!");
        valid = false;
    }
    if (oldPw == newPw & valid == true) {
        alert("New password cannot be the same as the old password!");
        valid = false;
    }
    if (oldPw != user.password & valid == true) {
        alert("Current password is incorrect!");
        valid = false;
    }
    if (newPw != confirmPw & valid == true) {
        alert("Passwords do not match!");
        valid = false;
    }
    console.log(valid);
    if (valid == true) {
        let data = { "newPassword": newPw, "email": credEmail };
        fetch("/updatePassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status == 201) {
                alert("Password updated!");
                window.location.href = "/html/student_profile.html";
            }
            else {
                alert("Error updating password");
            }
        });
    }
});



bioText.addEventListener("click", (e) => {
    saveChangesButton.removeAttribute("hidden");
    cancelButton.removeAttribute("hidden");
    logoutButton.setAttribute("hidden", true);
    deleteButton.setAttribute("hidden", true);
    console.log("clicked");
});

cancelButton.addEventListener("click", (e) => {
    biofield.value = user.bio;
    saveChangesButton.setAttribute("hidden", true);
    cancelButton.setAttribute("hidden", true);
    logoutButton.removeAttribute("hidden");
    deleteButton.removeAttribute("hidden");
});

// Print Reservations
console.log(credLevel);

updateResTable();

function updateResTable() {
    let insert = `<thead>
                        <tr class="sticky">
                            <th class="th-sm">Reservation</th>
                            <th class="th-sm">Room</th>
                            <th class="th-sm">Seat</th>
                            <th class="th-sm">Requested At</th>
                            <th class="th-sm">Reserved For</th>
                            <th class="th-sm">Anonymous?</th>
                            <th class="th-sm"></th>
                            <th class="th-sm"></th>
                        </tr>
                    </thead>`;
    const table = document.getElementById("table");

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
        insert += `</td>`;
        if (i.anonymous) {
            insert += `<td>Yes!</td>`;
        } else {
            insert += `<td>No!</td>`;
        }
        insert += `<td><a href="reserve.html?edit=${i["reservationID"]}"><img src = "../images/edit.png"> </a></td>`;
        insert += `<td><a ><img id=${i["reservationID"]} class=deleteIconBtn src = "../images/delete.png"></td>`;
        insert += "</tr>";

    }
    table.innerHTML = insert;
}

let deleteButtons = document.getElementsByClassName("deleteIconBtn");

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        let result = confirm("Are you sure you want to delete this reservation?");
        if (result == true) {
            let reservationID = deleteButtons[i].id;
            let data = { "reservationID": reservationID };
            console.log(data);
            fetch("/deleteReservation", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.status == 201) {
                    alert("Reservation deleted!");
                    window.location.href = "/html/student_profile.html";
                }
                else {
                    alert("Error deleting reservation");
                }
            });
        }
    });
}



// Confirm Delete Account Popup
const deleteBtn = document.getElementById("deleteBtn");
console.log(credEmail);

deleteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    confirm("Are you sure you want to delete your account?");
    console.log("clicked");

    let result = fetch("/deleteUser", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": credEmail }),
    }).then((response) => {
        if (response.status == 200) {
            window.location.href = "/html/index.html";
        }
        else {
            alert("Error deleting account");
        }
    });

});



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
