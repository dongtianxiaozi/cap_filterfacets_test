#!/bin/sh
USERNAME=$(id -un)
sonar-scanner -D sonar.projectKey=cap_shop_floor_control::$USERNAME