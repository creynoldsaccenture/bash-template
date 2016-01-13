#!/bin/bash
# If the line above has a leading space then running this script with sudo will make it run under sh (which will produce syntax errors, since it doesn't understand brackets '()' or curly braces '{}'

# A bash script which outputs HTML with system information

### CONSTANTS ###

TITLE="System info for $HOSTNAME"
NOW=$(date +"%x %r %z")
TIME_STAMP="Updated on $NOW by $USER"

### VARIABLES ###
path="$HOME/system_info.html"

red_text="\033[0;31m"
green_text="\033[0;32m"
default_text="\033[0m"

template="./index.html.tpl"
output_file="./index.html"

### FUNCTIONS ###
function system_info {
  echo "system_info output"
}

function show_uptime {
  echo "<h2>System uptime</h2>"
  echo "<pre>$(uptime)</pre>"
}

function drive_space {
  echo "<h2>Drive space</h2>"
  echo "<pre>$(df)</pre>"
}

function home_space {
  # Only the superuser can get this information, so check if the curretn user has admin privileges
  # 0 indicates success, 1 indicates failure (same for the 'exit' command, i.e. 'exit 0' is script execution successful)
  # The square brackets '[]' indicate a comparison operation and the surrounding spaces are required
  if [ "$(id -u)" = "0" ]; then
    echo "<h2>Home directory space by user</h2>"
    echo "<pre>"
    echo "Bytes directory"
    du -s /home/* | sort -nr
    echo "</pre>"
  fi
}

### MAIN SCRIPT ###
# The 'exec >' command diverts stdin to a file (in this case the HTML code)
exec > $path

if [ "$?" != "0" ]; then
  printf "${red_text}Could not write file \"$path\"${default_text}\n" >&2
  exit 1
else
  printf "${green_text}Wrote file \"$path\"${default_text}\n" >&2
fi

# _EOF_ can be anything (except for bash reserved words). Using '<<-' instead of '<<' will include indentation
read -r -d '' html <<-EOF
    <h1>$TITLE</h1>
    <p>$TIME_STAMP</p>
    $(system_info)
    $(show_uptime)
    $(drive_space)
    $(home_space)
EOF

template=$(<$template)
template=${template/system_info/$html}
echo "$template" > $output_file
