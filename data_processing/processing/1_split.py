import pickle
import pandas as pd
import numpy as np


def makedf(ing_in):
    count = 0
    allkeys = []
    for key, val in ing_in.items():
        count += 1
        if count > 10:
            break
        allkeys += list(val.keys())
    allkeys = set(allkeys)

    cols = {}

    for key in allkeys:
        cols[key] = []

    keys = []
    counter = 0
    for key, val in ing_in.items():
        keys.append(key)
        for colkey in cols.keys():
            if colkey not in val:
                cols[colkey].append(np.NaN)
            else:
                cols[colkey].append(val[colkey])
        if counter % 100000 == 0:
            print('%d / %d ' % (counter, len(ing_in)))
        counter += 1
    ingdf = pd.DataFrame(data=cols, index=pd.MultiIndex.from_tuples(
        keys, names=['rid', 'num']))
    return ingdf


def main():
    """
    Splits ingredient_in dataframe by 'name' and passes a series of 1500 unqiue names
    to each generated pkl
    """
    ing_in_path = 'data/join/ing_indf.pkl'
    ing_in = pickle.load(open(ing_in_path, 'rb'))
    if isinstance(ing_in, dict):
        ing_in = makedf(ing_in)
        pickle.dump(ing_in, open('data/join/ing_indf.pkl', 'wb'))
    unique_names = ing_in['name'].unique()
    unique_names = unique_names[unique_names != 'nan']
    split_size = 750
    name_count = ing_in.groupby('name').count()['qty'].copy()
    name_count.sort_values(inplace=True, ascending=False)
    print(name_count)
    split_num = 0
    total = len(unique_names)
    complete = 0
    while complete < total:
        if total - complete > split_size:
            curr = unique_names[complete:(complete+split_size)]
        else:
            curr = unique_names[complete:]
        complete += split_size
        print(curr)
        pickle.dump(curr, open('data/join/%d.pkl' % split_num, 'wb'))
        split_num += 1


if __name__ == '__main__':
    main()
