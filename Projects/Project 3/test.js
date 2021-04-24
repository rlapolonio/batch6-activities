const mainListUrl = "https://pokeapi.co/api/v2/pokemon?limit=1118";
const mainUrl = "https://pokeapi.co/api/v2/pokemon";
const getPrimaryList = async () => {
  const pokemonStream = await fetch(mainListUrl);
  const pokemonData = await pokemonStream.json();
  const pokemonList = await pokemonData.results;
  const pokemonListNames = await pokemonList.map(item => item.name);
  
  const masterList = await Promise.all(pokemonListNames.map(async item => {
    let pokemonStream2 = await fetch(mainUrl + `/${item}`);
    let pokemonData2 = await pokemonStream2.json();
    let pokemonName = await pokemonData2.name;
    let pokemonNum = await pokemonData2.id;
    let pokemonType1 = await pokemonData2.types[0].type.name;
    let pokemonType2 = await pokemonData2.types[1] ? pokemonData2.types[1].type.name : '';
    let pokemonImg = await pokemonData2.sprites.front_default;
  
    let pokemon = {
      'name': pokemonName,
      'id': pokemonNum,
      'type1': pokemonType1,
      'type2': pokemonType2,
      'img': pokemonImg
    }
    return pokemon;
  }))

  return masterList;
};

let page = 0;
const displayItems = () => {
  let y = page * 21;
  let length = dataBase.length;
  let z = length - y > 21 ? y + 21 : length;
  const list_container = document.querySelector('.list-container');
  const tile_template = document.querySelector('.tile-template');
  for (let x = y; x < z; x++) {
    let name = dataBase[x].name;
    let id = dataBase[x].id;
    let type1 = dataBase[x].type1;
    let type2 = dataBase[x].type2 != '' ? dataBase[x].type2 : '';
    let url = dataBase[x].img;

    const newTile = document.importNode(tile_template.content, true);
    const poke_num = newTile.querySelector('.poke-num');
    const poke_name = newTile.querySelector('.poke-name');
    const poke_type1 = newTile.querySelector('.type1');
    const poke_type2 = newTile.querySelector('.type2');
    const poke_img = newTile.querySelector('.poke-img');

    poke_num.innerText = '#' + id;
    poke_name.innerText = name;
    poke_type1.innerText = type1;
    poke_type2.innerText = type2 != '' ? `/ ${type2}` : '';
    poke_img.src = url;

    list_container.appendChild(newTile);
  }
}

const load_data = () => {
  let pokemon = localStorage.getItem('pokemon');
  console.log('database populated from localstorage');
  return dataBase = JSON.parse(pokemon);
}

let dataBase = [];
const initialize = () => {
  if (!localStorage.getItem('pokemon')) {
    getPrimaryList().then(list => {
      console.log(list)
    })
    // setTimeout(() => {
    //   console.log(masterList);
    //   localStorage.setItem(`pokemon`, JSON.stringify(masterList));
    //   console.log('masterlist downloaded to localstorage');
    //   load_data();
    //   displayItems();
    // }, 3000);
  } else {
    load_data();
    displayItems();
  }
}

initialize();




