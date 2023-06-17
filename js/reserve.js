/* Hardcoded Values */
let labNames = ["G503", "A2493", "Y021"];
let labSizes = [[[4, 3], [4, 3], [3, 4]], [[4, 10]], [[4, 6], [4, 6]]];
/*
let reservations0 = [["Tyler Tan", "2023-6-11", "24", "30", "0", "011"],
["Jeremy Wang", "2023-6-11", "17", "30", "0", "122"],
["Lanz Lim", "2023-6-10", "17", "35", "1", "033"],
["Johann Uytanlet", "2023-6-10", "20", "30", "0", "011"]];;
*/
let reservations = [
    {
        reserver: "Tyler Tan", technician: null, anonymous: false,
        date: "2023-6-17", start: "24", end: "30", lab: "1", seat: "011"
    },
    {
        reserver: "Jeremy Wang", technician: null, anonymous: true,
        date: "2023-6-17", start: "17", end: "30", lab: "0", seat: "122"
    },
    {
        reserver: "Lanz Lim", technician: "Lab Tech 1", anonymous: false,
        date: "2023-6-17", start: "17", end: "35", lab: "1", seat: "033"
    },
    {
        reserver: "Johann Uytanlet", technician: null, anonymous: false,
        date: "2023-6-18", start: "20", end: "25", lab: "0", seat: "011"
    },
    {
        reserver: "Tyra Tan", technician: null, anonymous: false,
        date: "2023-6-18", start: "27", end: "30", lab: "0", seat: "011"
    },
    {
        reserver: "Texas", technician: "Lappland", anonymous: false,
        date: "2023-6-18", start: "25", end: "31", lab: "0", seat: "022"
    }
];

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
    for (let i = 0; i < labNames.length; i++) {
        document.getElementById("labForm").innerHTML += `<option value = "${i}">${labNames[i]}</option>`;
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
    let labSize = labSizes[(new FormData(topForm)).get("labForm")];
    for (let t = 0; t < labSize.length; t++) {
        let insert = "";
        insert += "<table>";

        let table = labSize[t];
        for (let r = 0; r < table[0]; r++) {
            insert += "<tr>";
            for (let c = 0; c < table[1]; c++) {
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
    let labSize = labSizes[(new FormData(topForm)).get("labForm")];
    for (let t = 0; t < labSize.length; t++) {
        let table = labSize[t];
        for (let r = 0; r < table[0]; r++) {
            for (let c = 0; c < table[1]; c++) {
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
    allReserved = document.querySelectorAll("reservedSeat");
    allReserved.forEach((element) => {
        element.classList.remove("reservedSeat");
    });

    /* For each reservation, check if they apply then color red if applicable. */
    for (let r of reservations) {
        // Check if same date...
        if ((new FormData(topForm)).get("dateForm") == r.date) {
            // Check if same time...
            if ((new FormData(topForm).get("timeForm")) >= r.start && (new FormData(topForm).get("timeForm")) <= r.end) {
                // Check if same lab...
                if ((new FormData(topForm)).get("labForm") == r.lab) {
                    let now = document.getElementById(`${r.seat}`);
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
        pastClicked = document.querySelectorAll("clickedSeat");
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
    insert += `<div>Lab Room ${labNames[(new FormData(topForm).get("labForm"))]}</div>`;
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
            if (clickedSeat.id == r.seat) {
                if (r.date == (new FormData(topForm)).get("dateForm")) {
                    if (r.lab == (new FormData(topForm)).get("labForm")) {
                        for (let i = r.start; i <= r.end; i++) {
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
            if (document.querySelector(".clickedSeat").id == r.seat) {
                // Check if same date...
                if ((new FormData(topForm)).get("dateForm") == r.date) {
                    // Check if same time...
                    if (clickedSlot >= r.start && clickedSlot <= r.end) {
                        // Check if same lab...
                        if ((new FormData(topForm)).get("labForm") == r.lab) {
                            for (let i = r.start; i <= r.end; i++) {
                                let now = document.getElementById(`S${i}`);
                                now.classList.add("clickedSlot");
                            }
                            if (r.anonymous == true) {
                                document.getElementById("reserver").innerHTML = "Anonymous";
                            } else {
                                if (r.technician == null) {
                                    // TODO: Add link to other page here.
                                    document.getElementById("reserver").innerHTML = `<a>${r.reserver}</a>`;
                                } else {
                                    document.getElementById("reserver").innerHTML = `${r.reserver} (${r.technician})`;
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