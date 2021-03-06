# Generator Serverless for Google Cloud Platform

The Yeoman generator for Serverless framework on GCP. Setting up a new service including database clients as easy as 1-2-3.

## Generator installation
 
1) you are going to need [Yeoman](http://yeoman.io/):
```bash
npm install -g yo
```
2) Install the generator:

```bash
npm install -g @brdu/generator-serverless-gcloud
```

## Usage

### Base generator

Create a new directory for your service and run the generator:

```bash
mkdir example-service
cd example-service
yo serverless-gcloud
```

It will prompt some questions you need to answer to configure your project.
Default values are specified between parenthesis.
You now have a starter skeleton for a Cloud Functions project!

When the generator is done, remember to adjust your service account keys names and locations accordingly, as well as enabling the required Google APIs for a Serverless deployment. Then you're ready to deploy your service on GCP:

```bash
serverless deploy --env [any of the enviroment tags your passed to the generator]
```

## Features
*   Support of Serverless 
*   Supports NodeJS 8+
*   Supports Google Firestore and MongoDB Atlas

## Roadmap
*   Support for NodeJS :white_check_mark:
*   Support for Cloud Functions VPC Access  
*   Support for GO
*   Support for Python
*   Support of Firebase and Firestore events
*   Support more database options
*   Generator unit tests

## Resources
*   <https://serverless.com/framework/docs/providers/google>
*   <https://github.com/serverless/serverless-google-cloudfunctions>
*   <https://cloud.google.com/functions/docs>
*   <https://cloud.google.com/vpc/docs>
*   <https://cloud.google.com/deployment-manager/docs>
*   <https://firebase.google.com/docs/firestore>
