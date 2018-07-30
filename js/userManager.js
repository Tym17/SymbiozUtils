const mysql = require('mysql2');
const db = require('../dbconf.json');
const navigator = require('./navigator');

let userManager = {

    create: function () {
        let accname = id('accname').value;
        let password = id('password').value;
        let nickname = id('nickname').value;
        let roleSelect = id('role');
        let role = roleSelect.options[roleSelect.selectedIndex].value;
        console.log(role);

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.auth
        });

        con.execute(
            'INSERT INTO accounts '
            + '(Username, Password, Nickname, Role, Banned, CharacterSlots, LastSelectedServerId, Votes, Points)'
            + ' VALUES(?, ?, ?, ?, False, 5, 30, 0, 0)',
            [accname, password, nickname, role],
            (err, results, fields) => {
                console.log(err);
                if (err) {
                    navigator.navigate('error', {error: err});
                    return ;
                }
                navigator.navigate('creator', {success: 'Created'});
            }
        )
    }

}

module.exports = userManager;