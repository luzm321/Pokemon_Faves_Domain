import ApiManager from "./apiManager.js";
import ElementFactory from "./elementFactory.js";
import LoginManager from "./loginManager.js";

let apiManager = new ApiManager();
let loginManager = new LoginManager();
let elementFactory = new ElementFactory();
let pokemonDataPromiseArray = new Array();
let usersDataPromiseArray = new Array();
let typesDataPromiseArray = new Array();
// home page:
let parentElement = document.getElementById("pokemonBiases");
let addPokemonButton = document.getElementById("addPokemon");
let deletePokemonButton = document.getElementById("deletePokemon");
let editPokemonButton = document.getElementById("editPokemon");
let patchPokemonButton = document.getElementById("patchPokemon");
let logoutButton = document.getElementById("logoutButton");
let inputPokemonName = document.getElementById("name");
let inputPokemonType = document.getElementById("type");
let inputPokemonId = document.getElementById("pokemonIdInput");
let newPokemon = {};
let pokemonId;

// login page:
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let loginButton = document.getElementById("loginButton");
let username;
let password;

// this function is in charge of getting all the data
let getDataFromApis = () => {
    pokemonDataPromiseArray.push(apiManager.getPokemon());
    usersDataPromiseArray.push(apiManager.getUsers());
    typesDataPromiseArray.push(apiManager.getTypes());
};

// we wrap the getDataFromApis in a promise so we can do something else later after getting the data
let gettingDatafromApis = new Promise((resolve) => {
    resolve(getDataFromApis());
});

// this function is in charge of adding all the event listeners
let addEventListeners = () => {
    inputPokemonName.addEventListener("change", updateValue);
    inputPokemonType.addEventListener("change", updateValue);
    addPokemonButton.addEventListener("click", clickOnAddPokemon);
    inputPokemonId.addEventListener("change", updateValue);
    deletePokemonButton.addEventListener("click", clickOnDeletePokemon);
    editPokemonButton.addEventListener("click", clickOnEditPokemon);
    patchPokemonButton.addEventListener("click", clickOnPatchPokemon);
    usernameInput.addEventListener("change", updateValue);
    passwordInput.addEventListener("change", updateValue);
    loginButton.addEventListener("click", () => {
        loginManager.authenticate(usersDataPromiseArray, username, password);
    });
    logoutButton.addEventListener("click", loginManager.clickOnLogOut);
};

// this function is in charge of assigning values to variables depending on which input element the user is typing on
let updateValue = (event) => {
    // if the input the user types on is the id input then it grabs the events target value and sticks it in the pokemonId variable
    if (event.target.id === "pokemonIdInput") {
        pokemonId = event.target.value;
        // else if the input is either the name or type input element then it creates a property(key) of name in the newPokemon empty object and
        // puts the events target value as its value, this object will later on be passed to the addPokemon function to add it or eddit it
    } else if (event.target.id === "name" || event.target.id === "type") {
        newPokemon[event.target.id] = event.target.value;
        console.log("pokemon object", newPokemon);
        // if the input is the username input then it grabs the events target value and sticks it in the username variable, this will be used to
        // log the user in.
    } else if (event.target.id === "username") {
        username = event.target.value;
        console.log("username", username);
    } else {
        // for everything else it must be the password input, so stick the events target value in the password variable which will also be user to
        // log the user in.
        password = event.target.value;
        console.log("password", password);
    };
};

let clickOnAddPokemon = () => {
    apiManager.addPokemon(newPokemon).then(() => {
        location.reload();
    });
};

let clickOnDeletePokemon = () => {
    apiManager.deletePokemon(pokemonId).then(() => {
        location.reload();
    });
};

let clickOnEditPokemon = () => {
    apiManager.editPokemon(pokemonId, newPokemon).then(() => {
        location.reload();
    });
};

let clickOnPatchPokemon = () => {
    apiManager.patchPokemon(pokemonId, newPokemon).then(() => {
        location.reload();
    });
};

// we make a promise called initialize where we will execute all the things we want to execute as the app initializes
let initialize = new Promise((resolve) => {
    // first thing we do is call the gettingDataFromApis function which gets all the data, after that then we check to see if the user has logged in
    // before and if their username and password are in session storage by invokin the checkIfAuthenticated function
    gettingDatafromApis.then(() => {
        loginManager.checkIfAuthenticated(usersDataPromiseArray);
        // last thing we do in initialization is add all the event listeners by resolving that function
        resolve(addEventListeners());
    }); 
});

// after initializing/doing all the most important things for the app then we can proceed to display stuff and other things.
initialize.then(() => {
    console.log("pokemon data array promise", pokemonDataPromiseArray[0]);
    console.log("users data array promise", usersDataPromiseArray[0]);
    console.log("types data array promise", typesDataPromiseArray[0]);


    // here we are resolving the promise inside the pokemonDataPromiseArray
    pokemonDataPromiseArray[0].then(pokeData => {
        console.log("pokemon data", pokeData);
        // after that we loop through all of the pokemon and create a paragraph element that will display all of this pokemon's info
        pokeData.forEach(pokemon => {
            // we create a paragraph element using our elementFactory method
            elementFactory.createNewElement("p", "id", "pokemonName", "class", "pokemonClass", pokemon.name, parentElement);
        });
    });

    // same as the above but for the users
    usersDataPromiseArray[0].then(usersData => {
        console.log("users data", usersData);
        usersData.forEach(user => {
            elementFactory.createNewElement("p", "id", "usersName", "class", "usersClass", user.firstName, parentElement);
        });
    });

    // same as the above for the types
    typesDataPromiseArray[0].then(typesData => {
        console.log("types data", typesData);
        typesData.forEach(type => {
            elementFactory.createNewElement("p", "id", "typesName", "class", "typesClass", type.name, parentElement);
        });
    });
});
