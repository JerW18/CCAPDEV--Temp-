let protor = await fetch("/getReservations");
let reservations = await protor.json();
console.log(reservations);

let protoc = await fetch("/getCredentials");

let creds = await protoc.json();
let credLevel = creds.credLevel;
let credEmail = creds.email;
if(credLevel!=1){
    window.location.href = "/html/index.html";
}
let protou=await fetch("/getUser?email="+credEmail);
let user=await protou.json();



const emailfield=document.getElementById("email");
const usernamefield=document.getElementById("username");
const biofield=document.getElementById("bioText");
const profilepic=document.getElementById("profilepic");

profilepic.src=user.picture;
emailfield.innerHTML=user.email;
usernamefield.innerHTML=user.name;
biofield.innerHTML=user.bio;

const saveChangesButton = document.getElementById("saveBtn");
const cancelButton = document.getElementById("cancelBtn");
const logoutButton = document.getElementById("logoutBtn");
const deleteButton = document.getElementById("deleteBtn");
const bioText = document.getElementById("bioText");




bioText.addEventListener("click", (e) => {
    saveChangesButton.removeAttribute("hidden");
    cancelButton.removeAttribute("hidden");
    logoutButton.setAttribute("hidden", true);
    deleteButton.setAttribute("hidden", true);
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
        if (i.email == "tyler_tan@dlsu.edu.ph" || i.walkInStudent == "tyler_tan@dlsu.edu.ph") {
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
            insert += `<td><a href="reserve.html"><img src = "../images/edit.png"> </a></td>`;
            insert += `<td><a href="reserve.html"><img src = "../images/delete.png"> </a></td>`;
            insert += "</tr>";
        }
        table.innerHTML = insert;
    }

}

// Confirm Delete Account Popup
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener('click', function (e) {
    e.preventDefault();

    confirm("Are you sure you want to delete your account?");
});



logoutButton.addEventListener('click', function (e) {
    e.preventDefault();
    let result = confirm("Are you sure you want to log out?");
    if (result == true) {
        let logoutdata=fetch("/logout").then((response)=>{
            if(response.status==200){
                window.location.href = "/html/index.html";
            }
            else{
                alert("Error logging out");
            }
        });
    }
})
