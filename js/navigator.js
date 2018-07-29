const Mustache = require('mustache');
const fs = require('fs');

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
        });
    },

    makePath: function(args) {
        console.log(args);
    }
}

module.exports = Navigator;