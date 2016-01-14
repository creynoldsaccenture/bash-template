#!/bin/bash
# If the line above has a leading space then running this script with sudo will make it run under sh (which will produce syntax errors, since it doesn't understand brackets '()' or curly braces '{}'

# A bash script which outputs HTML with system information

### CONSTANTS ###
TITLE="System info for $HOSTNAME"
NOW=$(date +"%x %r %z")
TIME_STAMP="Updated on $NOW by $USER"

### VARIABLES ###
path="$(pwd)/index.html"

red_text="\033[0;31m"
green_text="\033[0;32m"
default_text="\033[0m"

template="$(pwd)/index.html.tpl"
output_file="$path"

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

function show_processes {

  show_num_processes=5

  echo "<h2>Top ${show_num_processes} processes by CPU usage</h2>"
  echo "<table class=\"table\">"

  # Output one iteration of top in batch mode, convert to CSV and remove everything before the process table (everything before the empty line)
  top_output="$(top -n 1 -b | sed '1,/^$/d' | sed 's/  */,/g')"

  # Remove leading commas
  top_output="$(echo "$top_output" | sed 's/,//')"

  # Get the first line
  headers="$(echo "$top_output" | head -q -n 1)"

  # Remove the first line and return the number of lines defined by show_num_processes
  top_output="$(echo "$top_output" | sed 1d | head -n $show_num_processes)"  

  # Adapted from http://unix.stackexchange.com/questions/105501/convert-csv-to-html-table and http://stackoverflow.com/questions/13122441/how-do-i-read-a-variable-on-a-while-loop
  echo "<tr><th>${headers//,/</th><th>}</th></tr>"

  while IFS= read -r INPUT; do

    echo "<tr><td>${INPUT//,/</td><td>}</td></tr>"

  done <<< "$top_output"

  echo "</table>"
  #echo "$top_output"
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
    $(show_processes)
EOF

template=$(<$template)
template=${template/system_info/$html}
echo "$template" > $output_file

exit 0
