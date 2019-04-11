"""
Combines recipes of each input into a single dictionary containing
many recipes
"""
import json
import pickle


def check(out):
    """
    Prints a few recipes from each src for visual spotcheck of functionality
    """
    counts = {'ar': 0,
              'fn': 0,
              'epi': 0}
    for recipe in out.values():
        if counts[recipe['src']] < 10:
            print(recipe)
            counts[recipe['src']] += 1


def main():
    """
    Main method
    """
    out = {}
    srcs = ['ar', 'fn', 'epi']
    # iterate over recipe files
    for src in srcs:
        path = 'data/raw/recipes_raw_nosource_%s.json' % src
        curr = json.load(open(path, 'r'))
        for _, recipe in curr.items():
            recipe['src'] = src
            # ignore empty recipes
            if len(list(recipe.keys())) == 1:
                continue
            # remove advertisements from ingredient list
            for i, ingredient in enumerate(recipe['ingredients']):
                if 'ADVERTISEMENT' in ingredient:
                    ingredient = ingredient.replace('ADVERTISEMENT', '')
                    recipe['ingredients'][i] = ingredient
            # remove nullified ingredients
            recipe['ingredients'] = [
                ingredient for ingredient in recipe['ingredients'] if ingredient != '']
        # check no recipes share key from different files
        out_keys = set(list(out.keys()))
        curr_keys = set(list(curr.keys()))
        assert not out_keys.intersection(curr_keys)
        out.update(curr)
    # save recipes
    path = 'data/raw/full_recipes.pkl'
    pickle.dump(out, open(path, 'wb'), protocol=2)
    check(out)


if __name__ == '__main__':
    main()
