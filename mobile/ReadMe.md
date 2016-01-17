
## PediaAppointment

https://docs.google.com/document/d/1SJueG0vEtur3dA9VmZs8LvLWgajIjAxtP8393G-TLXU/edit?ts=5665e5cc

The Iron Yard
17 A Princess Street
Charleston SC 29401

"PediaAppointment"

From the minds of Dustin Guthrie & Lindsay Williams
- Dustin Guthrie:  https://github.com/DustinGuthrie
- Lindsay Williams:  https://github.com/williamsl25

PediaAppointment is a mobile application which will allow parents to schedule pediatrician appointments at any time and from any place regardless of standard doctors office hours.  The app will allow you to search for then save a primary pediatrician, add family members, and most importantly send vitals/health information to the doctor’s office when scheduling an appointment.

Technology:
- JavaScript
- Angular
- HTML/CSS
- NodeJS
-  Ionic
-  MongoDB
-  MongoLabs
-  Heroku
-  Google API
- Angular-Cordova Calendar Plugin

MVP Features:
- User will be able to log in or create a New User account.
- Authenticated user can edit their user profile.
- Authenticated user can add/edit dependents to their profile.
- On dependent profile user can add/edit primary pediatrician information using Google API.
- Authenticated user can create a new appointment for a specific dependent.
- Appointment notification is sent via email to pediatrician or Google Calendar API.
- Appointment notification is received by authenticated user.

User Stories:

1) Home/Log-In
Size: 	Medium

Value Statement:
User is able to successfully login to navigate the features of the application.

Acceptance Criteria:
- Ability to enter User Name into field
- Ability to enter Password into field
- User is authenticated when clicking submit
- Authenticated user is able to see new appointment form page
- New User button will navigate to new user page
- Invalid User credentials will show error message

Wireframe: (See Google Doc)

2) New User
Size:	Medium

Value Statement:
New Users are added to the database so they can create a profile and navigate the features of the application.

- Acceptance Criteria:
- Ability to add First, Last Name into form
- Ability to add Contact Number into form
- Ability to enter Email address into form
- When Create New User button selected user is added to database
- Upon successful user creation user is able to see new appointment form
- Ability to navigate using hamburger icon

Wireframe (See Google Doc)

3) User Profile
Size:	Large

Value Statement:
User Profile will contain detailed information about an authenticated user.  This will hold valuable information that will be viewable by the pediatricians office.  Profile information will also be used on other pages to create the appointment.

Acceptance Criteria:
- Ability to add Dependents
- Ability to see list of Dependents
- Ability to edit First, Last Name, Contact Number, Email of parent
- Ability to select Primary Pharmacy
- Ability to save Profile Information to database
- Ability to navigate using hamburger icon

Wireframe (See Google Doc)

4) Dependents
Size:	Large

Value Statement:
Authenticated user is required to add detailed information for dependents in order to schedule an appointment.  The dependent profile contains name, date of birth, primary pediatrician, medical history, and any current medications.  Authenticated users can manage dependents from this page.

Acceptance Criteria:
- Ability to add Name, DOB, medical history, current medications, and primary pediatrician
- Ability to edit Name, DOB, medical history, current medications, and primary pediatrician
- Ability to view all dependent profile information
- Ability to show Google Map API
- Ability to save dependent to database
- Ability to navigate using hamburger icon

Wireframe: (See Google Doc)

5) New Appointment
Size:	Large

Value Statement:
Authenticated users need to be able to schedule pediatrician appointments.  This scheduler uses information shared from both the Parent and Dependent profile.

Acceptance Criteria:
- Ability to choose Dependent from drop-down list
- Ability to select Add Dependent and launch Dependent profile form
- Ability to choose symptoms from picker
- Ability to fill in Other box
- Ability to choose a day and time from the appointment picker
- Ability to navigate using hamburger icon

Wireframe (See Google Doc)

6) Confirmation
Size:	Medium

Value Statement:
User will receive a confirmation that the appointment was sent.  This will contain all of the appointment information and show it to the user.  User will also have the option to link the appointment to their calendar.  Past appointments can be removed.

Acceptance Criteria:
- Appointment details viewable to user
- User can add appointment to calendar (if sync’d)
- Multiple appointments can be viewed
- Past appointments can be removed
- Driving direction to pediatrician can be viewed (Bonus)
- Ability to navigate using hamburger icon

Wireframe (See Google Doc)

7) Contact Us
Size:	Medium

Value Statement:
Hamburger navigation will allow Users to navigate or logout while using the application.  Logged in User will appear in top navigation bar when logged in.  Contact Us will list all contact information and allow users to communicate with creators.  

Acceptance Criteria:
- Navigation will include Profile, Pediatrician Offices, Appointment Confirmations, Contact Us, and Logout
- Logged in user will appear in top navigation bar when logged in.
- When selecting Contact us: Contact Email, address, and phone will be viewable to users
- When selecting Profile: Parent profile page is viewable
- When selecting Pediatrician Offices: All available office locations are Google mapped
- When selecting Appointment Confirmations: All appointments page is viewable
- When selecting Logout: User is logged out and Home screen is viewable

Wireframe (See Google Doc)



//Tenative Database Collections//

Users:
- ID
- First Name
- Last Name
- Phone
- Email
- Password

Dependents:
- ID
- Parent ID
- Pediatrician ID
- First Name
- Last Name
- Date of Birth
- Pharmacy
- Medication
- Medical History

Pediatricians:
- ID
- Dependent ID
- Name
- Phone
- Address
- Email

Appointments:
- ID
- User ID
- Dependent ID
- Symptoms
- Date
- Time
=======
# MEAN Starter

### Features

- Token based Auth
- Oauth with Github and/or Google
- User roles
- File upload

more coming soon!

### Getting Started

For local development, you'll need the MongoDB database installed on your machine.

If you are using homebrew, simply type `brew install mongodb`.

Once you have Mongo installed via Homebrew, you want to be able to start/stop it.

To start, simply type in terminal `mongod`.  Local development in mean-starter uses the default test database provided in mongodb.

Next you will need to install the dependencies:
```
npm install
```

Then you will need gulp installed to run gulp commands.

```
gulp serve-dev
```
It should open your default browser window and update any changes as you develop.

A lot of inspiration from [Sahat's hackathon starter](https://github.com/sahat/hackathon-starter) with far less features.
