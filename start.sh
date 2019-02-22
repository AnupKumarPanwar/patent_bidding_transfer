$pid_front_end = lsof -ti :3000
kill -9 $pid_front_end
cd patent-front-end
x-terminal-emulator -e npm run start
cd ../patent-backend
$pid_backend = lsof -ti :4000
kill -9 $pid_backend
x-terminal-emulator -e npm run start
$pid_ganache = lsof -ti :9545
kill -9 $pid_ganache
x-terminal-emulator -e truffle develop