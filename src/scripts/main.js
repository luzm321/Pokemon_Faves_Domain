fetch("http://localhost:8088/pokemon").then(response =>  response.json()).then(pokemonData => {
    console.log("data", pokemonData);
});
