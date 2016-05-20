# Ministry of Economic Growth and Job Creation (MEGJC) Intranet

This repository contains MEGJC's intranet. The main goal of the intranet is to provide staff members a channel/platform
to communicate their ideas, keep up to date with internal news and show staff achievements.

### Version
0.5.0

### Technology Stack

MEGJC's intranet uses a number of open source technologies and projects:
 - AngularJs
 - Gulp
 - PHP
 - Slim Framework
 - Jasmine/Mocha
 - MYSQL

### Installation

The application's back-end consists of a MYSQL data store interfaced by PHP and the Slim Framework. A RESTFUL api architecture is being developed and consumed by an Angular front-end. Gulp will be responsible for completing tasks such as minification and linting of the JavaScript code base.
To run the project, on the command line or terminal in the root directory of the project run `npm install` to install gulp dependencies. The api dependencies are managed by `composer`. To install such dependencies change directory to the `api` folder of the project and run `php composer.phar install`. 
Environmental variables for the api are stored in a `.env` file. An example of the configurations are found in the `.env.example`. These configurations are required for database connection. Once you have replaced the default values, save the `.env.example` to `.env`.

### Todos

 - Write Tests
 - Structure and refract CSS
 - Structure and refract Angular
 - Integrate gulp build system
 - Determine a better mechanism to manage images
