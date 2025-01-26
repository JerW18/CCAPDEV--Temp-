let protor = await fetch("/getReservations");
let reservations = await protor.json();

let protou = await fetch("/getUsers");
let users = await protou.json();

let protoc = await fetch("/getCredentials");
let creds = await protoc.json();

const searchForm = document.forms.searchForm;

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
if (username != null) {
    let temp = username;
    document.getElementById("textSearch").value = username;
    document.getElementById("searchResult").setAttribute("style", "display: none;");
    await processTextForm(temp, username);
    document.getElementById("userinfo").setAttribute("style", "display: block;");
}

// Main JS

updateResTable();
await processTextForm();

searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    document.getElementById("searchResult").setAttribute("style", "display: block;");
    document.getElementById("userinfo").setAttribute("style", "display: none;");
    await displayUsers();
})

function updateResTable(email) {
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

        if (!i.isAnonymous && i.email == email
            || i.walkInStudent == email) {

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

async function processTextForm(name, email) {
    for (const user of users) {
        if ((user.email == email || user.name == name) && !user.isAdmin) {
            updateResTable(email);
            const displayName = document.getElementById("displayName");
            const usertag = document.getElementById("username");
            const bio = document.getElementById("writtendesc");
            const img = document.getElementById("icon");
            bio.textContent = user.bio;
            let loc = user.email.search("@");
            usertag.textContent = "@" + user.email.substring(0, loc);
            displayName.textContent = user.name;

            const imgRes = await fetch("/getImage?email=" + email);
            const imgNum = await imgRes.json();
            img.src = "../images/default_" + imgNum + ".png";
        }
    }
}

async function displayUsers() {
    const searchForm = document.getElementById("searchForm");
    const searchResult = document.getElementById("searchResult");
    
    searchResult.innerHTML = "";

    let searchValue = searchForm.fname.value;
    let count = 0;

    const result = await fetch("/getUsersWithSubstring?substring=" + searchValue);
    const users = await result.json();  
    const usersLength = users.length;

    if (usersLength == 0) {
        searchResult.innerHTML = "<h2>No results found.</h2>";
    }
    else {  
        searchResult.innerHTML = `<p class="search-results-count">${usersLength} users found.</p>`;
        for (const user of users) {
            const name = user.name;
            const email = user.email;
            const bio = user.bio;

            const imgRes = await fetch("/getImage?email=" + email);
            const imgNum = await imgRes.json();
            const img = "../images/default_" + imgNum + ".png";
            
            let tempHTML = ""
            tempHTML +=
            `<section class="search-result-item">
                <a class="image-link"><img class="image" src=${img}></a>
                <div class="search-result-item-body">
                    <div class="row">
                        <div class="col-sm-9">
                            <h4 class="search-result-item-heading">${name}</h4>
                            <p class="info">${email}</p>`
            if (bio == null) {
                tempHTML += `<p class="description"></p>`
            } else {
                tempHTML += `<p class="description">${bio}</p>`
            }
            tempHTML += `<button type="submit" class="btn btn-primary btn-info btn-sm" id="viewProfile${count}">View Profile</button>
                        </div>
                    </div>
                </div>
            </section>`;

            searchResult.innerHTML += tempHTML;
            count++;
        }

        count = 0;
        for (const user of users) {
            const name = user.name;
            const email = user.email;

            let viewProfile = "viewProfile" + count.toString();

            document.getElementById(viewProfile).addEventListener("click", async (e) => {
                e.preventDefault();
                document.getElementById("searchResult").setAttribute("style", "display: none;");
                await processTextForm(name, email);
                document.getElementById("userinfo").setAttribute("style", "display: block;");
            })

            count++;     
        }
    }
}
