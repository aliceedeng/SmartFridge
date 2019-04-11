"""
Model for applying trained nyt tagger to our recipes
"""
import pickle
import codecs
import json
import os


class Converter(object):
    """
    Converter description

    Methods:
        load: loads all recipes
        convert: populates output_dict with structured ingredients
        __convert_recipe: applies NYT tagger to a single recipe DEPRECATED
        save: stores output_dict in data/raw/full_ingredients.pkl
        applies crf model to parse ingredients
    Fields:
        input: dictionary of all recipes
        output_dict: dictionary of dictionaries where key gives (recipe_id, ingredient_index) &
        value is output of crf test for that ingredient
    """

    def __init__(self):
        # super(Converter, self).__init__()
        self.output_dict = {}
        self.input = None

    def load(self):
        """
        Loads recipes from full_recipes.pkl
        """
        self.input = pickle.load(open('data/raw/full_recipes.pkl', 'rb'))

    def save(self):
        """
        Saves ingredient dictionary to data/raw/full_ingredients.pkl
        """
        pickle.dump(self.output_dict, open(
            'data/raw/full_ingredients.pkl', 'wb'))

    def convert(self):
        """
        Converts unstructured ingredients to structured ingredients and populates
        self.output_dict with them
        """
        # list of recipe id, ingredient count tuples
        tracker = []
        all_ingredients = []
        count = 0
        # compile single list of ingredients
        for rid, recipe in self.input.items():
            # ignore recipes with no ingredients
            if 'ingredients' not in recipe or not recipe['ingredients']:
                continue
            else:
                tracker.append((rid, len(recipe['ingredients'])))
                all_ingredients = all_ingredients + recipe['ingredients']
        # write ingredient list to file
        self.__write_ingredients(all_ingredients)
        print("Done write")
        # make predictions for ingredients list
        os.system('python ingredient-phrase-tagger/bin/parse-ingredients.py' +
                  ' ingredient-phrase-tagger/tmp/ingredients.txt' +
                  ' > ingredient-phrase-tagger/tmp/results.txt')
        print("Done predict")
        os.system('python ingredient-phrase-tagger/bin/convert-to-json.py' +
                  ' ingredient-phrase-tagger/tmp/results.txt' +
                  ' > ingredient-phrase-tagger/tmp/results.json')
        print("Done JSON")
        # load predictions for ingredients
        path = 'ingredient-phrase-tagger/tmp/results.json'
        preds = json.load(open(path, 'r'))
        tracker_count = 0
        count = 0
        rid = tracker[0][0]
        rid_max = tracker[0][1]
        # iterate over predictions
        for ingredient in preds:
            # if we have added all ingredients from current recipe
            if count == rid_max:
                # increment recipe counter
                tracker_count += 1
                # extract details about next recipe
                rid = tracker[tracker_count][0]
                rid_max = tracker[tracker_count][1]
            self.output_dict[(rid, count)] = ingredient
            count += 1  # increment in recipe counter

    def __write_ingredients(self, ingredients):
        """
        Write all ingredients list to file
        """
        with codecs.open('ingredient-phrase-tagger/tmp/ingredients.txt', 'w',
                         encoding='utf-8') as f:
            for ingredient in ingredients:
                assert ingredient
                assert not ingredient.isspace()
                ingredient = ingredient.replace("\n", " ")
                f.write('%s\n' % ingredient)

    def __convert_recipe(self, rid, ingredients):
        """
        DEPRECATED
        """
        out = {}
        # write ingredients to text file
        with codecs.open('ingredient-phrase-tagger/tmp/currRecipe.txt', 'w', encoding='utf-8') as f:
            for ingredient in ingredients:
                ingredient = ingredient.replace("\n", " ")
                f.write('%s\n' % ingredient)
        path = 'ingredient-phrase-tagger/tmp/results.json'
        preds = json.load(open(path, 'r'))
        out = {(rid, i): curr_pred for i, curr_pred in enumerate(preds)}
        return out
