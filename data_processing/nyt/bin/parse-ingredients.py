#!/usr/bin/env python
from __future__ import print_function

import sys
import os
import tempfile

from ingredient_phrase_tagger.training import utils


if len(sys.argv) < 2:
    sys.stderr.write('Usage: parse-ingredients.py FILENAME')
    sys.exit(1)

FILENAME = str(sys.argv[1])
_, tmpFile = tempfile.mkstemp()

with open(FILENAME) as infile, open(tmpFile, 'w') as outfile:
    outfile.write(utils.export_data(infile.readlines()))

modelFilename = "ingredient-phrase-tagger/tmp/model_file"
os.system("crf_test -v 1 -m s %s" % (modelFilename, tmpFile))
# os.system("del %s" % tmpFile)
