#!/bin/sh
USERNAME=$(id -un)
CLI_VERSION="4.6.0.2311"
PROJECT_KEY="cap_shop_floor_control::$USERNAME"

if ! command -v ./.sonar-scanner/bin/sonar-scanner &> /dev/null 
then
    echo "sonar-scanner not found, downloading..."
    curl https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$CLI_VERSION.zip --output sonar-scanner.zip
    unzip sonar-scanner.zip
    rm sonar-scanner.zip
    rm sonar-scanner-$CLI_VERSION/conf/sonar-scanner.properties
    cp -R ./sonar-scanner-$CLI_VERSION/* ./.sonar-scanner
    rm -R ./sonar-scanner-$CLI_VERSION
    echo "sonar-scanner downloaded"
fi

echo "Lunching scann on proyect key -> $PROJECT_KEY"
./.sonar-scanner/bin/sonar-scanner -D sonar.projectKey=$PROJECT_KEY