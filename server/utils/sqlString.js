// generate a string representation of
// list of integers for use in sql queries
const numString = function(id) {
    let idString = '(';
    for (let i = 0; i < id.length; i++) {
        idString += id[i];
        if (i < (id.length - 1)) {
            idString += ', ';
        }
    }
    idString += ')';

    return idString;
}

// generate a string representation of
// list of strings for use in sql queries
const strString = function(id) {
    let idString = '(';
    for (let i = 0; i < id.length; i++) {
        idString = idString + `'` + id[i] + `'`;
        if (i < (id.length - 1)) {
            idString += ', ';
        }
    }
    idString += ')';

    return idString;
}

module.exports = {
    strString: strString,
    numString: numString
};