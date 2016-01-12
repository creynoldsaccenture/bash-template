#Blank project template

This is a HTML5 boilerplate and Twitter Bootstrap blank template with Grunt and Express.

##Installation
1. `git clone` this repository
2. `cd` into the repository folder and run `npm install` to install node dependencies
3. Once the dependencies have finished installing, run `grunt` and wait for it to finish building the template
4. Once the template has been built, open a bash/cmd prompt and run `node server.js`
5. Navigate your browser to '127.0.0.1:3000'

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