import ApiManager from "./apiManager.js";
import ElementFactory from "./elementFactory.js";
// import {constructNewElement} from "./elementFactory.js";

let parentElement = document.getElementById("pokemonBiases");


let apiManager = new ApiManager();
let elementFactory = new ElementFactory();
let pokemonDataPromiseArray = new Array();
let usersDataPromiseArray = new Array();
let typesDataPromiseArray = new Array();


let getDataFromApis = () => {
    pokemonDataPromiseArray.push(apiManager.getPokemon());
    usersDataPromiseArray.push(apiManager.getUsers());
    typesDataPromiseArray.push(apiManager.getTypes());
};

let initialize = new Promise((resolve, reject) => {
    resolve(getDataFromApis());
});

initialize.then(() => {
    console.log("pokemon data array promise", pokemonDataPromiseArray[0]);
    console.log("users data array promise", usersDataPromiseArray[0]);
    console.log("types data array promise", typesDataPromiseArray[0]);


    pokemonDataPromiseArray[0].then(pokeData => {
        console.log("pokemon data", pokeData);
    });

    usersDataPromiseArray[0].then(usersData => {
        console.log("users data", usersData);
    });

    typesDataPromiseArray[0].then(typesData => {
        console.log("types data", typesData);
    });


    pokemonDataPromiseArray[0].then(pokeData => {
        pokeData.forEach(pokemon => {
            elementFactory.constructNewElement("p", "id", "pokemonName", "class", "pokemonClass", pokemon.name, parentElement);
        });
    });

    usersDataPromiseArray[0].then(userData => {
        userData.forEach(users => {
            elementFactory.constructNewElement("p", "id", "userName", "class", "userClass", users.name, parentElement);
        });
    });

    typesDataPromiseArray[0].then(typesData => {
        typesData.forEach(types => {
            elementFactory.constructNewElement("p", "id", "typesName", "class", "typesClass", types.name, parentElement);
        });
    });

});
