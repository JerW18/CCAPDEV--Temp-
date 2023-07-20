import { labs, tables, users, reservations } from "./db.js";

//TODO need to implement hide profile details and reservations, and also to
//add rows to the reservation information column when there is a reservation,
//make it scrollable.

const searchForm = document.forms.searchForm;

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
if (username != null) {
    document.getElementById("textSearch").value = username;
}

console.log(document.getElementById("textSearch").value);

// Main JS
updateResTable();
processTextForm();

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    processTextForm();
})

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

        if (!i.isAnonymous && (i.email == (new FormData(searchForm).get("fname"))
            || i.walkInStudent == (new FormData(searchForm).get("fname")))) {

            insert += "<tr>";

            insert += "<td>" + i["reservationID"] + "</td>";
            insert += "<td>" + i["labSeat"].lab + "</td>";
            insert += "<td>" + i["labSeat"].seat + "</td>";
            insert += "<td>" + i["requestDateAndTime"].date + "</td>";
            insert += "<td>" + i["requestDateAndTime"].startTime + "</td>";
            insert += "<td>" + i["reservedDateAndTime"].date + "</td>";

            let time = [parseInt(i["reservedDateAndTime"].startTime), parseInt(i["reservedDateAndTime"].endTime) + 1];
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
        }
        table.innerHTML = insert;

    }

}

function processTextForm() {
    const searchForm = document.getElementById("searchForm");
    const searchButton = document.getElementById("searchButton");
    let username = searchForm.fname.value;
    for (const user of users) {
        if (user.email == username && !user.isAdmin) {
            updateResTable();
            const displayName = document.getElementById("displayName");
            const usertag = document.getElementById("username");
            const bio = document.getElementById("writtendesc");
            const img = document.getElementById("icon");
            bio.textContent = user.bio;
            let loc = user.email.search("@");
            usertag.textContent = "@" + user.email.substring(0, loc);
            displayName.textContent = user.name;
            img.src = user.picture;
        }
    }
}
