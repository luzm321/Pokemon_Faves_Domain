import ApiManager from "./apiManager.js";
import ElementFactory from "./elementFactory.js";

let apiManager = new ApiManager();
let elementFactory = new ElementFactory();
let pokemonDataPromiseArray = new Array();
let usersDataPromiseArray = new Array();
let typesDataPromiseArray = new Array();

let parentElement = document.getElementById("pokemonBiases");
let addPokemonButton = document.getElementById("addPokemon");
let deletePokemonButton = document.getElementById("deletePokemon");
let editPokemonButton = document.getElementById("editPokemon");
let patchPokemonButton = document.getElementById("patchPokemon");
let inputPokemonName = document.getElementById("name");
let inputPokemonType = document.getElementById("type");
let inputPokemonId = document.getElementById("pokemonIdInput");

let newPokemon = {};
let pokemonId;

let getDataFromApis = () => {
    pokemonDataPromiseArray.push(apiManager.getPokemon());
    usersDataPromiseArray.push(apiManager.getUsers());
    typesDataPromiseArray.push(apiManager.getTypes());
};

let addEventListeners = () => {
    inputPokemonName.addEventListener("change", updateValue);
    inputPokemonType.addEventListener("change", updateValue);
    addPokemonButton.addEventListener("click", clickOnAddPokemon);
    inputPokemonId.addEventListener("change", updateValue);
    deletePokemonButton.addEventListener("click", clickOnDeletePokemon);
    editPokemonButton.addEventListener("click", clickOnEditPokemon);
    patchPokemonButton.addEventListener("click", clickOnPatchPokemon);
};

let updateValue = (event) => {
    if(event.target.id === "pokemonIdInput") {
        pokemonId = event.target.value;
    } else {
        newPokemon[event.target.id] = event.target.value;
        console.log("pokemon object", newPokemon);
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

let initialize = new Promise((resolve, reject) => {
    addEventListeners();
    resolve(getDataFromApis());
});

initialize.then(() => {
    console.log("pokemon data array promise", pokemonDataPromiseArray[0]);
    console.log("users data array promise", usersDataPromiseArray[0]);
    console.log("types data array promise", typesDataPromiseArray[0]);


    pokemonDataPromiseArray[0].then(pokeData => {
        console.log("pokemon data", pokeData);
        pokeData.forEach(pokemon => {
            elementFactory.createNewElement("p", "id", "pokemonName", "class", "pokemonClass", pokemon.name, parentElement);
        });
    });

    usersDataPromiseArray[0].then(usersData => {
        console.log("users data", usersData);
        usersData.forEach(user => {
            elementFactory.createNewElement("p", "id", "usersName", "class", "usersClass", user.firstName, parentElement);
        });
    });

    typesDataPromiseArray[0].then(typesData => {
        console.log("types data", typesData);
        typesData.forEach(type => {
            elementFactory.createNewElement("p", "id", "typesName", "class", "typesClass", type.name, parentElement);
        });
    });
});
