#!/bin/bash
#$ -l m_mem_free=15G
#$ -N split
#$ -j y
#$ -o logs/

python data_processing/processing/1_split.py