ECHO off
cd ..
ECHO -------------- initiating ------------------
ECHO ---- Should shout out some errors if  the image or the container are not currently in docker's environment
docker rmi -f  lemons-stuff
docker build -t lemons-stuff .
cd ./dockerImage
docker save -o lemons-stuff.tar lemons-stuff
