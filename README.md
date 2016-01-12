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
3. Once the dependencies have finished installing, run `grunt` and wait for it to finish building the template.
4. Once the template has been built, open a bash/cmd prompt and run `node server.js`.
5. Navigate your browser to http://127.0.0.1:3000.

##Usage
This template includes two grunt tasks:

1. `grunt`
2. `grunt prod`

`grunt` will run the tasks in development mode. This means that the CSS and Javascript files will not be minfied.

`grunt prod` will run the tasks in prodution mode. This will minify all CSS and Javascript files.

Once the `grunt` tasks have executed in dev mode the bash/cmd prompt should show the following:
```
Running "sass:dev" (sass) task

Running "autoprefixer:files" (autoprefixer) task
File dist/styles/main.css created.
File dist/styles/main.css.map created (source map).

Running "concat_css:all" (concat_css) task
File "dist/styles/main.css" created.

Running "uglify:main" (uglify) task

Running "copy:images" (copy) task


Running "copy:tbsfonts" (copy) task
Copied 5 files

Running "watch" task
Waiting...
```
The `Running "watch" task` part means that Grunt is watching the Sass (scss) and Javascript (js) files to see if they are modified. For example, if you changed anything in `app.scss` then Grunt will re-run the `sass:dev` task.

*N.B. `grunt prod` will not watch assets for changes.*

##Configuration
Custom grunt tasks can be added as JSON config in `Gruntfile.js`.

To install new dependencies run `npm install <package name> --save-dev`. The `--save-dev` flag tells npm to update the `packages.json` file with the new dependency.

The IP address and port of the Express server can be changed by modifying the following line in `server.js`:
```
var server = app.listen(3000, '127.0.0.1', function () {
```
For example if you're on a linux machine:
```
var server = app.listen(1337, '0.0.0.0', function () {
```
This will run the server at http://0.0.0.0:1337.

##Troubleshooting

If you see the following message:

```
grunt-cli: The grunt command line interface. (v0.1.13)

Fatal error: Unable to find local grunt.

If you're seeing this message, either a Gruntfile wasn't found or grunt
hasn't been installed locally to your project. For more information about
installing and configuring grunt, please see the Getting Started guide:

http://gruntjs.com/getting-started
```
Then Grunt is not installed. To install Grunt run `npm install grunt`.

If you run `grunt` and see something similar to the following message:

```
$ grunt
Running "sass:dev" (sass) task
c:/Ruby193/lib/ruby/site_ruby/1.9.1/rubygems/dependency.rb:247:in `to_specs': Could not find sass (>= 0) amongst [activesupport-3.2.22, addressable-2.3.8, akami
-1.3.1, berkshelf-2.0.15, bigdecimal-1.1.0, buff-config-0.4.0, buff-extensions-0.5.0, buff-ignore-1.1.1, buff-ruby_engine-0.1.0, buff-shell_out-0.2.0, builder-3
.2.2, bundler-1.11.2, celluloid-0.14.1, celluloid-io-0.14.1, chozo-0.6.1, erubis-2.7.0, faraday-0.8.11, ffi-1.9.10-x86-mingw32, gssapi-1.0.3, gyoku-1.3.1, hashi
e-3.4.3, hitimes-1.2.3-x86-mingw32, httpclient-2.7.1, httpi-0.9.7, i18n-0.7.0, io-console-0.3, json-1.8.3, json-1.5.5, kitchen-vagrant-0.19.0, little-plugger-1.
1.4, logging-1.8.2, mini_portile2-2.0.0.rc2, minitar-0.5.4, minitest-2.5.1, mixlib-authentication-1.3.0, mixlib-log-1.6.0, mixlib-shellout-2.2.5-universal-mingw
32, multi_json-1.11.2, multipart-post-1.2.0, net-http-persistent-2.9.4, net-scp-1.2.1, net-ssh-2.9.2, nio4r-1.2.0, nokogiri-1.6.7.1-x86-mingw32, nori-1.1.5, rac
k-1.6.4, rake-0.9.2.2, rbzip2-0.2.0, rdoc-3.9.5, retryable-1.3.6, ridley-1.5.3, rubyntlm-0.1.1, safe_yaml-1.0.4, savon-0.9.5, solve-0.8.2, test-kitchen-1.4.2, t
hor-0.19.1, thor-0.18.1, timers-4.1.1, uuidtools-2.1.5, varia_model-0.3.2, wasabi-1.0.0, win32-process-0.8.3, winrm-1.1.3, wmi-lite-1.0.0] (Gem::LoadError)
        from c:/Ruby193/lib/ruby/site_ruby/1.9.1/rubygems/dependency.rb:256:in `to_spec'
        from c:/Ruby193/lib/ruby/site_ruby/1.9.1/rubygems.rb:1231:in `gem'
        from c:/Ruby/bin/sass:22:in `<main>'
Warning: Exited with error code 1 Use --force to continue.

Aborted due to warnings.
```
Then the Ruby Sass gem is not installed. To install the gem run `gem install sass` (depending on how fast your machine is, this might take a while).
