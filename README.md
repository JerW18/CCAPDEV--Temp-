# CCAPDEV-LabReservation
**CCAPDEV Major Course Output: Lab Reservation System**

Inspired by LibCal, this program is a Computer Laboratory Reservation System web application made with HTML, CSS, and Javascript provides an efficient and user-friendly platform for students and faculty at De La Salle University to schedule and manage their computer lab usage.

Visit the site in: https://lab-reservation-n02n.onrender.com

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

Note:
It is recommended to use Chrome/Firefox to open this website. If opening the files automatically goes to another browser, 
you may want to manually copy the url and open it on Chrome/Firefox.

In this system, the cut-off for editing/deleting a reservation is the day before the actual reservation.
The only exception to this rule is that an admin can delete an ongoing reservation if the user is 10 or more minutes late.

Furthermore, most of the sample data for the reservations have their dates set to somewhere between 2023-08-07
and 2023-08-08. As such, if testing on later dates, these reservations might not be visible. In such a case, 
please set your system's date to sometime earlier, preferably 2023-08-06, to be able to view these reservations properly.

Third-Party Libraries
- bootstrap (4.5.0)
- jquery (1.10.2)

NPM Package Dependencies
- bcrypt (5.1.0)
- connect-mongo (5.0.0)
- cookie-parser (1.4.6)
- dotenv (16.3.1)
- ejs (3.1.9)
- express (4.18.2)
- express-ejs-layouts (2.5.1)
- express-handlebars (7.1.0)
- express-session (1.17.3)
- jsonwebtoken (9.0.1)
- method-override (3.0.0)
- mongoose (7.4.0)
- path (0.12.7)
- url (0.11.1)

<br>
If there are any problems, please don't hesitate to contact anyone from our group.

---

Created by: Lanz Lim, Tyler Tan, Jeremy Wang, and Johann Uytanlet
