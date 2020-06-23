# Zahlungsverlauf Application
This is a GraphQL application to help you store a Tenant's payment History.
This has basic features for: 
1. Getting Rent Payment history for Tenant's Contract Id between a Range of Dates
2. Adding a Rent Payment for a Tenant's Contract Id.
3. Updating a Rent Payment
4. Deleting the Rent Payment.

## Prerequisites
You will need to below dependencies for running this application: 
1. [install node.js](https://nodejs.org/en/download)
2. [docker-compose](https://docs.docker.com/compose/install/)

#### Install dependencies

To install all dependencies run the following command:
```
npm install
```

#### Starting application

Finally you can start the Rent Payment History Application server:

```
npm run start

```
This would be running based on docker-compose. So please install the docker-compose before running this.
This would take some time, since it would build the relevant dockers and start the application. 
This application is based on GraphQL. Hence you can either go to the [playground](http://localhost:4000/)

Or you can [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/306be73b96ed1ca51efd)

The export is also provided in the [repository](tenantPaymentHistory.postman_collection.json)

Currently the "Authorization" Token has been hardcoded to 8xjM8PF9XC7KVUQ. 
So you would need to pass this as a header:
```
{"Authorization": "8xjM8PF9XC7KVUQ"}
```

#### Running Tests
You can run the tests with command: 
```
npm run test
```

You can also see the test coverage using: 
```
npm run test:coverage
```
Though it's not very high but I have tried to do it for the logical parts.

