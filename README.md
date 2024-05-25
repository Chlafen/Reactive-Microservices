# Reactive microservices - lab 4
Collaborators:
- Mohamed Amine Bouchnak
- Adam Fendri
- Aziz Klai

## Project summary
This project is an implementation of a loan processing application based on reactive microservices that communicate through Kafka.

## System diagram
![image](https://github.com/adam-fendri/Microservice-Architecture-TP4-Software-Architecture-/assets/83192533/4265d429-907d-4169-97a6-9e39c2b5ad7e)


## Running the project
Starting the containers using docker compose:

```bash
docker compose up --build
```

To submit an application, send a `POST localhost:3000/process` request, sample body:

```json
{
  "email":"test@test.com",
  "fileUrl":"www.example.com/file.txt"
}
```

- Execution of the system for one request:
![image](https://github.com/adam-fendri/Microservice-Architecture-TP4-Software-Architecture-/assets/83192533/239f078d-d9ce-4e83-afc1-d7b987799838)
