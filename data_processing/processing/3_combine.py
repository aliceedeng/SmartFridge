import argparse
import pickle
import sys
import pandas as pd
import numpy as np


def main():
    """
    Loads all learned dictionaries for name -> id mappings and combines them
    """
    parser = argparse.ArgumentParser()
    parser.add_argument('--max', action='store', type=int, required=True)
    last_dict = parser.parse_args().max
    name_id_map = {}
    for i in range(last_dict + 1):
        curr_path = 'data/join/%d_map.pkl' % i
        curr_dict = pickle.load(open(curr_path, 'rb'))
        name_id_map.update(curr_dict)
        print("Loaded %d" % i)
    # save joined map
    join_path = 'data/join/full_map.pkl'
    pickle.dump(name_id_map, open(join_path, 'wb'))
    print("built and saved full map")
    # load ingredient dataframe
    ing_in_path = 'data/join/ing_indf.pkl'
    ing_in = pickle.load(open(ing_in_path, 'rb'))
    # set usda_id on all ingredients using name_id_map obtained during apply
    ing_in['usda_id'] = -1
    group_ing = ing_in.groupby('name')
    count = 0
    for name, idx in group_ing.groups.items():
        ing_in.loc[idx, 'usda_id'] = name_id_map[name]
        count += 1
        if count % 1000 == 0:
            print('%d / %d' % (count, len(group_ing)))
            sys.stdout.flush()
    # save ingredients
    out_path = 'data/ing_in_table.pkl'
    pickle.dump(ing_in, open(out_path, 'wb'))


if __name__ == '__main__':
    main()
