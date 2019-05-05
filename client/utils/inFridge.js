// function that determines whether an ingredient with the given id is contained in the
// ingredient fridge
export default function (fridge, id) {
    if (id == null) {
        return false;
    }
    let index = fridge.map((ingredient) => (ingredient.id)).indexOf(id);

    return index !== -1;
}