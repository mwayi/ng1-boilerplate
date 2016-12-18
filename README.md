# Angular 1 app boilerplate

An opinionated angular 1 app that helps take the cost out of decision making.

# Installation

	npm install

You can run `/build/public/index.html` locally (if not impeded by CORS) or you can set up a vhost to point to public.


## Tasks
	
	gulp 						// Bound to the elixr api for ease of use
	gulp compileNgTemplates		// Custom task to build ngTemplates also bound to elixr 
	gulp compileNgSripts		// Custom task to build ngScripts also bound to elixr 
	gulp watch 					// Watches all

# File structures

## Overview

	- build 					// The public facing build of the script 
		- public/index.html 	// The entry point to the app
	- fixtures					// Local data store
	- src 						// This folder contains all the pre built source code, angular, sass, html
	- tests						// Testing suite

## Application 

When the application grows, I tend to favour modularity. As things stand I have gone for modular-lite.

	- app								// Application scripts
		- Directives
			- RedBorderDirective.js
			- RedBorderDirective.html
		- Middleware					// Actions that take place outside of controllers and libraries
			- HttpInterceptor.js 	
		- Pages
			- HomePage.js
			- HomePage.html
		... etc 
	- configs							// More angular scripts but more configurational 

## Resources 

Resources are non application scripts such as sass and jquery.


# Architectural concepts
#### Page
A page is a controller that has a route and view. All controllers that are pages are suffixed with page.

#### Resources vs Models
Resources interface with data stores, whether it be `json` or api's.

Models extend the capability of the data objects so that DOM interactions that such as confirming whether or not a resource should be deleted, is managed by the model, not the resource nor the controller.

Models interface with multiple data stores, whilst directives and controllers could also interface with multiple Models.
