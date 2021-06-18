#!/bin/sh
i = 0
for f in *.jpg
do 
    i=$(($i+1))
    mv -v "$f" "test$i.jpg"  
done 
