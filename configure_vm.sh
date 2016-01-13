#!usr/bin/bash

# Variables
git_email="christopher.reynolds@accenture.com"

# Install Git, Ruby, Node, NPM and Grunt 
sudo apt-get install git
sudo apt-get install Ruby
sudo apt-get install node
sudo apt-get install npm
npm install grunt --save-dev

# Check that Ruby is installed
ruby -v

# Set up Git aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.st status
git config --global alias.un 'reset HEAD --'

# Set up SSH keys
ssh-keygen -t rsa -b 4096 -C "$git_email"
ssh-agent -s
ssh-add ~/.ssh/id_rsa

echo "Copy this SSH key and paste it into the SSH keys section of your Github profile\n"
cat ~/.ssh/id_rsa.pub
echo "\n\n"

# Make dev folder
cd ~/
mkdir dev
cd dev

# Clone the bash script repo
git clone git@github.com:creynolds86/blank-project.git ./bash-template

# Checkout the bash template
cd bash-template
git co bash-template

# Install repo dependencies and build the app
npm install
grunt

# Start the app server
node server.js

# Open a new terminal window
gnome-terminal -e "git st"
