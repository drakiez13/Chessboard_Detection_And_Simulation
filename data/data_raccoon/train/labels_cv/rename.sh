#!/bin/sh
i = 0
for f in *.txt
do 
    i=$(($i+1))
    mv -v "$f" "test$i.txt"  
done 
