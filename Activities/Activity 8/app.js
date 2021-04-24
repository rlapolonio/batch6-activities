let accounts = [];
let admins = [];
let transactions = [];
let number = 0;

function Account(user, balance) {
    this.user = user;
    this.balance = Number(balance);
    gen_num();
    this.number = String(number);
}

function gen_num() {
    number = Math.ceil(Math.random() * 900000) + 7000000;
    for (const acct of accounts) {
        if (acct.number === number) {
            gen_num();
        } else {
            return number;
        }
    }
}

function create_user(user, balance = 0) {
    if (!check_name(user)) {
        return `Please check inputs.`;
    }
    if (get_user(user)) {
        return `user_already_exists`;
    }
    let xUser = user.toUpperCase();
    accounts.push(new Account(xUser, balance));
    yy = 0;
    sort_name();
    display_users();
    return accounts;
}

function delete_user(user) {
    let user1 = user.toUpperCase();
    if (!check_name(user1)) {
        return `Please check inputs.`;
    }
    accounts.splice(accounts.indexOf(get_user(user1)), 1);
    return `Account of ${user} has been deleted.`
}

function deposit(user, amount) {
    let user1 = user.toUpperCase();
    if (!check_args(user1, amount)) {
        return `Please check inputs.`;
    }
    if (get_user(user1)) {
        get_user(user1).balance += amount;
        if (!get_user(user1).hasOwnProperty('transactions')) {
            get_user(user1).transactions = [];
            get_user(user1).transactions.push(`DEPOSIT: + ${formatter.format(amount)}`);
        } else {
            get_user(user1).transactions.push(`DEPOSIT: + ${formatter.format(amount)}`)
        }
        let message = `+ DEPOSIT: ${user1} + ${formatter.format(amount)} > (${get_balance(user1)})`;
        transactions.push(message);
        return `New balance of ${user1} is ${get_balance(user1)}`;
    }
    return `user_does_not_exist`;
}

function withdraw(user, amount) {
    let user1 = user.toUpperCase();
    if (!check_args(user1, amount)) {
        return `Please check inputs.`;
    };
    if (get_user(user1)) {
        if (get_user(user1).balance < amount) {
            return `not_enough_money`;
        } else {
            get_user(user1).balance -= amount;
            if (!get_user(user1).hasOwnProperty('transactions')) {
                get_user(user1).transactions = [];
                get_user(user1).transactions.push(`WITHDRAW: - ${formatter.format(amount)}`);
            } else {
                get_user(user1).transactions.push(`WITHDRAW: - ${formatter.format(amount)}`)
            }
            let message = `- WITHDRAW: ${user1} - ${formatter.format(amount)} > (${get_balance(user1)})`;
            transactions.push(message);
            return `New balance of ${user1} is ${get_balance(user1)}`;
        }
    } else {
        return `user_does_not_exist`;
    }
}

function send(from_user, to_user, amount) {
    let user1 = from_user.toUpperCase();
    let user2 = to_user.toUpperCase();
    if (!check_args(user1, amount)) {
        return `Please check inputs.`;
    };
    if (!check_name(user2)) {
        console.log(`${user2} is an invalid user name.`);
        return `Please check inputs.`;
    }
    if (get_user(user1).balance < amount) {
        return `not_enough_money`;
    }
    let i = 0;
    if (get_user(user1)) {
        get_user(user1).balance -= amount;
        i++;
    }
    if (get_user(user2)) {
        get_user(user2).balance += amount;
        i++;
    }
    if (i == 2) {
        if (!get_user(user1).hasOwnProperty('transactions')) {
            get_user(user1).transactions = [];
            get_user(user1).transactions.push(`TRANSFER: - ${formatter.format(amount)} (${user2})`);
        } else {
            get_user(user1).transactions.push(`TRANSFER: - ${formatter.format(amount)} (${user2})`);
        }
        if (!get_user(user2).hasOwnProperty('transactions')) {
            get_user(user2).transactions = [];
            get_user(user2).transactions.push(`TRANSFER: + ${formatter.format(amount)} (${user1})`);
        } else {
            get_user(user2).transactions.push(`TRANSFER: + ${formatter.format(amount)} (${user1})`);
        }
        let message = `- TRANSFER: ${user1} - ${formatter.format(amount)} > (${get_balance(user1)}), ${user2} (${get_balance(user2)})`;
        transactions.push(message);
        return `Succesful transaction! New balance: ${user1} = ${get_balance(user1)}, ${user2} = ${get_balance(user2)} `;
    }
}

function get_balance(user) {
    let user1 = user.toUpperCase();
    if (get_user(user1)) {
        return formatter.format(get_user(user1).balance);
    }
}

let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP'
});

function get_user(user) {
    let user1 = user.toUpperCase();
    if (accounts.length > 0) {
        for (const acct of accounts) {
            if (acct.user === user1) {
                return acct;
            }
        }
    } else { return false }
}

function list_users() {
    return accounts;
}

function check_name(name) {
    let syms = /[|\\/~^:;?!&%$@*+]/;
    if (name.match(syms)) {
        return false;
    } else if (name[0] === ',') {
        return false;
    }
    return true;
}

function check_amount(amt) {
    if (amt < 0) {
        return false;
    } return true;
}

function check_args(name, amt) {
    let x = 0;
    if (!check_name(name)) {
        console.log(`${name} is an invalid user name.`);
        x++;
    }
    if (!check_amount(amt)) {
        console.log(`${amt} is an invalid amount.`);
        x++;
    }
    if (x > 0) {
        return false;
    }
    return true;
}

function store_userData() {
    localStorage.setItem(`accounts`, JSON.stringify(accounts));
    console.log(`current user database stored to local storage.`);
    return localStorage;
}

function load_userData() {
    temp_store(accounts);
    let acct = localStorage.getItem(`accounts`);
    let tempStore = JSON.parse(acct);
    for (const acct of tempStore) {
        accounts.push(acct);
    }
    console.log(`user database loaded from local storage.`);
    temp_load(accounts);
    yy = 0;
    sort_name();
    display_users();
    return accounts;
}

let j = 0;
let temp = [];
function temp_store(arr) {
    j = 0;
    if (arr.length > 0) {
        temp = [];
        for (let i = 0; i < arr.length; i++) {
            temp.push(deepCopyFunction(arr[0]));
            arr.splice(0,1)
        }
        j++;
    }
}

function temp_load(arr) {
    if (j > 0) {
        for (const item of temp) {
            arr.push(item);
        }
    }
}

const deepCopyFunction = (inObject) => { // deep copy the array
    let outObject, value, key
    if (typeof inObject !== "object" || inObject === null) {
      return inObject
    }
    outObject = Array.isArray(inObject) ? [] : {}
    for (key in inObject) {
      value = inObject[key]
      outObject[key] = deepCopyFunction(value)
    }
    return outObject
}

function clear_userData() {
    localStorage.removeItem('accounts');
    console.log(`user database in local storage cleared.`);
    return localStorage;
}

let num_filter = document.getElementById('num-filter');
let name_filter = document.getElementById('name-filter');
let bal_filter = document.getElementById('bal-filter');

let yy = 0;
function sort_name(){
    accounts.sort((a,b) => {
        let nA = a.user.toLowerCase();
        let nB = b.user.toLowerCase();

        if (nA < nB) { return yy == 0 ? -1 : 1;}
        if (nA > nB) { return yy == 0 ? 1 : -1;}
        return 0;
    })
    yy = yy == 0 ? 1 : 0;
    display_users(); 
    num_filter.classList.remove('active');
    bal_filter.classList.remove('active');
    name_filter.classList.add('active');
    return accounts;
}

let bb = 0;
function sort_balance() {
    bb == 0 ? accounts.sort((a,b) => a.balance - b.balance) : accounts.sort((a,b) => b.balance - a.balance);
    bb = bb == 0 ? 1 : 0;
    display_users();
    num_filter.classList.remove('active');
    bal_filter.classList.add('active');
    name_filter.classList.remove('active');
    return accounts;
}

let zz = 0;
function sort_number() {
    zz == 0 ? accounts.sort((a,b) => a.number - b.number) : accounts.sort((a,b) => b.number - a.number);
    zz = zz == 0 ? 1 : 0;
    display_users();
    num_filter.classList.add('active');
    bal_filter.classList.remove('active');
    name_filter.classList.remove('active');  
    return accounts;
}

function filter_list() {
    display_users();
    page = 0;
    pageNum.innerHTML = page + 1;
    ctrl_handler();
}

function clear_search() {
    let search_field = document.getElementById('search');
    search_field.value = '';
    display_users();
}

function Admin(user, password) {
    this.user = user;
    this.password = password;
}

function create_admin(user, password) {
    admins.push(new Admin(user, password));
    return admins;
}

let display = document.querySelector('.account-display');

let page = 0;
function display_users() {
    clear_display();
    let accounter = document.querySelector('.accounts-status');
    accounter.innerHTML = accounts.length > 0 ? `Total Accounts in Database: ${accounts.length}` : `Total Accounts in Database: 0`;
    let displayItems = [];
    let filterItems = [];
    let search_input = document.getElementById('search');
    let search_text = search_input.value.toUpperCase();
    if (search_input.value === '') {
        if (accounts.length <= 20) {
            displayItems = accounts;
        } else {
            let y = page * 20;
            let z = accounts.length - y > 20 ? y + 20 : accounts.length;
            for (let x = y; x < z; x++) {
                displayItems.push(accounts[x]);
            }
        } 
    } else {
        filterItems = accounts.filter(acct => {
            return (acct.user.includes(search_text) || acct.number.includes(search_text));
        });
        if (filterItems.length <= 20) {
            displayItems = filterItems;
        } else {
            let y = page * 20;
            let z = filterItems.length - y > 20 ? y + 20 : filterItems.length;
            for (let x = y; x < z; x++) {
                displayItems.push(filterItems[x]);
            }
        } 
    }
    for (let d = 0; d < displayItems.length; d++) {
        let row = display.children[d];
        let acct = displayItems[d];
        let cell1 = document.createElement('div');
        let cell2 = document.createElement('div');
        let cell3 = document.createElement('div');
        cell1.setAttribute('class', 'acct-num');
        cell2.setAttribute('class', 'acct-name');
        cell3.setAttribute('class', 'acct-bal');
        cell1.innerHTML = acct.number;
        cell2.innerHTML = acct.user;
        cell3.innerHTML = formatter.format(acct.balance);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
    }
}

let pageNum = document.getElementById('page-num');

function next_page() {
    let pages = Math.ceil(accounts.length / 20) - 1;
    if (page < pages) {
        page++;
        pageNum.innerHTML = page + 1;
        display_users();
        ctrl_handler();
    }
}

function previous_page() {
    if (page > 0) {
        page--;
        pageNum.innerHTML = page + 1;
        display_users();
        ctrl_handler();
    }
}

let btn1 = document.getElementById('btn-right');
let btn2 = document.getElementById('btn-left');

function ctrl_handler() {
    let pages = Math.ceil(accounts.length / 20) - 1;
    if (page == 0) {
        btn2.classList.add('disabled');
    } else if (page > 0 && page < pages) {
        btn1.classList.remove('disabled');
        btn2.classList.remove('disabled');
    } else if (page == pages) {
        btn1.classList.add('disabled')
    }
    if (accounts.length == 0) {
        btn1.classList.add('disabled');
        btn2.classList.add('disabled');
    } else if (accounts.length > 20 && page < pages) {
        btn1.classList.remove('disabled');
    }
}

function clear_display() {
    let rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        while (row.firstChild) {
            row.removeChild(row.firstChild);
        }
    });
}

let modal_window = document.getElementById('modal-wrapper');
let create_user_window = document.getElementById('add-user');
let trans_window = document.getElementById('trans-window');
let error_window = document.getElementById('error-wrapper');
let history_window = document.getElementById('history');

function show_create_user() {
    modal_window.classList.remove('hidden');
    create_user_window.classList.remove('hidden');
    let new_user = document.getElementById('new-acct-name');
    let new_balance = document.getElementById('new-acct-balance');
    new_user.value = '';
    new_balance.value = null;
}

let deposit_window = document.querySelector('.deposit-window');
let withdraw_window = document.querySelector('.withdraw-window');
let transfer_window = document.querySelector('.transfer-window');
let acct_history = document.querySelector('.account-history');

let history_header = document.querySelector('.acct-history-header');
let history_details = document.querySelector('.acct-history-details');
let history_items = document.querySelectorAll('.acct-history-item');

function show_trans() {
    show_deposit();
    modal_window.classList.remove('hidden');
    trans_window.classList.toggle('hidden');
    acct_history.classList.toggle('hidden');
    let current_bals = document.querySelectorAll('.current-bal');
    let delete_btn = document.getElementById('delete-btn');
    for (const bal of current_bals) {
        bal.innerHTML = '';
    }
    if (specified_user != '') {
        delete_btn.classList.remove('disabled');
        clear_acct_history();
        for (const bal of current_bals) {
            bal.innerHTML = `Current Account Balance is ${get_balance(specified_user)}`;
        }
        if (get_user(specified_user).hasOwnProperty('transactions')) {
            acct_history.classList.remove('hidden');
            let user_trans_length = get_user(specified_user).transactions.length;
            history_header.innerHTML = `Latest Transactions:`
            if (user_trans_length > 5) {
                for (let c = 0; c < 5; c++) {
                    history_details.children[c].innerHTML = `${get_user(specified_user).transactions[user_trans_length - 1 - c]}`;
                }
            } else {
                for (let c = 0; c < user_trans_length; c++) {
                    history_details.children[c].innerHTML = `${get_user(specified_user).transactions[user_trans_length - 1 - c]}`;
                }
            }
        } else {
            acct_history.classList.add('hidden');
        }
    } else {
        acct_history.classList.add('hidden');
    }
}

function clear_acct_history() {
    for (const item of history_items) {
        item.innerHTML = '';
    }
}

let depo_tab = document.getElementById('depo-tab');
let with_tab = document.getElementById('with-tab');
let tran_tab = document.getElementById('tran-tab');

function show_deposit() {
    list_gen('depo-select');
    deposit_window.classList.add('active-window');
    withdraw_window.classList.remove('active-window');
    transfer_window.classList.remove('active-window');
    depo_tab.classList.add('active-tab');
    with_tab.classList.remove('active-tab');
    tran_tab.classList.remove('active-tab');
}

function show_withdraw() {
    list_gen('with-select');
    deposit_window.classList.remove('active-window');
    withdraw_window.classList.add('active-window');
    transfer_window.classList.remove('active-window');
    depo_tab.classList.remove('active-tab');
    with_tab.classList.add('active-tab');
    tran_tab.classList.remove('active-tab');
}

function show_transfer() {
    list_gen('from-select');
    list_gen('tooo-select');
    deposit_window.classList.remove('active-window');
    withdraw_window.classList.remove('active-window');
    transfer_window.classList.add('active-window');
    depo_tab.classList.remove('active-tab');
    with_tab.classList.remove('active-tab');
    tran_tab.classList.add('active-tab');
}

let login_window = document.getElementById('log-in');
let reg_window = document.getElementById('register');

function show_register() {
    reg_window.classList.remove('hidden');
    login_window.classList.add('hidden');
    let new_admin = document.getElementById('admin-reg');
    let new_pass = document.getElementById('admin-pass-reg');
    new_admin.value = '';
    new_pass.value = '';
}

let current_bal = null;
function list_gen(container) {
    yy = 0;
    sort_name();
    clear_list(container);
    let code = container[0] + container[1] + container[2] + container[3]; 
    let list_container = document.querySelector(`.${container}`);
    let select = document.createElement('select');
    select.name = container + '-user';
    select.id = container + '-user';
    let select_Id = select.id;

    if (accounts.length > 0) {
        for (const acct of accounts) {
            let option = document.createElement('option');
            option.value = acct.user;
            option.text = acct.user;
            select.appendChild(option);
        }
    }

    let label = document.createElement('label');
    label.innerHTML = 'Account Name: ';
    label.htmlFor = `${code}-user`;

    list_container.appendChild(label);
    list_container.appendChild(select);

    select.addEventListener('click', () => {
        let selectElement = document.getElementById(select_Id);
        let user = selectElement.value;
        current_bal = get_balance(user);
        let balance_field = document.getElementById(`${code}-bal`);
        balance_field.innerHTML = `Current Account Balance is ${current_bal}`;
        acct_history.classList.add('hidden');
        clear_acct_history();
        if (get_user(user).hasOwnProperty('transactions')) {
            acct_history.classList.remove('hidden');
            let user_trans_length = get_user(user).transactions.length;
            history_header.innerHTML = `Latest Transactions:`
            if (user_trans_length > 5) {
                for (let c = 0; c < 5; c++) {
                    history_details.children[c].innerHTML = `${get_user(user).transactions[user_trans_length - 1 - c]}`;
                }
            } else {
                for (let c = 0; c < user_trans_length; c++) {
                    history_details.children[c].innerHTML = `${get_user(user).transactions[user_trans_length - 1 - c]}`;
                }
            }
        } else {
            acct_history.classList.add('hidden');
        }
    });
    if (specified_user != '') {
        select.value = specified_user;
    }
}

function clear_list(container) {
    let list = document.querySelectorAll(`.${container}`);
    list.forEach(item => {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    });
}

let confirm_window = document.getElementById('confirm-wrapper');
let confirm_header = document.querySelector('.confirm-header');
let confirm_details = document.querySelector('.confirm-details');

let operation = 0;

function confirm_new_user() {
    operation = 1;
    min_amount = 0;
    let new_user = document.getElementById('new-acct-name').value;
    let new_balance = Number(document.getElementById('new-acct-balance').value);
    if (new_user === '' || !check_name(new_user) ||
        !check_amount(new_balance)) {
        error_window.classList.remove('hidden');
        let error_details = document.querySelector('.error-details');
        error_details.innerHTML = '';
        if (!check_name(new_user)) {
            error_details.innerHTML += `- ${new_user} is an invalid user name. Please refrain from using symbols: |\/~^:;?!&%$@*+.<br>`;
        }
        if (!check_amount(new_balance)) {
            error_details.innerHTML += `- (${new_balance}) is an invalid amount. Please enter a value greater than 0.<br>`
        }
        if (new_user === '') {
            error_details.innerHTML += `- Please enter an account name.<br>`
        }
    } else {
        confirm_window.classList.toggle('hidden');
        confirm_header.innerHTML = '';
        confirm_header.innerHTML = `Confirm New Account Details:`;
        confirm_details.innerHTML = '';
        confirm_details.innerHTML =
        `<b>Account Name:</b> ${new_user}<br>
        <b>Account Balance:</b> ${formatter.format(new_balance)}`;
    }
}

function specify_error(name1, amount=0, name2 =''){
    error_window.classList.remove('hidden');
    let error_details = document.querySelector('.error-details');
    error_details.innerHTML = '';
    if (!check_name(name1)) {
        error_details.innerHTML += `- ${name1} is an invalid user name. Please refrain from using symbols: |\/~^:;?!&%$@*+.<br>`;
    }
    if (!check_amount(amount)) {
        error_details.innerHTML += `- (${amount}) is an invalid amount. Please enter a value greater than 0.<br>`
    }
    if (get_user(name1) === get_user(name2)) {
        error_details.innerHTML += `- Sender and Receiver are the same.<br>`
    }
    if (get_user(name1) && get_user(name1).balance < amount) {
        error_details.innerHTML += `- Insufficient balance.<br>`
    }
    if (amount < min_amount) {
        error_details.innerHTML += `- Minimum amount for this transaction is PHP ${min_amount}.00.<br>`
    }
    if (name1 === '') {
        error_details.innerHTML += `- Please choose an account.<br>`
    }
}

function confirm_load() {
    operation = 2;
    confirm_window.classList.toggle('hidden');
    confirm_header.innerHTML = '';
    confirm_header.innerHTML = `Confirm Action`;
    confirm_details.innerHTML = '';
    confirm_details.innerHTML = 'Load User Data from LocalStorage?';
}

function confirm_deposit() {
    operation = 3;
    min_amount = 1;
    let user = document.getElementById('depo-select-user').value;
    let amount = Number(document.getElementById('depo-amount').value);
    let new_bal = get_user(user).balance + amount;
    if (!check_args(user, amount) || amount < min_amount) {
        specify_error(user, amount);
    } else {
        confirm_window.classList.toggle('hidden');
        confirm_header.innerHTML = '';
        confirm_header.innerHTML = `Confirm Deposit Details:`;
        confirm_details.innerHTML = '';
        confirm_details.innerHTML =
        `<b>Account Name:</b> ${user}<br>
        <b>Deposit Amount:</b> ${formatter.format(amount)}<br>
        <b>New Account Balance:</b> ${formatter.format(new_bal)}`;
    }
}

let min_amount = 0;
function confirm_withdraw() {
    operation = 4;
    min_amount = 200;
    let user = document.getElementById('with-select-user').value;
    let amount = Number(document.getElementById('with-amount').value);
    let new_bal = get_user(user).balance - amount;
    if (!check_args(user, amount) || get_user(user).balance < amount ||
        amount < min_amount) {
        specify_error(user, amount);
    } else {
        confirm_window.classList.toggle('hidden');
        confirm_header.innerHTML = '';
        confirm_header.innerHTML = `Confirm Withdrawal Details:`;
        confirm_details.innerHTML = '';
        confirm_details.innerHTML =
        `<b>Account Name:</b> ${user}<br>
        <b>Withdrawal Amount:</b> ${formatter.format(amount)}<br>
        <b>New Account Balance:</b> ${formatter.format(new_bal)}`;
    }
}

function confirm_transfer() {
    operation = 5;
    min_amount = 200;
    let from_user = document.getElementById('from-select-user').value;
    let to_user = document.getElementById('tooo-select-user').value;
    let amount = Number(document.getElementById('from-amount').value);
    let new_bal1 = get_user(from_user).balance - amount;
    let new_bal2 = get_user(to_user).balance + amount;
    if (!check_args(from_user, amount) || get_user(from_user).balance < amount || 
        get_user(from_user) === get_user(to_user) || amount < min_amount) {
        specify_error(from_user, amount, to_user);
    } else {
        confirm_window.classList.toggle('hidden');
        confirm_header.innerHTML = '';
        confirm_header.innerHTML = `Confirm Transfer Details:`;
        confirm_details.innerHTML = '';
        confirm_details.innerHTML =
        `<b>Sender Account Name:</b> ${from_user}<br>
        <b>Transfer Amount:</b> ${formatter.format(amount)}<br>
        <b>New Account Balance:</b> ${formatter.format(new_bal1)}<br>
        <b>Receiver Account Name:</b> ${to_user}<br>
        <b>New Account Balance:</b> ${formatter.format(new_bal2)}`;
    }
}

function confirm_register() {
    operation = 6;
    let new_admin = document.getElementById('admin-reg').value;
    let new_admin_pass = document.getElementById('admin-pass-reg').value;
    if (new_admin === '' || new_admin_pass === '') {
        error_window.classList.remove('hidden');
        let error_details = document.querySelector('.error-details');
        error_details.innerHTML = '';
        if (new_admin === '') {
            error_details.innerHTML += `Please enter a username.<br>`;
        }
        if (new_admin_pass === '') {
            error_details.innerHTML += `Please enter a password.<br>`;
        }
    } else {
        confirm_window.classList.toggle('hidden');
        confirm_header.innerHTML = '';
        confirm_header.innerHTML = `Confirm New Admin Account:`;
        confirm_details.innerHTML = '';
        confirm_details.innerHTML =
        `Admin Account Name: ${new_admin}<br>
        Admin Account Password: ${new_admin_pass}`;
    }
}

function confirm_delete() {
    operation = 7;
    confirm_window.classList.toggle('hidden');
    confirm_header.innerHTML = '';
    confirm_header.innerHTML = `Confirm Account Deletion`;
    confirm_details.innerHTML = '';
    confirm_details.innerHTML =
    `Account Name: ${specified_user}`;
}

function check_admin() {
    let admin_user = document.getElementById('admin-login').value;
    let admin_pass = document.getElementById('admin-pass').value;
    if (admins.length > 0) {
        if (admins.some(admin => admin.user === admin_user)) {
            for (const admin of admins) {
                if (admin.user === admin_user && admin.password === admin_pass) {
                    let admin_welcome = document.querySelector('.admin-welcome');
                    modal_window.classList.add('hidden');
                    login_window.classList.add('hidden');
                    admin_welcome.innerHTML = `Welcome, ${admin_user}`
                    display_users();
                    return 'login successful';
                }
            }
            error_window.classList.remove('hidden');
            let error_details = document.querySelector('.error-details');
            error_details.innerHTML = '';
            error_details.innerHTML = `Wrong password.`;
        } else {
            error_window.classList.remove('hidden');
            let error_details = document.querySelector('.error-details');
            error_details.innerHTML = '';
            error_details.innerHTML = `Admin Account Username doesn't exist.`;
        }
    } else {
        error_window.classList.remove('hidden');
        let error_details = document.querySelector('.error-details');
        error_details.innerHTML = '';
        error_details.innerHTML = `No Admin Accounts on Database.`;
    }
}

function proceed_operation() {
    switch(operation) {
        case 1:
            let new_user = document.getElementById('new-acct-name').value;
            let new_balance = document.getElementById('new-acct-balance').value;
            create_user(new_user, new_balance);
            disable_handler();
            create_user_window.classList.toggle('hidden')
            modal_window.classList.toggle('hidden');
            confirm_window.classList.toggle('hidden');
            break;
        case 2:
            load_userData();
            disable_handler();
            confirm_window.classList.toggle('hidden');
            let loader = document.querySelector('.load_storage');
            loader.classList.add('disabled');
            break;
        case 3:
            let user1 = document.getElementById('depo-select-user').value;
            let amount1 = Number(document.getElementById('depo-amount').value);
            deposit(user1, amount1);
            yy = 0;
            sort_name();
            display_users();
            disable_handler();
            modal_window.classList.toggle('hidden');
            trans_window.classList.toggle('hidden');
            confirm_window.classList.toggle('hidden');
            break;
        case 4:
            let user2 = document.getElementById('with-select-user').value;
            let amount2 = Number(document.getElementById('with-amount').value);
            withdraw(user2, amount2);
            yy = 0;
            sort_name();
            display_users();
            disable_handler();
            modal_window.classList.toggle('hidden');
            trans_window.classList.toggle('hidden');
            confirm_window.classList.toggle('hidden');
            break;
        case 5:
            let user3 = document.getElementById('from-select-user').value;
            let user4 = document.getElementById('tooo-select-user').value;
            let amount3 = Number(document.getElementById('from-amount').value);
            send(user3, user4, amount3);
            yy = 0;
            sort_name();
            display_users();
            disable_handler();
            modal_window.classList.toggle('hidden');
            trans_window.classList.toggle('hidden');
            confirm_window.classList.toggle('hidden');
            break;
        case 6:
            let new_admin = document.getElementById('admin-reg').value;
            let new_admin_pass = document.getElementById('admin-pass-reg').value;
            create_admin(new_admin, new_admin_pass);
            modal_window.classList.remove('hidden');
            confirm_window.classList.add('hidden');
            reg_window.classList.add('hidden');
            login_window.classList.remove('hidden');
            break;
        case 7:
            delete_user(specified_user);
            modal_window.classList.toggle('hidden');
            trans_window.classList.toggle('hidden');
            confirm_window.classList.toggle('hidden');
            display_users();
            break;
    }
    acct_history.classList.add('hidden');
    specified_user = '';
    clear_list('depo-select');
    clear_list('with-select');
    clear_list('from-select');
    clear_list('tooo-select');
    depo_tab.classList.add('active-tab');
    with_tab.classList.remove('active-tab');
    tran_tab.classList.remove('active-tab');
    document.getElementById('depo-amount').value = null;
    document.getElementById('with-amount').value = null;
    document.getElementById('from-amount').value = null;
}

let account_display = document.querySelector('.account-display');

let specified_user = '';
account_display.addEventListener('click', (e) => {
    specified_user = '';
    if (e.target.hasChildNodes()) {
        let row = e.target.parentElement;
        let user = row.children[1].innerHTML;
        specified_user = user;
        show_trans();
    }
});

function close_modal_window() {
    modal_window.classList.add('hidden');
    trans_window.classList.add('hidden');
    create_user_window.classList.add('hidden');
    history_window.classList.add('hidden');
    acct_history.classList.add('hidden');
    depo_tab.classList.add('active-tab');
    with_tab.classList.remove('active-tab');
    tran_tab.classList.remove('active-tab');
    specified_user = '';
    display_users();
}

function close_register_window() {
    reg_window.classList.add('hidden');
    login_window.classList.remove('hidden');
}

function close_confirm_window() {
    confirm_window.classList.add('hidden');
}

function close_error_window() {
    error_window.classList.add('hidden');
}

function initialize() {
    disable_handler();
}

function disable_handler() {
    let new_trans_btn = document.getElementById('new-trans');
    let tran_tab = document.getElementById('tran-tab');
    
    if (accounts.length == 0) {
        new_trans_btn.classList.add('disabled');
        tran_tab.classList.add('disabled');
    } else if (accounts.length == 1) {
        new_trans_btn.classList.remove('disabled');
        tran_tab.classList.add('disabled');
    } else if (accounts.length > 1) {
        new_trans_btn.classList.remove('disabled');
        tran_tab.classList.remove('disabled');
    }
    ctrl_handler();
    history_handler();
}

let history_page = 0;
function show_history() {
    modal_window.classList.remove('hidden');
    history_window.classList.remove('hidden');
    let history_display = document.querySelector('.transaction-display');
    clear_display();
    if (transactions.length > 10) {
        for (let c = 0; c < 10; c++) {
            history_display.children[c].innerHTML = `${transactions[transactions.length - c - 1]}`;
        }
    } else {
        for (let c = 0; c < transactions.length; c++) {
            history_display.children[c].innerHTML = `${transactions[transactions.length - c - 1]}`;
        }
    }

}

function history_handler() {
    let history_btn = document.querySelector('.show_history');
    if (transactions.length == 0) {
        history_btn.classList.add('disabled');
    } else {
        history_btn.classList.remove('disabled')
    }
}

function log_out() {
    let admin_user = document.getElementById('admin-login');
    let admin_pass = document.getElementById('admin-pass');
    modal_window.classList.remove('hidden');
    login_window.classList.remove('hidden');
    admin_user.value = '';
    admin_pass.value = '';
}


initialize();
