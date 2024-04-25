# Alemeno Assignment

## Introduction

This project is a [Node.js](https://nodejs.org/) application named "Alemeno Assignment" designed for [Docker](https://www.docker.com/) deployment. It includes backend code located in the `src` folder and an `index.js` file as the main entry point.

## Prerequisites

Before running this project, ensure that you have the following dependencies installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) 
- Express.js
- MySQL
  

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Ishita-02/Alemeno-Backend

2. Build the docker image.

  ```bash
   docker build -t assignment .

3. Run the Docker Container:

  ```bash
  docker run -p 3000:3000 -d assignment

4. Access the application in your web browser at http://localhost:3000.


   

