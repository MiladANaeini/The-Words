This project was done by Milad Arabi Naeini.

# The Words

## Description

The Words is an app to search for existing synonyms for words and also gives the user the ability to add new words and synonyms.

The hosted version can be found at: [http://ec2-16-170-167-40.eu-north-1.compute.amazonaws.com:3001/].

# Github repo

https://github.com/MiladANaeini/The-Words

## Technologies

The Words is built with the following tools:

- Frontend: React / reactstrap
- Backend: Node.js / express
- Web hosting: Docker in AWS

## Setup

- To run the client, navigate to the-words folder and do the followng:

1. To install dependencies, run:
   npm install
2. To run client app, run:
   npm start
   (app will run on localhost:3001)

- To run the server, navigate to server folder and do the followng:

1. To install dependencies, run:
   npm install
2. To run server app, run:
   npm start
   (app will run on localhost:3000)

## Running locally in development mode

- In order to use the local server API endpoints, navigate to the-words > src > constants > constant.js
- Choose the localhost:3000 as the base URL and comment the second one

# Using the application

There are some previously added words to the list. If you wish to see them when using the app for the first time, search for the word "happy" or "sad" in the search box, or add new words of your choice if you wish
