const mysql = require('mysql2');
const db = require('../dbconf.json');
const fs = require('fs');
const navigator = require('./navigator');

let userManager = {

    create: function () {
        let accname = id('accname').value;
        let password = id('password').value;
        let nickname = id('nickname').value;
        let roleSelect = id('role');
        let role = roleSelect.options[roleSelect.selectedIndex].value;

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.auth
        });

        let query = fs.readFileSync(__dirname + '/../sql/create_user.sql', 'utf8');

        con.execute(query,
            [accname, password, nickname, role],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                }
                navigator.navigate('creator', {success: 'Created'});
            }
        );
    },

    find: function () {
        let search = '%' + id('search').value + '%';
        let selector = id('selector');
        selector.innerHTML = '';

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.auth
        });

        let query = fs.readFileSync(__dirname + '/../sql/find_user.sql', 'utf8');

        con.execute(query,
            [search, search],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                }
                results.forEach(x => {
                    let opt = document.createElement('option');
                    opt.value = x.Id;
                    opt.innerHTML = x.Username;
                    selector.appendChild(opt);
                });
            }
        );
    },

    goToEdit: function() {
        let selector = id('selector');
        let selected = selector.options[selector.selectedIndex].value;

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.auth
        });

        let query = fs.readFileSync(__dirname + '/../sql/get_user.sql', 'utf8');

        con.execute(query,
            [selected],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                } else if (results.length === 0) {
                    navigator.navigate('error', {error: 'No account found'});
                    return ;
                }
                
                navigator.navigate('user', {
                    user: results[0],
                    _callback: function() {
                        let sel = id('role').value = results[0].Role;
                    }
                });
            }
        );
    },

    update: function() {
        let accname = id('accname').value;
        let password = id('password').value;
        let nickname = id('nickname').value;
        let uid = id('uid').value;
        let roleSelect = id('role');
        let role = roleSelect.options[roleSelect.selectedIndex].value;

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.auth
        });

        let query = fs.readFileSync(__dirname + '/../sql/update_user.sql', 'utf8');

        con.execute(query,
            [accname, nickname, password, role, uid],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                }
                navigator.navigate('accfinder', {success: 'Updated'});
            }
        );
    }

}

module.exports = userManager;