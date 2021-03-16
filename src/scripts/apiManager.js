export default class ApiManager {
    constructor() {
    };

    getPokemon() {
        try {
            return fetch("http://localhost:8088/pokemon").then(response => response.json());
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

    // Below is an example of a fetch post api call:

    addPokemon(newPokemon) {
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

    deletePokemon(pokemonId) {
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


    editPokemon(pokemonId, data) {
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
