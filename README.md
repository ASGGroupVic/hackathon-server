#hackathon-server

To install dependant packages, type `npm install`

To deploy the solution to AWS Elastic Beanstalk via the CLI:
- Go through the [AWS - Getting Set Up with EB Command Line Interface (CLI) 3.x](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-getting-set-up.html)
- Initialise Elastic Beanstalk CLI:
  - Enter the following command to configure the elastic beanstalk connection
  
    `eb init`
  - For "Select a default region", choose 

    >7) ap-southeast-2 : Asia Pacific (Sydney)
  - Enter your AWS access-id and secret-key when prompted (Should of been in the email when your account was created)
  - For "Select an application to use", choose 

    >2) hackathon-api
- You should now be able to deploy the application with the following command:
  
  `eb deploy`
- You can browse directly to the application url in AWS with the command:

  `eb open`