export default class ApiManager {
    constructor() {
    };

    getPokemon() {
        try {
            return fetch("http:localhost:8088/pokemon").then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

    getUsers() {
        try {
            return fetch("http:localhost:8088/users").then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };

    getTypes() {
        try {
            return fetch("http:localhost:8088/types").then(response => response.json());
        } catch (e) {
            console.error(e);
        };
    };
};


