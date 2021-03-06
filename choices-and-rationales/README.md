# Choices And Rationales
It was fun to do this.

## Assumptions
I would like to start with some assumptions which I have made for the ease of this assignment:
### Assumption 1: The data is **limited** 
I have currently assumed that the data for the rent payment for a tenant is limited i.e. we can get the data from the persistence in one go. 

If the assumption is not to be made then the solution can change in below mentioned ways:

Currently, I calculate the sum in the code while fetching the rent payments for the *getListOfPayments* query, assuming that the data is limited.

- Calculate the sum in the database of all the tenant payments.
- The data for tenant payments will be returned as paginated data, i.e., with an upper limit to fetch the data on a page. 
So, this would work like: the Data displayed on Bank Applications for the Account balance.
- Create relevant indexes in the database for doing this, so that the Database processing doesn't take a toll as well.

This can have an impact on lot of other things as well.


## Rationales

Before going to explain the rationales;

I would like to start with a disclaimer: 
My knowledge is not yet super good about GraphQL since I started using it some time ago. 

But I have tried to do a graphQL based application due to two reasons: 
1. I saw that the tenant website uses GraphQL.
2. We learn by doing stuff. This is a chance which I am using as learning as well to get the best out of the Interview process.

In the below text, I would like to explain some choices which I made while doing this assignment:

### 1. Approach for GraphQL code organization: 
I have tried an approach here, for trying out strongly typed graphQL resolvers.
So here I am using a library called graphql-codegen for generating Types, from a graphql schema definition mentioned in schema.ts.
This approach has some pros and cons as given below: 

Pros:
  - This gives us a strongly typed resolver: which helps the developers to gauge any breaking changes in development time itself. 
  - This gives us types that we can directly map to and from. And hence, this makes the resolver very simple to write.

Cons:
  - This approach is not suitable for a Microservices architecture based application.
In this case, a good way to go about would be using a backend for frontend which serves as a GraphQL layer, whereas the Microservices   would act as the Datasources for this application. 
An example: We can use AWS AppSync (or a hosted GraphQL server) as a Backend-for-frontend, and then connect different data sources that correspond to our different microservices based on REST APIs or  MongoDataSource, etc. 
  For explaining what I mean please find the example as below:
    
    ![Example for explaining GraphQL example](./GraphQLExample.png?raw=true "Example for explaining GraphQL example")

If I had to build a bigger application, I would go for a Datasource based approach.

For keeping this test simple I have chosen the codegen based approach.

### 2. Code organization: 
I am using a hexagonal architecture based code organization. Currently, In the Infrastructure layer, we have only a single Input port which is GraphQL. The Output port is our Database.
The business logic lies in the domain folder. 
The parts which don't lie in any of them lie in the Application-services layer.
The Flow of the Request:
  1. Request comes to the GraphQL port where the request is typed into GraphQL types.
  2. This is where the responsibility for Application Service layer begins. These types are then used as input to create Domain object, and hence it verifies if the GraphQL input adheres to the Domain rules. Just to illustrate a Validation rule, ContractId is number but cannot be lesser than or equal to 0. Similarly for rent value, it is a number but it can be negative, or positive but cannot be 0. These rules are implemented in the Domain type itself using Value objects.
  3. Once the Domain object is successfully created the Application Service converts it to the Database Entity type, and then calls the Repository.
  4. The Repository stores the data in the database, and returns the Entity.
  5. This Entity is again converted back to Domain, This is being done since there might be some mappings/ conversions/ enrichments being done on the data coming from database layer which might be specific to Domain, for an e.g.: Full name from First name and Last Name. And eventually to GraphQL type so that it could be returned. 
This gives us a chance to keep Business rule validations segregated from the Application services. 
Please find the image as below to illustrate above flow:
![Explanation for Code organization](./RequestFlowAndTypeConversions.png?raw=true "Request flow and type conversions ")

### 3. Database selection:
The application uses PostgresDB. I chose PostgresDB since, it was mentioned in the documentation that there are relations with Tenant Contracts (from where RentPayments contractId comes from). As per the datastructure MongoDB would also be a good way to go about but since I don't know much about the system it is difficult to choose.

### 4. Dependency Injections: 
In general, I would go for dependency injections and refrain from using the new operator in the project. 
This has several advantages like it makes the code easily testable, and reusable. 
But since, the size of the code right now is small. I have not used dependency injections library. But I have made some dependencies like Application-Service injectable. I am injecting a Mocked Repository instance in the Application-service to test it.

### 5. Docker-compose:
*Remark:* I have handled the part where the application docker waits for the Postgres docker to be ready in the application code.

### 6. TypeORM: 
I have used TypeORM for this application. Since it is suited well with Typescript.

### 7. Automation Testing: 
I have a moderate amount of unit tests. Additionally, I have also added integration tests for the Repository. 

### 8. Authorization key: 
Currently, I am reading the Authorization key from the environment variables.

### 9. Missing migrations:
I haven't added the migrations for the application. In general, I would write migrations for creating/altering the table. But for simplicity, I have not done that in the application.

### 10. Custom Errors:
I have made a stack of Custom Errors, based on various things, like domain errors, database-related errors, generic Application error. I have tried to concentrate on the ERROR CODE, which normally is used for relevant error messages in the Front end.

### 11. Webpack: 
I am compiling the code, using webpack since the initial plan was to deploy the things in the Lamda. Where webpack would help us generate single minified file to be deployed on the Lambda with only the relevant code to be deployed.
