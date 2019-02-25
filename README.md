# Pider
## Patent management over Blockchain


## Requirements.
1. Truffle
2. Node.js
3. Python 3
4. MySQL

## How to setup?
1. Create a database in MySQL named dejavu. 
2. Import dejavu.sql in it.
3. Change the MySQL connection parameters in the following files.
  i. patent-backend/ImageComparision/dejavu.py (line no. 10)
  ii. patent-backend/AudioComparision/dejavu.cnf.SAMPLE
4. `pip install -r requirements.txt`
5. CD into patent-backend, and run `npm install`
6. CD into patent-frontend and run `npm install`



## Steps to run the project.

1. Run the following command

`sudo ./start.sh`

2. In patent-backend/blockchainConfig.json change the networkAdress to the rpc address.
