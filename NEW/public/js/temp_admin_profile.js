import { labs, tables, users, reservations } from "./db.js";

const logoutButton = document.getElementById("logoutBtn");


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
            if (i.anonymous) {
                insert += `<td>Yes!</td>`;
            } else {
                insert += `<td>No!</td>`;
            }
            insert += `<td><a href="temp_admin_reserve.html"><img src = "../images/edit.png"> </a></td>`;
            insert += "</tr>";
        }
        table.innerHTML = insert;
    }
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
            if (i.anonymous) {
                insert += `<td>Yes!</td>`;
            } else {
                insert += `<td>No!</td>`;
            }
            insert += `<td><a href="temp_admin_reserve.html"><img src = "../images/delete.png"> </a></td>`;
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
        window.location.assign("../index.html");
    }
})