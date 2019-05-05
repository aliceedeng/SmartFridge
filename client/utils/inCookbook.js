// function that determines whether a recipe with the given rid
// is contained in the current cookbook
export default function (cookbook, rid) {
    if (rid == null) {
        return false;
    }
    let index = cookbook.map((recipe) => (recipe.rid)).indexOf(rid);

    return index !== -1;
}