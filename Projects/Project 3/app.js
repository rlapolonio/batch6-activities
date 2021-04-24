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
    let pokemonType = [await pokemonData2.types[0].type.name, await pokemonData2.types[1] ? pokemonData2.types[1].type.name : '']
    let pokemonImg = await pokemonData2.sprites.front_default;
    let pokemonGame = await pokemonData2.game_indices.map(item => item.version.name);
  
    let pokemon = {
      'name': pokemonName,
      'id': String(pokemonNum),
      'type': pokemonType,
      'img': pokemonImg,
      'game': pokemonGame
    }
    return pokemon;
  }))

  return masterList;
};

const abilityUrl = "https://pokeapi.co/api/v2/ability?limit=327";
const getAbilityList = async () => {
  const abilityStream = await fetch(abilityUrl);
  const abilityData = await abilityStream.json();
  const abilityList = await abilityData.results;
  const abilityUrlList = await abilityList.map(item => item.url);
  
  const abilityMasterList = await Promise.all(abilityUrlList.map(async item => {
    let abilityStream2 = await fetch(item);
    let abilityData2 = await abilityStream2.json();
    let abilityName = await abilityData2.name;
    let abilityDesc = '';
    await abilityData2.effect_entries.forEach(item => {
      if (item.language.name === "en") abilityDesc = item.short_effect});
    
    let ability = {
      'name': abilityName,
      'desc': abilityDesc
    }

    return ability;
  }));

  return abilityMasterList;
}

const clear_display = (arr) => {
  while (arr.firstChild) {
    arr.removeChild(arr.firstChild);
  }
}

const get_pokemon = async (name) => {
  const pokemonStream3 = await fetch(mainUrl + `/${name}`);
  const pokemonData3 = await pokemonStream3.json();
  return pokemonData3;
}

const sp_id_fld = document.querySelector('.sp-id');
const sp_name_fld = document.querySelector('.sp-name');
const sp_img_fld = document.querySelector('.sp-img');
const sp_type_fld = document.querySelector('.sp-types');
const sp_ht_fld = document.querySelector('.sp-ht');
const sp_wt_fld = document.querySelector('.sp-wt');
const sp_abilities_fld = document.querySelector('.sp-abilities');
const spotlight = document.querySelector('.spotlight-modal');
const type_template = document.querySelector('.type-template');
const ability_template = document.querySelector('.ability-template');

const show_spotlight = (name) => {
  get_pokemon(name)
  .then(res => {
    let id = res.id;
    let name = res.name;
    let img_src = res.sprites.front_default;
    let type1 = res.types[0].type.name;
    let type2 = res.types[1] != null ? res.types[1].type.name : '';
    let ht = res.height/10;
    let wt = res.weight/10;
    let abilities = res.abilities.map(item => item.ability.name);

    let stats = res.stats.map(item => {
      let name = item.stat.name;
      let value = item.base_stat;

      return {[name]:value}
    })
 
    console.log(stats);

    sp_id_fld.innerText = '#' + id;
    sp_name_fld.innerText = name;
    sp_img_fld.src = img_src !== null ? img_src : 'assets/temp.png';
    sp_ht_fld.innerText = 'Height: ' + ht + ' m.';
    sp_wt_fld.innerText = 'Weight: ' + wt + ' kg.';

    clear_display(sp_type_fld);

    const newType = document.importNode(type_template.content, true);
    const type_1 = newType.querySelector('.sp-type1');
    const type_2 = newType.querySelector('.sp-type2');

    if (type2 != '') {
      type_1.innerText = type1;
      type_1.classList.add(`type-${type1}`);
      type_2.innerText = type2;
      type_2.classList.add(`type-${type2}`);
      sp_type_fld.appendChild(newType);
    } else {
      type_1.innerText = type1;
      type_1.classList.add(`type-${type1}`);
      type_2.classList.add('hidden');
      sp_type_fld.appendChild(newType);
    }

    const getAbility = (elem) => {
      for (const abl of dataBase2) {
        if (abl.name === elem) {
          return abl;
        }
      }
    }

    clear_display(sp_abilities_fld);
    abilities.forEach(item => {
      let ability = getAbility(item);
      let name = ability.name;
      let desc = ability.desc;

      const newAbility = document.importNode(ability_template.content, true);
      const ab_name = newAbility.querySelector('.sp-ability-name');
      const ab_desc = newAbility.querySelector('.sp-ability-desc');

      ab_name.innerHTML = name;
      ab_desc.innerHTML = desc;

      sp_abilities_fld.appendChild(newAbility);
    })
    
    spotlight.classList.toggle('hidden');
  })
}

const results_num_fld = document.querySelector('.results-num-msg');
const show_count = () => {
  let pages = Math.ceil(results_num / 12);
  results_num_fld.innerText = `${results_num} results shown in ${pages} pages.`;
}

const clear_count = () => {
  results_num_fld.innerText = '';
}

let page = 0;
let displayList = [];
let mainList = [];
let filterApplied = false;
const pageNum = document.getElementById('page-num');
const list_container = document.querySelector('.list-container');
let specimon = '';
let results_num = 0;
const displayItems = () => {
  clear_display(list_container);
  pageNum.innerHTML = page + 1;
  displayList = [];
  mainList = [];
  let searchItems = [];
  const search_input = document.getElementById('search');
  let search_text = search_input.value.toLowerCase();

  if (search_input.value === '') {
    if (filterApplied === true) {
      if (filter_list.length <= 12) {
        displayList = filter_list;
        results_num = displayList.length;
      } else {
        mainList = filter_list;
        results_num = mainList.length;
        let y = page * 12;
        let length = mainList.length;
        let z = length - y > 12 ? y + 12 : length;
        for (let x = y; x < z; x++) {
          displayList.push(mainList[x]);
        }
      } 
    } else if (dataBase.length <= 12) {
      displayList = dataBase;
      results_num = displayList.length;
    } else {
      mainList = dataBase;
      results_num = mainList.length;
      let y = page * 12;
      let length = mainList.length;
      let z = length - y > 12 ? y + 12 : length;
      for (let x = y; x < z; x++) {
        displayList.push(mainList[x]);
      }
    } 
  } else {
    clear_type_filter();
    clear_game_filter();
    searchItems = dataBase.filter(item => {
      return (item.name.includes(search_text) || item.id.includes(search_text) || item.type[0].includes(search_text) || item.type[1].includes(search_text));
    });
    if (searchItems.length <= 12) {
      displayList = searchItems;
      results_num = displayList.length;
    } else {
      mainList = searchItems;
      results_num = mainList.length;
      let y = page * 12;
      let length = mainList.length;
      let z = length - y > 12 ? y + 12 : length;
      for (let x = y; x < z; x++) {
        displayList.push(mainList[x]);
      }
    }
  }

  const tile_template = document.querySelector('.tile-template');
  const no_display_template = document.querySelector('.no-display-template');
  if (displayList.length > 0) {
    list_container.classList.add('list-grid');
    for (let d = 0; d < displayList.length; d++) {
      let name = displayList[d].name;
      let id = displayList[d].id;
      let type1 = displayList[d].type[0];
      let type2 = displayList[d].type[1] != '' ? displayList[d].type[1] : '';
      let url = displayList[d].img;

      const newTile = document.importNode(tile_template.content, true);
      const poke_num = newTile.querySelector('.poke-num');
      const poke_name = newTile.querySelector('.poke-name');
      const poke_type1 = newTile.querySelector('.type1');
      const poke_type2 = newTile.querySelector('.type2');
      const poke_img = newTile.querySelector('.poke-img');
      const poke_mask = newTile.querySelector('.name-mask')

      poke_num.innerText = '#' + id;
      poke_name.innerText = name;
      poke_type1.innerText = type1;
      poke_type1.classList.add(`type-${type1}`);
      if (type2 != '') {
        poke_type2.innerText = `${type2}`;
        poke_type2.classList.add(`type-${type2}`);
      } else {
        poke_type2.innerText = '';
      }
      poke_img.src = url !== null ? url : 'assets/temp.png';
      poke_mask.setAttribute('id', name);

      list_container.appendChild(newTile);
    }
    let masks = document.querySelectorAll('.name-mask');
    masks.forEach(tile => tile.addEventListener('click', e => {
      specimon = e.target.id;
      show_spotlight(specimon);
    }));
    show_count();
  } else {
    list_container.classList.remove('list-grid');

    const no_display = document.importNode(no_display_template.content, true);
    list_container.appendChild(no_display);
    clear_count();
  }
  ctrl_handler();
}

const load_data = () => {
  let pokemon = localStorage.getItem('pokemon');
  return dataBase = JSON.parse(pokemon);
}

const load_data2 = () => {
  let ability = localStorage.getItem('abilities');
  return dataBase2 = JSON.parse(ability);
}

let dataBase = [];
let dataBase2 = [];
const initialize = () => {
  if (!localStorage.getItem('pokemon')) {
    getPrimaryList()
    .then(list => {
      localStorage.setItem(`pokemon`, JSON.stringify(list));
      load_data();
      displayItems();
      ctrl_handler();
      getAbilityList()
      .then(list => {
        localStorage.setItem('abilities', JSON.stringify(list));
        load_data2();
      })
    })
  } else {
    load_data();
    load_data2();
    displayItems();
    ctrl_handler();
  }
}

let btn1 = document.getElementById('btn-right');
let btn2 = document.getElementById('btn-left');

function next_page() {
  let pages = Math.ceil(results_num / 12) - 1;
  if (page < pages) {
      page++;
      displayItems();
  }
}

function previous_page() {
  if (page > 0) {
      page--;
      displayItems();
  }
}

function ctrl_handler() {
  let pages = Math.ceil(results_num / 12) - 1;
  pageNum.innerHTML = page + 1;
  if (page == 0) {
    btn2.classList.add('disabled');
    btn1.classList.remove('disabled');
    if (results_num == 0) {
      btn1.classList.add('disabled');
    }
  } else if (results_num > 12 && page > 0 && page < pages) {
    btn1.classList.remove('disabled');
    btn2.classList.remove('disabled');
  } else if (page == pages) {
    btn1.classList.add('disabled');
    btn2.classList.remove('disabled');
  }
}

function search_list() {
  displayItems();
  page = 0;
  pageNum.innerHTML = page + 1;
  ctrl_handler();
}

function clear_search() {
  let search_field = document.getElementById('search');
  search_field.value = '';
  page = 0;
  displayItems();
}

let type_list = [];
const filter_type_fields = document.querySelectorAll('.type-filter-name');
filter_type_fields.forEach(item => item.addEventListener('click', (e) => {
  if (!type_list.includes(e.target.id)) {
    e.target.classList.toggle('type-select');
    type_list.push(e.target.id);
    if (type_list.length > 2) {
      let type_override = document.getElementById(type_list[0]);
      type_override.classList.toggle('type-select');
      type_list.shift();
    }
  } else {
    e.target.classList.remove('type-select');
    type_list.splice(type_list.indexOf(e.target.id), 1);
  } 
  console.log(type_list)
}));

let filter_list = [];
const apply_filter = () => {
  let filter_type_input = document.querySelectorAll('.type-select');
  let filter_types = Array.from(filter_type_input).map(item => item.innerText.toLowerCase());
  let filter_game_input = document.querySelectorAll('.game-select');
  let filter_games = Array.from(filter_game_input).map(item => item.innerText.toLowerCase());
  filter_list = [];
  if (filter_types.length > 0) {
    if (filter_types.length == 1) {
      dataBase.forEach(item => {
        if (item.type.some(elem => filter_types.includes(elem))) {
          filter_list.push(item);
        }
      });
      filterApplied = true;
    } else if (filter_types.length == 2) {
      filter_list = [];
      dataBase.forEach(item => {
        if (item.type.every(elem => filter_types.includes(elem))) {
          filter_list.push(item);
        }
      });
      filterApplied = true;
    }
  } 
  if (filter_games.length > 0) {
    if (filter_list.length > 0) {
      let temp_list = [];
      filter_list.forEach(item => {
        if (item.game.some(elem => filter_games.includes(elem)))
        temp_list.push(item);
      });
      filter_list = temp_list;
      filterApplied = true;
    } else if (filter_list.length == 0 && filter_types.length > 0) {
      filterApplied = true;
    } else {
      filter_list = [];
      dataBase.forEach(item => {
        if (item.game.some(elem => filter_games.includes(elem))) {
          filter_list.push(item);
        }
      });
      filterApplied = true;
    }
  }
  page = 0;
  console.log(filter_list);
  displayItems();
}

const clear_type_filter = () => {
  let filter_type_input = document.querySelectorAll('.type-select');
  filter_type_input.forEach(item => {
    item.classList.remove('type-select');
  });
  type_list = [];
  filterApplied = false;
}

let game_list = [];
const filter_game_fields = document.querySelectorAll('.game-filter-name');
filter_game_fields.forEach(item => item.addEventListener('click', (e) => {
  if (!game_list.includes(e.target.id)) {
    e.target.classList.toggle('game-select');
    game_list.push(e.target.id);
  } else {
    e.target.classList.remove('game-select');
    game_list.splice(game_list.indexOf(e.target.id), 1);
  } 
  console.log(game_list);
}));

const clear_game_filter = () => {
  let filter_game_input = document.querySelectorAll('.game-select');
  filter_game_input.forEach(item => {
    item.classList.remove('game-select');
  });
  game_list = [];
  filterApplied = false;
}

const clear_all_filters = () => {
  clear_type_filter();
  clear_game_filter();
  page = 0;
  displayItems();
}

const adv_search_field = document.querySelector('.filter-bar');
const adv_search_mark = document.querySelector('.show-adv');
const show_adv_search = () => {
  adv_search_field.classList.toggle('hidden');
  adv_search_mark.classList.toggle('fa-chevron-circle-down');
  adv_search_mark.classList.toggle('fa-chevron-circle-up');
  clear_all_filters();
}

const close_modal = () => {
  spotlight.classList.toggle('hidden')
} 

initialize();