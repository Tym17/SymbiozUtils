const mysql = require('mysql2');
const db = require('../dbconf.json');
const fs = require('fs');
const navigator = require('./navigator');

let charManager = {

    find: function () {
        let search = '%' + id('search').value + '%';
        let selector = id('selector');
        selector.innerHTML = '';

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.world
        });

        let query = fs.readFileSync(__dirname + '/../sql/find_char.sql', 'utf8');

        con.execute(query,
            [search],
            (err, results, fields) => {
                console.log(results);
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                }
                results.forEach(x => {
                    let opt = document.createElement('option');
                    opt.value = x.Id;
                    opt.innerHTML = x.Name;
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
            database: db.symbioz.world
        });

        let query = fs.readFileSync(__dirname + '/../sql/get_char.sql', 'utf8');

        con.execute(query,
            [selected],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                } else if (results.length === 0) {
                    navigator.navigate('error', {error: 'No character found'});
                    return ;
                }
                
                navigator.navigate('charpage', {
                    char: results[0]
                });
            }
        );
    },

    // TODO
    update: function() {
        /**
         * Kamas
         * SpellPoints
         * StatsPoints
         * SpawnPointMapId
         */
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

module.exports = charManager;