# CCAPDEV-LabReservation
**CCAPDEV Major Course Output: Lab Reservation System**

A Computer Laboratory Reservation System web application made with HTML, CSS, and Javascript provides an efficient and user-friendly platform for students and faculty to schedule and manage their computer lab usage.

## Local Set Up
- Make sure MongoDB is installed and running.
- Run `npm install`.
- In `main.js` in the `server/routes` folder uncomment the four lines under the TODO: comment to initialize the DB.
  - Don't forget to comment out the TODO: after running once as to not repeatedly initialize the DB.
- To run the application, execute `node app.js`.

Note:
It is recommended to use Firefox to open this website. If opening the files automatically goes to another browser, 
you may want to manually copy the url and open it on Firefox.

In this system, the cut-off for editing/deleting a reservation is the day before the actual reservation.
The only exception to this rule is that an admin can delete an ongoing reservation if the user is 10 or more minutes late.

Furthermore, most of the sample data for the reservations have their dates set to somewhere between 2023-06-26
and 2023-06-29. As such, if testing on later dates, these reservations might not be visible. In such a case, 
please set your system's date to sometime earlier, preferably 2023-07-24, to be able to view these reservations properly.

<br>
If there are any problems, please don't hesitate to contact anyone from our group.

## What to do in the Website
- To Login
  - Use the "email" followed by the "password" to log in as a student or admin
  - The current hard-coded values for user logins are...

    | Email      | Password |
    | --- | --- |
    | lanz_lim@dlsu.edu.ph        | lanz_lim      |
    |   tyler_tan@dlsu.edu.ph    |    tyler_tan    |
    |  jeremy_wang@dlsu.edu.ph  |     jeremy_wang    |
    |johann_uytanlet@dlsu.edu.ph | johann_uytanlet|
    | gwen_stacy@dlsu.edu.ph|gwen_stacy |
    |cellinia_texas@dlsu.edu.ph |cellinia_texas |

  - To log in as an admin you would need to use these instead.

    | Email | Password |
    | --- | --- |
    |admin1@dlsu.edu.ph | admin1  |
    |admin2@dlsu.edu.ph | admin2  |
    |admin3@dlsu.edu.ph | admin3  |
    |admin4@dlsu.edu.ph | admin4  |
    |admin5@dlsu.edu.ph | admin5  |

---

Created by: Lanz Lim, Tyler Tan, Jeremy Wang, and Johann Uytanlet
