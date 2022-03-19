# Lemon Word Stuff

### How to run
Method 1 :

In the main repository - run
```
npm i 
npm start
```
Method 2 : 

Click on the ``loadAndRunOnDocker.bat`` file

Few notes on the docker way : 

- This method requires docker installed on the machine (Dah..)
- The container will not save the state, so if you wish to save the sessions' data you can add volume (in the run command in ``loadFromFile.bat`` under dockerScripts folder). There specify the absolute path to the ``serverStorage/statisticSession.txt`` on your machine
---
### Input assumptions 

- Mid-word dashes (such as this one) **and every non latin character**  will make the words count as one word (chika-chika == chikachika)
- Every word will be referenced in the lower-case version of it (in the count **and** the query routes)

### How to use

- The server will run on port 5050 (because why not)
- Please reference the ``api/Swagger.yaml`` OpenAPI documentation of this little server



# Thank you, it was a pleasure 
## Roey Yohanan
#
#
