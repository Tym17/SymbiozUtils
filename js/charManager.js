const mysql = require('mysql2');
const db = require('../dbconf.json');
const fs = require('fs');
const navigator = require('./navigator');
const utilities = require('./utilities');
const fixtures = require('./fixtures');

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
                if (err) {
                    navigator.navigate('error', { error: err });
                    return;
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

    goToEdit: function () {
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
                    navigator.navigate('error', { error: err });
                    return;
                } else if (results.length === 0) {
                    navigator.navigate('error', { error: 'No character found' });
                    return;
                }

                navigator.navigate('charpage', {
                    char: results[0],
                    _callback: function () {
                        utilities.updateNumber('Kamas');
                        utilities.updateNumber('SpellPoints');
                        utilities.updateNumber('StatsPoints');
                    }
                });
            }
        );
    },

    toFM: function () {
        let uid = id('uid').value;

        navigator.navigate('itemfinder', {
            char: {
                Id: uid
            },
            _callback: function () {
                let selector = id('selector');

                const con = mysql.createConnection({
                    host: db.host,
                    user: db.user,
                    password: db.password,
                    database: db.symbioz.world
                });

                let query = fs.readFileSync(__dirname + '/../sql/get_char_items.sql', 'utf8');

                con.query(query,
                    [uid, fixtures.getWearableItemTypes()],
                    (err, results, fields) => {
                console.log(results);

                        results.forEach(r => {
                            let opt = document.createElement('option');
                            opt.value = r.UId;
                            opt.innerHTML = r.Name;
                            selector.appendChild(opt);
                        })
                    }
                );

            }
        })
    },

    update: function () {
        let Kamas = id('Kamas').value.split(' ').join('');
        let SpellPoints = id('SpellPoints').value.split(' ').join('');
        let StatsPoints = id('StatsPoints').value.split(' ').join('');
        let SpawnPointMapId = id('SpawnPointMapId').value;
        let uid = id('uid').value;

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.world
        });

        let query = fs.readFileSync(__dirname + '/../sql/update_char.sql', 'utf8');

        con.execute(query,
            [Kamas, SpellPoints, StatsPoints, SpawnPointMapId, uid],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', { error: err });
                    return;
                }
                navigator.navigate('charfinder', { success: 'Updated' });
            }
        );
    }

}

module.exports = charManager;