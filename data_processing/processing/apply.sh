#!/bin/bash
#$ -t 1-42
#$ -q short.q
#$ -N apply
#$ -j y

#setup
cd ~/cis550
deactivate
conda activate food

# REPLACE MAX WITH NUMBER OF SPLITS FROM SPLIT
python data_processing/processing/2_apply.py --num "$SGE_TASK_ID"
