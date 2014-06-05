#!/bin/bash 

if [ "$1" = "reactive-script-reacts-to" ]; then
    # Write one event pr line that this script will react to
    echo "'autotest.net' 'runstarted'"
    echo "'autotest.net' 'runfinished' '0' '0'"
    exit
fi

if [ "$1" == "'autotest.net' 'runstarted'" ]; then
    ps -Af|grep Demo.exe|awk '{print $2}'|xargs kill
    echo "server stopped"
fi
if [ "$1" == "'autotest.net' 'runfinished' '0' '0'" ]; then
    src/Demo/bin/AutoTest.Net/Demo.exe
fi