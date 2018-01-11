# Task Auction App

**Tool for organizing the chores of community living.**
A system for efficient task distribution and transparency that was successfully implemented and used offline on paper for more than a year. Made it digital for ease of use, fanciness and automated data crunching.




### How does it work? 
**In a Nutshell:** You earn points by doing tasks. These points are a metric for your contribution to the community. Tasks get distributed in an inverse auction - who offers to do it for the least amount of points, wins the tasks and has the remaining week to complete it. Then the cycle repeats. 

The accumulated points can be political power, just a score, or whatever you want.

*More in depth information will be available very soon!*

----------

### Deploying / Developing
> **Prototype!**
> This software is mostly a hacked together proof of concept. There has been no quality standards, no tests, no security, no documentation, no coherent plan or architecture. Yet it has already proven useful and is released here for whoever finds it interesting. Once the system itself evolves, a more efficient, secure, robust and maintainable rebuild is in order ;-)

#### Admin / User Guide
*TODO*

#### Requirements
* nodejs & npm
* http server with php
* mysql server


#### Development Setup

```bash
# install node env
$ sudo npm install -g ionic cordova 
$ cd path/to/your/cloned/taskauction
$ npm install

# create database and credentials file
# create a mysql database and import setup-db.sql
$ cd backend
$ cp db-sample.ini db.ini
$ nano db.ini # put in your db credentials

# provide the path of slingshot.php on your server
$ cd ../src/providers/config
$ cp config-sample.ts config.ts
$ nano config.ts # adjust backend URL

# the framework does everything else for you
$ ionic serve
```
Everything frontend lives in `src/`. Backend consists of only 1 file: `backend/slingshot.php`

#### Building for production
```bash
# to optimize, minify and whatnot:
$ ionic build --prod
# cross your fingers and hope for the best. Good luck!
# results will be in www/
```
*To build for Android, IOS etc. check the ionic docs. You will also need numerous other things installed on your system for that. The error messages are usually helpful if something is missing. That being said, there is not much of an advantage of a native app in this case.*
