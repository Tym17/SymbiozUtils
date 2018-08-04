

let utilities = {

    updateNumber: function (eid) {
        let e = id(eid);
        let val = e.value.split(' ').join('');
        e.value = val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

module.exports = utilities;