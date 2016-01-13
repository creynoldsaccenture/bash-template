#!usr/bin/bash

# Prompt user for their Github emaill address (required for setting up SSH keys)
echo -e "\nPlease enter your Github email address:"
read git_email

if "$git_email" !== ""; then
    initial_setup
else
    echo -e "\nThis script requires your Github email address to perform initial set up."
    exit 1
fi

sub initial_setup {

    # Install Git, Ruby, Node, NPM and Grunt 
    sudo apt-get install git
    sudo apt-get install ruby
    sudo apt-get install nodejs-legacy
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
    
    setup_bash_template
}

sub setup_bash_template {

    # Clone the bash script repo
    git clone git@github.com:creynolds86/blank-project.git ./bash-template

    # Checkout the bash template
    cd bash-template
    git co bash-template

    # Install repo dependencies and build the app
    npm install
    grunt prod

    # Build the HTML file to serve
    chmod 755 ./system_info.sh
    ./system_info.sh
}

# Start the app server
node server.js

# Open a new terminal window
gnome-terminal -e "grunt watch"
