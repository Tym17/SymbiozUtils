const mysql = require('mysql2');
const db = require('../dbconf.json');
const fs = require('fs');
const navigator = require('./navigator');
const Misbehave = require('misbehave');
const Prism = require('prismjs');
const remote = require('electron').remote;
const package = require('../package.json');

let itemManager = {

    goToEdit: function () {
        let selector = id('selector');
        let selected = selector.options[selector.selectedIndex].value;

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.world
        });

        let query = fs.readFileSync(__dirname + '/../sql/get_item_char.sql', 'utf8');

        con.execute(query,
            [selected],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', { error: err });
                    return;
                } else if (results.length === 0) {
                    navigator.navigate('error', { error: 'No item found' });
                    return;
                }

                navigator.navigate('itemeditor', {
                    item: results[0],
                    _callback: function () {
                        let code = document.querySelector('#code');
                        this.editoresque = new Misbehave(code,
                            {
                                oninput: (content) => {
                                    Prism.highlightElement(code);
                                    document.editedCode = content;
                                }
                            }
                        );
                        var pre = document.querySelector('#pre')
                        pre.onclick = function () {
                            code.focus();
                            return false;
                        };
                    }
                });
            }
        );
    },

    openEffects: function() {
        const BrowserWindow = remote.BrowserWindow;

        let popup = new BrowserWindow({
            width: 200,
            height: 130,
            frame: false,
            resizable: true,
            center: true,
            alwaysOnTop: true
        });

        if (package.config.debugmode) {
            popup.webContents.openDevTools();
        }

        popup.webContents.on('did-finish-load', () => {
            popup.show();
            popup.focus();
        });
        popup.loadFile('effects.html');
    },

    update: function () {
        let effects = document.editedCode;
        let uid = id('uid').value;

        const con = mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.symbioz.world
        });

        let query = fs.readFileSync(__dirname + '/../sql/update_item.sql', 'utf8');

        con.execute(query,
            [effects, uid],
            (err, results, fields) => {
                if (err) {
                    navigator.navigate('error', { error: err });
                    return;
                }
                navigator.navigate('charfinder', { success: 'Item succesfully FM\'d' });
            }
        );
    }

}

module.exports = itemManager;