## [one2n sre exercises](https://one2n.io/sre-bootcamp/sre-bootcamp-exercises)

## Introduction

This repo is a part of sre bootcamp created by one2n.in . It includes exercises to practice and enhance one's sre concepts. 

## Installation   
   
To run this application using docker:

### Installation using docker  
   
To build or run this application using docker, make sure you have docker installed:   
```
https://docs.docker.com/engine/install/
```

To build this application using docker  
1. clone the repo  

```
git clone https://github.com/shubhamxshah/one2n-sre  
cd one2n-sre   
```
  
2. build the image to run in development mode  
```
docker build -t one2n-sre/dev:latest --target dev .
```

build the image to run in production mode  
```
docker build -t one2n-sre/prod:latest --target production .  
```

3. run the image in development mode  
```
docker run -p 3002:3002 one2n-sre/dev:latest
```

run the image in production mode  
```
docker run -p 3002:3002 one2n-sre/prod:latest
```

### Installation using docker compose 

1. clone the repo 
```
git clone https://github.com/shubhamxshah/one2n-sre  
cd one2n-sre  
```
   
2. run  
```
docker compose up
```
3. To visulalise data:   
on adminer: visit `http://localhost:8080`   
and enter following details:  
database:  `postgresql`  
server: `postgres_db`  
username: `admin`  
password: `password`  
database: `mydb`  
   
on prisma studio:  
create .env in root and add this url:   
```
DATABASE_URL="postgresql://admin:password@localhost:5432/mydb?schema=public"
```
run: `
```
npx prisma studio
```
the prisma studio is now running on `http://localhost:5555`  
   
4. To stop the containers:  
```
docker compose down
```

## To run the application in a vm using vagrant:  
   
1. install vagrant 
```
https://developer.hashicorp.com/vagrant/install 
```
and required vagrant plugins for e.g. if using digitalocean: 
```
vagrant plugin install vagrant-digitalocean
```
   
2. setup your digital ocean token: (This is important because it provides env variables to child process in the particular session, e.g. here to vagrant
```
export DIGITALOCEAN_TOKEN='your_toke_here'
```
3. start the vagrant box:
```
source .env # if using .env file
vagrant up --provider=digital_ocean
```

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

