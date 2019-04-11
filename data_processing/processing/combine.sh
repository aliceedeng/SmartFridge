#!/bin/bash
#$ -l m_mem_free=15G
#$ -N combine
#$ -j y

# setup
cd ~/cis550
deactivate
conda activate food

# REPLACE MAX WITH NUMBER OF SPLITS FROM SPLIT
python data_processing/processing/3_combine.py --max 113
