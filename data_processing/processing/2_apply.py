import argparse
import pickle
import pandas as pd
from fuzzywuzzy import fuzz
from fuzzywuzzy import process


def fuzzy_match(ing, ing_ser=None, comp=None):
    """
    Returns the id of a fuzzy usda ingredient match for a given 
    ingredient
    """
    if isinstance(ing, float):
        return "NOMATCH"
    extracted = process.extract(
        ing, ing_ser, processor=lambda x: x, scorer=comp, limit=50)
    top = extracted[0]
    if top[1] < 50:
        return "NOMATCH"
    elif top[1] == 100:
        ing_ser = []
        for match in extracted:
            if match[1] == 100:
                ing_ser.append(match[0])
            else:
                break
        if len(ing_ser) == 1:
            return ing_ser[0]
        else:
            print(ing_ser)
            return process.extractOne(ing, ing_ser, lambda x: x, scorer=fuzz.ratio)[0]
    else:
        return top[0]


def get_usda_id_map(names):
    ing_id_map = pd.Series(index=list(names.values) +
                           ['NOMATCH'], data=list(names.index.values) + ['-1'])
    drop = ~ing_id_map.index.duplicated(keep='first')
    ing_id_map = ing_id_map[drop]
    return ing_id_map


def peak(name_id_map, usda_names):
    """
    Prints a well formated visualization of the ingredient to usda ingredient relations
    """
    for key, val in name_id_map.items():
        name_match = 'NOMATCH' if val == -1 else usda_names.loc[val]
        print('%s : %s' % (key, name_match))


def main():
    """
    Loads an ingredient name subset and the usda dataframe and
    returns a dictionary mapping each ingredient name to a usda id
    """
    parser = argparse.ArgumentParser()
    parser.add_argument('--num', action='store', type=int, required=True)
    num = parser.parse_args().num
    # load ing subset and usda ingredients
    ing_path = 'data/join/%d.pkl' % num
    ings = pickle.load(open(ing_path, 'rb'))
    usda_path = 'data/join/usda.pkl'
    usda = pickle.load(open(usda_path, 'rb'))
    names = usda['desc']
    processed = names.apply(fuzz._process_and_sort)
    usda_id_map = get_usda_id_map(processed)
    name_id_map = {ing: usda_id_map[(fuzzy_match(
        fuzz._process_and_sort(ing), ing_ser=processed, comp=fuzz.token_set_ratio))] for ing in ings}
    peak(name_id_map, names)
    # save name_id_map
    out_path = 'data/join/%d_map.pkl' % num
    pickle.dump(name_id_map)


if __name__ == '__main__':
    main()
