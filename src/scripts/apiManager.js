export default class ApiManager {
    constructor() {
    };

    getPokemon() {
        try {
            return fetch("http://localhost:8088/pokemon").then(response => {return response.json()});
        } catch (e) {
            console.error(e);
        };
    };

    getUsers() {
        try {
            return fetch("http://localhost:8088/users").then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

    getTypes() {
        try {
            return fetch("http://localhost:8088/types").then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

    addPokemon(newPokemon) { // parameter empty object pokemon to be passed on to the body
        try{
            return fetch("http://localhost:8088/pokemon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPokemon)
            }).then(response => response.json());

        } catch (e) {
            console.error(e);
        };
    };

    deletePokemon(pokemonId) { // need a target id, pass on template literal, don't need a body for delete call
        try {
            return fetch(`http://localhost:8088/pokemon/${pokemonId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

//data or bodyToReceive
    editPokemon(pokemonId, data) { //edit/put(revises everything) and patch(revises certain parts of object) need 2 parameters, the target id and new data to be passed on
        try{
            return fetch(`http://localhost:8088/pokemon/${pokemonId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

    patchPokemon(pokemonId, data) {
        try{
            return fetch(`http://localhost:8088/pokemon/${pokemonId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

};
