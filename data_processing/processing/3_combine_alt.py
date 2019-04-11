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
    # preparing name_id_map to be transformed into dataframe
    name_id_map[np.NaN] = -1
    name_id_map['nan'] = -1
    name_id_map['NOMATCH'] = -1
    name_id_map = pd.DataFrame.from_dict(name_id_map, orient='index')
    print(name_id_map.columns)
    # name only column usda_id
    name_id_map.rename(columns={0: 'usda_id'}, inplace=True)
    print('name_id_map df generated')
    sys.stdout.flush()
    # copy name to usda_id column, then replace missing values with NOMATCH
    ing_in['usda_id'] = ing_in['name']
    ing_in.loc[ing_in['usda_id'].isna(), 'usda_id'] = 'NOMATCH'
    # index by name value in ing_in, generating values for usda_id column
    usda_id = name_id_map.loc[ing_in['usda_id'].values, 'usda_id'].values
    print('usda id generated, saving now')
    sys.stdout.flush()
    ing_in['usda_id'] = usda_id
    out_path = 'data/ing_in_table.pkl'
    pickle.dump(ing_in, open(out_path, 'wb'))


if __name__ == '__main__':
    main()
