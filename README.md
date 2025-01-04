## [one2n sre exercises](https://one2n.io/sre-bootcamp/sre-bootcamp-exercises)

## Introduction

This repo is a part of sre bootcamp created by one2n.in . It includes exercises to practice and enhance one's sre concepts. 

## Installation   
   
To run this application using docker:

## Installation using docker 

To build this application using docker,  
1. clone the repo  
`git clone https://github.com/shubhamxshah/one2n-sre`  
`cd one2n-sre`  
  
2. build the image to run in development mode  
`docker build -t one2n-sre/dev:latest --target dev .`  
build the image to run in production mode  
`docker build -t one2n-sre/prod:latest --target production .`  
   
3. run the image in development mode  
`docker run -p 3002:3002 one2n-sre/dev:latest`  
run the image in production mode  
`docker run -p 3002:3002 one2n-sre/prod:latest`  

   
## postman api collection:   
   
### Create a student   
  
Method: `POST`  

URL: `/api/v1/student`  

Body:   
`rollId` (`number`) **required** : unique rollId for student   
`name` (`string`) **required** : name of the student   
`standard` (`standard`) **required** : standard of the student  

Response codes:   
`200`: OK  
`300`: Incorrect inputs  
`400`: Error processing   

### update a student   
  
Method: `PUT`  

URL: `/api/v1/student`  

Body:   
`rollId` (`number`) **required** : unique rollId for student   
`name` (`string`) **required** : name of the student   
`standard` (`standard`) **required** : standard of the student  

Response codes:   
`201`: OK  
`300`: Incorrect inputs  
`400`: Error processing   

### delete a student   
  
Method: `DELETE`  

URL: `/api/v1/student`  

Body:   
`rollId` (`number`) **required** : unique rollId for student   

Response codes:   
`201`: OK  
`300`: Incorrect inputs  
`400`: Error processing   

### get a student   
  
Method: `GET`  

URL: `/api/v1/student`  

Body:   
`rollId` (`number`) **required** : unique rollId for student   

Response codes:   
`200`: OK  
`300`: Incorrect inputs  
`400`: Error processing   

### get all students   
  
Method: `GET`  

URL: `/api/v1/student`  

Response codes:   
`200`: OK  
`300`: Incorrect inputs  
`400`: Error processing   

