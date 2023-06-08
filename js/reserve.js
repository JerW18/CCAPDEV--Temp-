/* Hardcoded Values */
let labNames = ["G503", "A2493", "Y021"];
let labSizes = [[[4, 3], [4, 3], [3, 4]], [[5, 10]], [[4, 6], [4, 6]]];
let reservations = [["Tyler Tan", "2023-6-9", "24", "30", "0", "011"],
                    ["Jeremy Wang", "2023-6-9", "17", "30", "0", "122"],
                    ["Lanz Lim", "2023-6-10", "17", "35", "1", "033"],
                    ["Johann Uytanlet", "2023-6-10", "20", "30", "0", "011"]];;

let selectedCell = -1;
let topform = document.forms.topform

initializeForm();
changeCenter();

function initializeForm() {
    document.getElementById("labForm").innerHTML = "";
    for (let i = 0; i < labNames.length; i++) {
        document.getElementById("labForm").innerHTML += `<option value = "${i}">${labNames[i]}</option>`;
    }
    document.getElementById("labForm").addEventListener("change", (e) => {
        if (selectedCell != -1) {
            let prev = document.getElementById(`${selectedCell[0]}${selectedCell[1]}${selectedCell[2]}`);
            prev.classList.remove("clickedCell");
        }
        selectedCell = -1;
        changeCenter();
        updateReserved();
    });

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
        if (selectedCell != -1) {
            let prev = document.getElementById(`${selectedCell[0]}${selectedCell[1]}${selectedCell[2]}`);
            prev.classList.remove("clickedCell");
        }
        selectedCell = -1;
        updateReserved();
    });

    document.getElementById("timeForm").innerHTML = "";
    // Start at 8AM and end at 8PM.
    for (let t = 16; t < 40; t++) {
        let hour = Math.floor(t / 2) % 12;
        if (hour == 0)
            hour = 12;

        let minute = (t % 2) * 30;
        if (minute == 0) {
            minute = "00";
        }
        let ampm = (Math.floor(t / 2) < 12) ? "AM" : "PM";
        document.getElementById("timeForm").innerHTML += `<option value = "${t}">${hour}:${minute} ${ampm}</option>`;
    }
    document.getElementById("timeForm").addEventListener("change", (e) => {
        if (selectedCell != -1) {
            let prev = document.getElementById(`${selectedCell[0]}${selectedCell[1]}${selectedCell[2]}`);
            prev.classList.remove("clickedCell");
        }
        selectedCell = -1;
        updateReserved();
    });
}

function changeCenter() {
    document.getElementById("center").innerHTML = "";
    let labSize = labSizes[(new FormData(topform)).get("labForm")];
    for (let t = 0; t < labSize.length; t++) {
        let insert = "";
        insert += "<table>";

        let table = labSize[t];
        for (let r = 0; r < table[0]; r++) {
            insert += "<tr>";
            for (let c = 0; c < table[1]; c++) {
                insert += `<td id = "${t}${r}${c}"></td>`;
            }
            insert += "</tr>";
        }
        insert += "</table>";
        document.getElementById("center").innerHTML += insert;

    }
    for (let t = 0; t < labSize.length; t++) {
        let table = labSize[t];
        for (let r = 0; r < table[0]; r++) {
            for (let c = 0; c < table[1]; c++) {
                document.getElementById(`${t}${r}${c}`).addEventListener("click", (e) => {
                    console.log(`Clicked Cell ${t}${r}${c}`);
                    if (selectedCell != -1) {
                        let prev = document.getElementById(`${selectedCell[0]}${selectedCell[1]}${selectedCell[2]}`);
                        prev.classList.remove("clickedCell");
                    }
                    selectedCell = [];
                    selectedCell[0] = t;
                    selectedCell[1] = r;
                    selectedCell[2] = c;
                    let now = document.getElementById(`${selectedCell[0]}${selectedCell[1]}${selectedCell[2]}`);
                    now.classList.add("clickedCell");
                })
            }
        }
    }
}

function updateReserved() {
    allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
        element.classList.remove("reserved");
    });

    for (let r of reservations) {
        // Check if same date...
        if ((new FormData(topform)).get("dateForm") == r[1]) {
            // Check if same time...
            console.log(r[2] + " " + (new FormData(topform).get("timeForm")) + " " + r[3]);
            if ((new FormData(topform).get("timeForm")) >= r[2] && (new FormData(topform).get("timeForm")) <= r[3]) {
                // Check if same lab...
                if ((new FormData(topform)).get("labForm") == r[4]) {
                    let now = document.getElementById(`${r[5]}`);
                    now.classList.add("reserved");
                    console.log("sdfdsdsf");
                }
            }
        }
    }
}
