while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist build/public # move the React front end to the target distribution
cp service/*.js build # move the back end service to the target distribution
cp service/*.json build
if [ ! -f .env ]; then
    printf "\n----> ERROR: .env file not found in project root\n"
    exit 1
fi
cp .env build

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install
npm run build
cp -rf dist build/public
cp service/*.js build
cp service/*.json build
if [ ! -f .env ]; then
    printf "\n----> ERROR: .env file not found in project root\n"
    exit 1
fi
cp .env build

# Generate ecosystem.config.js locally from .env
cat > build/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '${service}',
    script: 'index.js',
    args: '4000',
    env: {
      $(grep -v '^#' .env | grep -v '^$' | while IFS='=' read -r key value; do
        echo "      \"$key\": \"$value\","
      done | sed '$ s/,$//')
    }
  }]
}
EOF

# Step 2
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}
mkdir -p services/${service}
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r -i "$key" build/* ubuntu@$hostname:services/$service

# Step 4
printf "\n----> Deploy the service on the target\n"

# Create ecosystem file with env vars
ssh -i "$key" ubuntu@$hostname << ENDSSH
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"
cd services/${service}
npm install
pm2 start ecosystem.config.js --update-env
ENDSSH

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist