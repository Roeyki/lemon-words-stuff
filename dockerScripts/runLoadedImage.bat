ECHO off
ECHO -------------- initiating ------------------
ECHO ---- Should shout out some errors if  the  container is not currently in docker's environment
docker rm -f  lemons-stuff
docker run -p 5050:5050 -it --name lemons-stuff lemons-stuff
PAUSE
