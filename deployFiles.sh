#!/bin/bash

# Parse
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

# Validate
if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying service '$service' to $hostname using key $key\n"

# -----------------------------
# Build project
# -----------------------------
BUILD_FOLDER="dist"

if [ ! -d "$BUILD_FOLDER" ]; then
    printf "\n----> Build folder '$BUILD_FOLDER' not found. Running 'npm run build'...\n"
    npm run build
fi

# Step 1
printf "\n----> Clearing previous distribution on the target.\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 2
printf "\n----> Copying build files to the server.\n"
scp -r -i "$key" ${BUILD_FOLDER}/* ubuntu@$hostname:services/$service/public

printf "\n Deployment complete!\n"
