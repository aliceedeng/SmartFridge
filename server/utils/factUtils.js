const units = ['AM1', 'AM2'];
const amounts = ['GP1', 'GP2'];

const upperFacts = ['CALORIES', 'CHOLESTEROL', 'SUGAR', 'PROTEIN', 'SODIUM'];
const lowerFacts = upperFacts.map((name) => (name.toLowerCase()));

const initializeFacts = function(rid) {
    return (
    {
        rid: rid,
        sugar: 0,
        cholesterol: 0,
        protein: 0,
        calories: 0,
        sodium: 0
    });
};

const getMultiplier = function(ingredient) {
    let multiplier = 1;
    // check whether unit is not null
    if (ingredient['UNIT']) {
        // if not, check whether each household weight matches
        for (let i = 0; i < units.length; i++) {
            const unit = units[i]; // grab the key of the current weight
            if (ingredient[unit]) {
                console.log('contains unit');
                console.log(ingredient[unit]);
                console.log(ingredient['UNIT']);
                // if the current unit is defined, check whether
                // the named unit is contained in the current unit
                if (ingredient[unit].includes(ingredient['UNIT'])) {
                    console.log('all the way');
                    // if so, set multiplier to numGrams for current unit / 100
                    multiplier = ingredient[amounts[i]] / 100.0;
                }
            }
        }
    }
    // finally, if a qty is defined scale multiplier by the qty
    if (ingredient['QTY']) {
        multiplier = multiplier * ingredient['QTY'];
    }

    return multiplier;
};

module.exports = {
    initializeFacts: initializeFacts,
    getMultiplier: getMultiplier,
    upperFacts: upperFacts,
    lowerFacts: lowerFacts
};