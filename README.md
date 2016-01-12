#Blank project template

This is an HTML5 boilerplate and Twitter Bootstrap blank template with Grunt and Express.

##Requirements 

This template will need the following programs installed on your machine to run properly:

1. Git (duh!)
2. Node.js
3. Ruby (including the Sass gem)

##Installation
1. `git clone` this repository.
2. `cd` into the repository folder and run `npm install` to install node dependencies.
3. Once the dependencies have finished installing, run `grunt` and wait for it to finish building the template (if it says that it can't find `grunt`, then run `npm install grunt`). If the `sass` Grunt task fails then you probably dont have the Sass Ruby gem installed (to do this run `gem install sass`). 
4. Once the template has been built, open a bash/cmd prompt and run `node server.js`.
5. Navigate your browser to http://127.0.0.1:3000.

##Configuration
The IP address and port of the Express server can be changed by modifying the following line in `server.js`:
```
var server = app.listen(3000, '127.0.0.1', function () {
```
For example if you're on a linux machine:
```
var server = app.listen(1337, '0.0.0.0', function () {
```
This will run the server at http://0.0.0.0:1337.
