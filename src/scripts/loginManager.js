let homePage = document.getElementById("homePage");
let loginPage = document.getElementById("loginPage");

export default class LoginManager {
    constructor() {};

    // this function is used so the user doesnt have to log in everytime to the app as long as he/she has done so at least once before.
    checkIfAuthenticated(usersDataPromiseArray) {
        // we pass the array that contains the promise of all the users and we resolve it
        usersDataPromiseArray[0].then((usersDataArray) => {
            // after resolving the promise we can then loop through all the users in the array
            for (let i = 0; i < usersDataArray.length; i++) {
                // we make a condition, if the username that we retrieve from sessionStorage is the same as that users iteration username then log
                // the user in
                if (sessionStorage.getItem("username") === usersDataArray[i].username) {
                    this.redirectToHomePage();
                    break;
                } else {
                    //nothing
                };
            };
        });
    };

    // function triggers when clicking on log in. usersDataPromiseArray is the array of users we got by making a getUsers call in main.
    authenticate(usersDataPromiseArray, username, password) {
        // we resolve the promise of the array of users which is inside the usersDataPromiseArray
        usersDataPromiseArray[0].then((usersDataArray) => {
            // we loop through the users
            for (let i = 0; i < usersDataArray.length; i++) {
                // we make a condition to check if the username that was typed and password are the same as that iteration user's username and password
                // then proceed
                if (username === usersDataArray[i].username && password === usersDataArray[i].password) {
                    // if they are the same then trigger the redirectToHomePage funtion and put that username and password in sessionStorage
                    this.redirectToHomePage();
                    sessionStorage.setItem("username", usersDataArray[i].username);
                    sessionStorage.setItem("password", usersDataArray[i].password);
                    // then stop the loop
                    break;
                } else {
                    // alert("The combination of user name and password you entered were incorrect");
                };
            };
        });
    };

    redirectToHomePage() {
        // if the username and password matched a user in the database then this function adds a hidden attribute to the login page so it hides
        // and it removes the hidden attribute to the homepage to appear as if the user logged in.
        loginPage.setAttribute("hidden", "");
        homePage.removeAttribute("hidden");
    };

    clickOnLogOut() {
        // on log out it just reverts everything, it adds a hidden attribute to the homepage and removes it from the login page to appear as if the
        // user logged out
        loginPage.removeAttribute("hidden");
        homePage.setAttribute("hidden", "");
        // it also removes both username and password from the sessionStorage
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
    };
};