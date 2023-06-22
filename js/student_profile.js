import { labs, tables, users, reservations } from "./db.js";

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
    saveChangesButton.setAttribute("hidden", true);
    cancelButton.setAttribute("hidden", true);
    logoutButton.removeAttribute("hidden");
    deleteButton.removeAttribute("hidden");
});

// Print Reservations
updateResTable();

function updateResTable() {
    //one reservation=1 row
    //one detail of reservation=1col
    let insert = `<thead>
                        <tr class="sticky">
                            <th class="th-sm">Reservation</th>
                            <th class="th-sm">Room</th>
                            <th class="th-sm">Seat</th>
                            <th class="th-sm" colspan = "2">Date And Time Requested</th>
                            <th class="th-sm" colspan = "3">Date And Time Reserved</th>
                        </tr>
                    </thead>`;
    const table = document.getElementById("table");

    for (let i of reservations) {
        if (i.email == "tyler_tan@dlsu.edu.ph") {
            insert += "<tr>";

            insert += "<td>" + i["reservationID"] + "</td>";
            insert += "<td>" + i["labSeat"].lab + "</td>";
            insert += "<td>" + i["labSeat"].seat + "</td>";
            insert += "<td>" + i["requestDateAndTime"].date + "</td>";
            insert += "<td>" + i["requestDateAndTime"].startTime + "</td>";
            insert += "<td>" + i["reservedDateAndTime"].date + "</td>";

            let time = [parseInt(i["reservedDateAndTime"].startTime), parseInt(i["reservedDateAndTime"].endTime)];
            for (let i = 0; i < 2; i++) {
                insert += "<td>";
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
                insert += "</td>";

            }
            insert += "</tr>";
/* TODO: Tried fitting in anonymous pero di na kasya so kung kaya ayusin thru css go lang XD
            if (i["anonymous"])
                insert += "<td> Yes </td>";
            else
                insert += "<td> No </td>";
                */
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

