const { shell, remote } = require('electron');
const Mustache = require('mustache');
const fs = require('fs');
const _ = require('lodash');

let Navigator = {

    navigate: function (place, args) {
        this.makePath(args);
        fs.readFile(`templates/${place}.html`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let rendered = Mustache.render(data, args);
            id('target').innerHTML = rendered;
            if (_.has(args, '_callback')) {
                args._callback();
            }
        });
    },

    makePath: function(args) {
        // If apps gets too complicated modify the link chain in the nav element here.
    },

    url: function(u) {
        shell.openExternal(u);
    },

    quit: function() {
        let window = remote.getCurrentWindow();
        window.close();
    },

    reduce: function() {
        let window = remote.getCurrentWindow();
        window.minimize();
    }
}

module.exports = Navigator;