## [one2n sre exercises](https://one2n.io/sre-bootcamp/sre-bootcamp-exercises)

## Introduction

This repo is a part of sre bootcamp created by one2n.in . It includes exercises to practice and enhance one's sre concepts. 

## Installation   
   
To run this application use docker compose.   
   
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

