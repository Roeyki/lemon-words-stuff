ECHO off
ECHO -------------- initiating ------------------
ECHO ---- Should shout out some errors if  the image or the container are not currently in docker's environment
docker rm -f  lemons-stuff
docker rmi -f  lemons-stuff
cd ../dockerImage
docker load -i lemons-stuff.tar
docker run -p 5050:5050 -it --name lemons-stuff lemons-stuff
