#Consultant X-Ray API

##Installation
To install dependant packages, type `npm install`

##Testing
To test the application, run the command `npm test`

If the test script under packages.json has the --watch flag, it will continue to listen for changes and run the tests when it detects a change.

##Deployment to Heroku
- See the [Heroku - Getting Started Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
- To deploy the committed code from your master branch, run the following comand:
  
  `git push heroku master`
- To view your service in heroku, run the following command:
  
  `heroku open`
- To view the heroku logs:

  `heroku logs --tail`
- To run a bash shell on heroku:

  `heroku run bash`