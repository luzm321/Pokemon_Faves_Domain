let homePage = document.getElementById("homePage");
let loginPage = document.getElementById("loginPage");

export default class LoginManager {
    constructor() {};

    checkIfAuthenticated(usersDataPromiseArray) {
        usersDataPromiseArray[0].then((usersDataArray) => {
            for (let i = 0; i < usersDataArray.length; i++) {
                if (sessionStorage.getItem("username") === usersDataArray[i].username) {
                    this.redirectToHomePage();
                    break;
                } else {
                    //nothing
                };
            };
        });
    };

    authenticate(usersDataPromiseArray, username, password) {
        usersDataPromiseArray[0].then((usersDataArray) => {
            for (let i = 0; i < usersDataArray.length; i++) {
                if (username === usersDataArray[i].username && password === usersDataArray[i].password) {
                    this.redirectToHomePage();
                    sessionStorage.setItem("username", usersDataArray[i].username);
                    sessionStorage.setItem("password", usersDataArray[i].password);
                    break;
                } else {
                    // alert("The combination of user name and password you entered were incorrect");
                };
            };
        });
    };

    redirectToHomePage() {
        loginPage.setAttribute("hidden", "");
        homePage.removeAttribute("hidden");
    };
};