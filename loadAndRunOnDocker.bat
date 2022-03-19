ECHO off
ECHO Welcome ! Please wait while we load the lemon stuff container.
npm i
cd ./dockerScripts
call buildAndSave.bat
call loadFromFile.bat
PAUSE

