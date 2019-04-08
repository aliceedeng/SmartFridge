#!/bin/bash
#$ -l m_mem_free=15G
#$ -N split
#$ -j y
cd ~/cis550
deactivate
conda activate food
python data_processing/processing/1_split.py
