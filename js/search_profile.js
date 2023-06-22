import { labs, tables, users, reservations } from "./db.js";

//TODO need to implement hide profile details and reservations, and also to
//add rows to the reservation information column when there is a reservation,
//make it scrollable.

const searchForm = document.forms.searchForm;

// Main JS
updateResTable();

document.getElementById("searchButton").addEventListener("click", e => {
    e.preventDefault();
    updateResTable();
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
        console.log(!i.isAnonymous, " ", i.email == (new FormData(searchForm).get("fname")));
        if (!i.isAnonymous && i.email == (new FormData(searchForm).get("fname"))) {
            console.log("sdfsd");
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
        }
        table.innerHTML = insert;
    }

}


