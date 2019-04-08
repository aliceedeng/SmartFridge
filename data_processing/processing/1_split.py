import pickle
import pandas as pd
import numpy as np


def main():
    """
    Splits ingredient_in dataframe by 'name' and passes a series of 1500 unqiue names
    to each generated pkl
    """
    ing_in_path = 'data/join/ing_in.pkl'
    ing_in = pickle.load(open(ing_in_path, 'rb'))
    unique_names = ing_in['name'].unique().values
    split_size = 1500
    split_num = 0
    total = len(unique_names)
    complete = 0
    while complete < total:
        if total - complete < split_size:
            curr = unique_names[complete:(complete+split_size)]
        else:
            curr = unique_names[complete:]
        complete += split_size
        pickle.dump(curr, open('data/join/%d.pkl' % split_num))


if __name__ == '__main__':
    main()
