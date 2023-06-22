import { labs, tables, users, reservations } from "./db.js";

/* Global Values */
let topForm = document.forms.topForm;

/* Start Up the Page */
initializeTopForm();
updateCenter(0);
initializeCenterListener();

/* Initialize Options for TopForm */
function initializeTopForm() {
    initializeTopFormLab();
    initializeTopFormDate();
    initializeTopFormTime();
}

/* Add Form Options for "Lab" */
function initializeTopFormLab() {

    /* Add Options Based on Labs in DB */
    document.getElementById("labForm").innerHTML = "";
    for(let lab of labs){
        document.getElementById("labForm").innerHTML += `<option value = "${lab.labCode}">${lab.labCode}</option>`;
    }

    /* Add EventListener to Change Center and Reserved */
    document.getElementById("labForm").addEventListener("change", (e) => {
        updateCenter(-1);
        hideBottom();
    });
}

/* Add Form Options for "Date" */
function initializeTopFormDate() {
    document.getElementById("dateForm").innerHTML = "";
    const today = new Date();
    for (let i = 0; i <= 7; i++) {
        let result = new Date(today);
        result.setDate(result.getDate() + i);
        let year = result.getFullYear();
        let month = result.getMonth() + 1;
        let day = result.getDate();

        let resultDate = `${year}-${month}-${day}`;
        document.getElementById("dateForm").innerHTML += `<option value = "${resultDate}">${resultDate}</option>`;
    }
    document.getElementById("dateForm").addEventListener("change", (e) => {
        updateCenter(-1);
        hideBottom();
    });
}

/* Add Form Options for "Time" */
function initializeTopFormTime() {
    document.getElementById("timeForm").innerHTML = "";
    // Start at 8AM and end at 8PM.
    for (let t = 16; t < 40; t++) {
        let hour = Math.floor(t / 2) % 12;
        if (hour == 0)
            hour = 12;
        if (hour < 10) {
            hour = "0" + hour;
        }
        let minute = (t % 2) * 30;
        if (minute == 0) {
            minute = "00";
        }
        let ampm = (Math.floor(t / 2) < 12) ? "AM" : "PM";
        document.getElementById("timeForm").innerHTML += `<option value = "${t}">${hour}:${minute} ${ampm}</option>`;
    }
    document.getElementById("timeForm").addEventListener("change", (e) => {
        updateCenter(-1);
        hideBottom();
    });
}

/* Update the Center Seating Display */
function updateCenter(clickedPosition) {
    updateCenterTables();
    updateCenterListeners();
    updateCenterClicked(clickedPosition);
    updateCenterReserved();
}

/* Create the Tables that will Represent the Seatings */
function updateCenterTables() {
    document.getElementById("center").innerHTML = "";
    let tablesToAdd = [];
    for(let t of tables){
        if(t.lab == (new FormData(topForm)).get("labForm")){
            tablesToAdd.push(t);
        }
    }
    for (let t = 0; t < tablesToAdd.length; t++) {
        let insert = "";
        insert += "<table>";

        let table = tablesToAdd[t];
        for (let r = 0; r < table.rows; r++) {
            insert += "<tr>";
            for (let c = 0; c < table.columns; c++) {
                insert += `<td id = "${t}${r}${c}" class= "seat"></td>`;
            }
            insert += "</tr>";
        }
        insert += "</table>";

        document.getElementById("center").innerHTML += insert;
    }
}

/* Create the EventListeners for Each Seat in the Display */
function updateCenterListeners() {
    let tablesToAdd = [];
    for(let t of tables){
        if(t.lab == (new FormData(topForm)).get("labForm")){
            tablesToAdd.push(t);
        }
    }
    for (let t = 0; t < tablesToAdd.length; t++) {
        let table = tablesToAdd[t];
        for (let r = 0; r < table.rows; r++) {
            for (let c = 0; c < table.columns; c++) {
                document.getElementById(`${t}${r}${c}`).addEventListener("click", (e) => {
                    updateCenter([t, r, c]);
                    updateBottom((new FormData(topForm).get("timeForm")));
                })
            }
        }
    }
}

/* Update the Reserved Seats to be Red */
function updateCenterReserved() {

    /* Remove all currently reserved seats. */
    const allReserved = document.querySelectorAll("reservedSeat");
    allReserved.forEach((element) => {
        element.classList.remove("reservedSeat");
    });

    /* For each reservation, check if they apply then color red if applicable. */
    for (let r of reservations) {
        // Check if same date...
        if ((new FormData(topForm)).get("dateForm") == r.reservedDateAndTime.date) {
            // Check if same time...
            if ((new FormData(topForm).get("timeForm")) >= r.reservedDateAndTime.startTime && (new FormData(topForm).get("timeForm")) <= r.reservedDateAndTime.endTime) {
                // Check if same lab...
                if ((new FormData(topForm)).get("labForm") == r.labSeat.lab) {
                    let now = document.getElementById(`${r.labSeat.seat}`);
                    now.classList.add("reservedSeat");
                }
            }
        }
    }
}

/* Update the Clicked Seat to be Darker */
function updateCenterClicked(clickedPosition) {
    // -1 is a special value indicating to remove the currently clicked seat.
    // 0 is a special value indicating to do nothing.

    if (clickedPosition == -1) {
        const pastClicked = document.querySelectorAll("clickedSeat");
        pastClicked.forEach((element) => {
            element.classList.remove("clickedSeat");
        });
    }

    if (clickedPosition != -1 && clickedPosition != 0) {
        let nowClicked = document.getElementById(`${clickedPosition[0]}${clickedPosition[1]}${clickedPosition[2]}`);
        nowClicked.classList.add("clickedSeat");
    }
}

/* Initialize the EventListener for clicking outside the seats but still within
the center. This should cause the bottom panel to be hidden from view. */
function initializeCenterListener() {
    let center = document.getElementById("center");
    center.addEventListener("click", (e) => {
        if (!e.target.classList.contains("seat")) {
            hideBottom();
            updateCenter(-1);
        }
    });
}

/* Delete contents of "bottom" and hide it. */
function hideBottom() {
    document.getElementById("bottom").innerHTML = "";
    document.getElementById("bottom").classList.add("hidden");
}

/* Update contents of "bottom" based on the seat clicked in the center panel and the clicked timeslot. */
function updateBottom(clickedSlot) {

    hideBottom();
    document.getElementById("bottom").classList.remove("hidden");

    updateBottomTables();
    updateBottomReserved();
    updateBottomListeners();
    updateBottomClicked(clickedSlot);

}

/* Create and insert all html code for the content in the bottom panel. */
function updateBottomTables() {
    let insert = "";

    /* First, add the details on the left side of the bottom panel. */
    insert += `<div id = "bottomDetails"><div>Seat No. ${document.querySelector(`.clickedSeat`).id}</div>`;
    insert += `<div>Lab Room ${(new FormData(topForm).get("labForm"))}</div>`;
    insert += `<div>Date: ${(new FormData(topForm).get("dateForm"))}</div></div>`;

    /* Then, add the table in the center to represent the slots of that seat. */
    insert += `<div id = "bottomTableContainer"><table><tr>`;
    // Start at 8AM and end at 8PM.
    for (let t = 8; t < 20; t++) {
        let hour = t % 12;
        if (hour == 0)
            hour = 12;
        if (hour < 10) {
            hour = "0" + hour;
        }
        let ampm = (t < 12) ? "AM" : "PM";

        insert += `<td colspan = "2">${hour}${ampm}</td>`;
    }
    insert += "</tr><tr>";
    for (let t = 16; t < 40; t++) {
        insert += `<td id = "S${t}" class = "slot"></td>`;
    }
    insert += `</tr><tr><td colspan = "24">Reserved By: <span id = "reserver">None</span></td></tr>`;
    insert += `</tr></table></div>`;

    /* Lastly, add the button to submit and checkbox to submit as anonymous on the right side. */
    insert += `<div id = "bottomForm"><form><input type = "submit" name = "submit" id = "submit" value = "Confirm Reservation" disabled>`
    insert += `<br><div id = "checkboxContainer"><input type = "checkbox" name = "anonymous" id = "anonymous">`
    insert += `<label for = "checkbox">Anonymous?</label><div></form>`;

    document.getElementById("bottom").innerHTML += insert;
}

/* Based on current reservations, mark all reserved slots as "reservedSlots" to make them red. */
function updateBottomReserved() {
    for (let r of reservations) {
        let clickedSeat = document.querySelector(".clickedSeat");
        if (clickedSeat != null) {
            if (clickedSeat.id == r.labSeat.seat) {
                if (r.reservedDateAndTime.date == (new FormData(topForm)).get("dateForm")) {
                    if (r.labSeat.lab == (new FormData(topForm)).get("labForm")) {
                        for (let i = r.reservedDateAndTime.startTime; i <= r.reservedDateAndTime.endTime; i++) {
                            document.getElementById(`S${i}`).classList.add("reservedSlot");
                        }
                    }
                }
            }
        }
    }
}

/* Create the EventListeners for all slots in the table. */
function updateBottomListeners() {
    let allSlots = document.querySelectorAll(".slot");
    allSlots.forEach((element) => {
        element.addEventListener("click", (e) => {
            updateBottomClicked(element.id.slice(1));
        });
    });
}

/* Triggers when a slot is clicked. Updates which slots in the table are clicked based on what was clicked before. */
function updateBottomClicked(clickedSlot) {
    /* If the slot clicked is a reserved slot... */
    if (document.getElementById(`S${clickedSlot}`).classList.contains("reservedSlot")) {
        /* Remove all currently "clicked" and "selecting" slots. */
        document.querySelectorAll(".clickedSlot, .selectingSlot").forEach((element) => {
            element.classList.remove("clickedSlot", "selectingSlot");
        });
        /* Find the reservation that matches the clicked slot. */
        for (let r of reservations) {
            if (document.querySelector(".clickedSeat").id == r.labSeat.seat) {
                // Check if same date...
                if ((new FormData(topForm)).get("dateForm") == r.reservedDateAndTime.date) {
                    // Check if same time...
                    if (clickedSlot >= r.reservedDateAndTime.startTime && clickedSlot <= r.reservedDateAndTime.endTime) {
                        // Check if same lab...
                        if ((new FormData(topForm)).get("labForm") == r.labSeat.lab) {
                            for (let i = r.reservedDateAndTime.startTime; i <= r.reservedDateAndTime.endTime; i++) {
                                let now = document.getElementById(`S${i}`);
                                now.classList.add("clickedSlot");
                            }
                            if (r.isAnonymous) {
                                document.getElementById("reserver").innerHTML = "Anonymous";
                            } else {
                                if (r.walkInStudent == null) {
                                    document.getElementById("reserver").innerHTML = `<a href = search_profile.html?username=${r.email}>${r.email}</a>`;
                                } else {
                                    document.getElementById("reserver").innerHTML = `${r.walkInStudent} (${r.email})`;
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
        document.getElementById("submit").disabled = true;
    }
    /* If the slot clicked is NOT a reserved slot and they HAVEN'T selected a slot (dark green) before... */
    else if (document.querySelector(".selectingSlot") == null) {
        document.getElementById(`S${clickedSlot}`).classList.add("selectingSlot");
        document.querySelectorAll(".clickedSlot").forEach((element) => {
            element.classList.remove("clickedSlot");
        });
        document.getElementById("reserver").innerHTML = "None";
        document.getElementById("submit").disabled = true;
    }
    /* If the slot clicked is NOT a reserved slot and they HAVE selected a slot (dark green) before... */
    else {
        let lastSelected = document.querySelector(".selectingSlot").id.slice(1);
        document.querySelector(".selectingSlot").classList.remove("selectingSlot");
        if (lastSelected < clickedSlot) {
            for (let i = lastSelected; i <= clickedSlot; i++) {
                if (document.getElementById(`S${i}`).classList.contains("reservedSlot")) {
                    break;
                }
                document.getElementById(`S${i}`).classList.add("clickedSlot");
            }
        } else {
            for (let i = lastSelected; i >= clickedSlot; i--) {
                if (document.getElementById(`S${i}`).classList.contains("reservedSlot")) {
                    break;
                }
                document.getElementById(`S${i}`).classList.add("clickedSlot");
            }
        }
        document.getElementById("reserver").innerHTML = "None";
        document.getElementById("submit").disabled = false;
    }
}