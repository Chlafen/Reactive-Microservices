# Reactive microservices - lab 4

## Project summary
This project is an implementation of a loan processing application based on reactive microservices that communicate through Kafka.

## System diagram
![image](https://github.com/Chlafen/Reactive-Microservices/assets/83192533/1e1d6243-e295-4a25-b13f-fdb165f2fe5b)



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
![image](https://github.com/Chlafen/Reactive-Microservices/assets/83192533/4b8d3c8a-3d7e-4bf6-8eae-4c891b92a51e)

