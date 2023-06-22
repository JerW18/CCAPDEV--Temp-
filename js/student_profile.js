const saveChangesButton = document.getElementById("saveBtn");
const cancelButton = document.getElementById("cancelBtn");
const logoutButton = document.getElementById("logoutBtn");
const deleteButton = document.getElementById("deleteBtn");
const bioText = document.getElementById("bioText");

bioText.addEventListener("click",(e)=>{
    saveChangesButton.removeAttribute("hidden");
    cancelButton.removeAttribute("hidden");
    logoutButton.setAttribute("hidden",true);
    deleteButton.setAttribute("hidden",true);
});

cancelButton.addEventListener("click",(e)=>{
    saveChangesButton.setAttribute("hidden",true);
    cancelButton.setAttribute("hidden",true);
    logoutButton.removeAttribute("hidden");
    deleteButton.removeAttribute("hidden");
});

// Hardcoded Values
let reservations = [
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-23",
        start: "20", 
        end: "26" 
    },
    {
        res_code: "R#10105",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-24",
        start: "20",
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    }
];

// Print Reservations
initializeResTable();

function initializeResTable() {
  //one reservation=1 row
  //one detail of reservation=1col
    let insert = "";
    const table = document.getElementById("table");
    
    for (let i of reservations) {
        insert += "<tr>";
        for (const j in i) {
            insert += "<th>";
            //to print and format time
            if(j == "start" || j == "end"){
                let time = parseInt(i[j]);
                let morning = true;    
                let minutes = time % 2;
                time /= 2;
                time = Math.floor(time);

                if(time > 12){
                    time -= 12;
                    morning = false;
                }

                time = time.toString();

                if(minutes == 0){
                    time += ":00";
                }
                else{
                    time += ":30";
                }

                if(!morning){
                    time+="PM";
                }
                else{
                    time+="AM";
                }
                insert += time;
            }
            else{
                insert += i[j];    
            }

            insert+="</th>";
        }
        insert += `<th><a href="reserve.html"><img src = "../images/edit.png"> </a></th>`;
        insert += `<th><a href="#" class="deleteResBtn" data-confirm="Are you sure you want to delete this reservation?"><img src = "../images/delete.png"> </a></th>`;
        insert += "</tr>";
    }
    table.innerHTML+=insert;
}

// Confirm Delete Account Popup
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener('click', function(e) {
    e.preventDefault();

    confirm("Are you sure you want to delete your account?");
});

