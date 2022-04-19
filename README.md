# Survey Creator App

- #### This site is live [here](https://poll-app.nildeb.xyz/).
- #### Github Repository [link](https://github.com/nil1729/poll-app).

---

## Features of the Project

- ### Frameworks or Languages:

1. _`NodeJS`_ is used for building Backend part of this Website.
2. _`MongoDB`_ used for Database to store data.
3. _`ExpressJS`_ is used as Backend Framework.
4. _`Materialize-CSS`_ is used for CSS Framework and the website is Responsive for all Devices.
5. _`ChartJS`_ is used for Charting the responses and Data.

---

- ### Authentication for Users:

1. _`PassportJS`_ is used for Authentication purpose.
2. Two types of Strategy is used in this Website. (viz. [Local Strategy] and [Google oAuth Strategy]).
3. User can Register via `Google` or by submitting `Email` and `Password` as Standard Login.

---

- ### Survey Create and Manage:

1. Only logged in user can create a Survey.
2. Completely newly created `Survey` will have no question on it initially
3. Only Survey owner can added question to Survey.
4. Only survey owner can view the analysis of his survey.
5. Only those surveys show on `Public Surveys` section which has atleast `one` question.
6. In `My Surveys` section an user can view all of his surveys.
7. There have total 7 types of feedback Question (eg. Multiple Choice, Yes/No, slider, Select Many, Like-Dislike, Emoji Feedback, Star Rating etc. and also has a `Comment Box` feature.)
8. In User `Dashboard`, an user can `Delete` , `Update` and `Add Question` to a Survey.

---

- ### Analysis of Survey

1. _`ChartJS`_ is used for charting the Data got from Responses of a Survey.
2. Two types of Chart is used. One is `Bar Chart` and another is `Doughtnut`.
3. Easily Understandable to all users.

---

- ### Security

1. Encrypt passwords with `bcrypt`
2. Prevent cross site scripting - `XSS` using `xss-clean`.
3. Prevent NoSQL injections using `express-mongo-sanitize`.
4. Add a rate limit for requests of 50 requests per 10 minutes using `express-rate-limit`.
5. Protect against http param polution using `hpp`.
6. Add headers for security using `helmet`.
7. Use `CORS` to make API public.

---

## Run this Project on Local Environment.

1. **Prerequisites**
   1. NodeJS installed on your machine
   2. MongoDB installed on your local machine or have an Atlas Account.
   3. Google API keys for Google OAuth-Authentication
2. **Credentials Setup**
   1. Create a MongoDB Atlas Account for Host this Project Online. Find Tutorials [here](https://www.youtube.com/watch?v=KKyag6t98g8).
   2. Setup and Enable Google API keys for OAuth. Find Tutorials [here](https://youtu.be/o9e3ex-axzA)
3. **Project Setup**
   1. Clone this Repository or Download the zip File.
      ```
       >> git clone https://github.com/nil1729/poll-app
      ```
   1. Create a new file named `default.json` on `config` directory.
   1. In `default.json` file put all secret Credentials. (In following Format)
      ```
      {
          "sessionSecret": "<Session Secret for Passport Authentication>",
          "mongoURI": "<MongoDB Atlas URI or Local MongoDB URI>",
          "googleClientSecret": "<Google Client Secret>",
          "googleClientID": "<Google Client ID>",
      }
      ```

---

## Website Preview

- ### `Home` Page ( Describe the features )
    <img src="./preview/home.png" >
- ### `Login and Resgister` Page ( For Authenticating Users ).
    <img src="./preview/login.png" >
- ### `Public Surveys` Page ( Show all surveys which atleast have one Question ).
    <img src="./preview/public.png" >
- ### `My Surveys` Page ( Show all of your Surveys either it has atlest one Question or not ).
    <img src="./preview/my-survey.png" >
- ### `Dashboard` ( User can manage all CRUD operation here in one single page).
    <img src="./preview/dashboard.png" >
- ### `Add Question` Page ( Add Question to a particular Survey ).
    <img src="./preview/question.png" >
- ### `Preview and Response` Page ( Show the particular survey with all of its Questions ).
    <img src="./preview/preview.png" >
- ### `Analysis` Page ( Show analysis of responses and Charts for a particular Survey ).
    <img src="./preview/analyze.png" >

---

<p style="text-align: center;">Made With<span style="color: red;"> &#10084; </span>by <a href="https://github.com/nil1729" target="_blank"> Nilanjan Deb </a> </p>
