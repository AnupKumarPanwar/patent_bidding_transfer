kill -9 `lsof -ti :3000`
cd patent-front-end
x-terminal-emulator -e npm run start
cd ../patent-backend
kill -9 `lsof -ti :4000`
x-terminal-emulator -e npm run start
kill -9 `lsof -ti :9545`
x-terminal-emulator -e truffle develop