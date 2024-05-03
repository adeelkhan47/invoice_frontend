# NestJS Backend, Vue.js Frontend, and PostgreSQL Database

## Prerequisites

Before you begin, ensure you have installed the following prerequisites:

1. Docker: Refer to the Docker installation guide: https://docs.docker.com/engine/install/ to install Docker on your system.

2. Docker Compose: Refer to the Docker Compose installation guide: https://docs.docker.com/compose/install/ to install Docker Compose on your system.

## Environment Variables

The docker-compose.yml file uses environment variables to store database connection details. You can set these environment variables using the following commands:

```bash
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=password
export DB_NAME=your_database_name
```

# Use code with caution. Learn more

Replace your_database_name with the name of your PostgreSQL database.

## Running the Application

1. Clone the project repository to your local machine.

2. Open a terminal window and navigate to the project root directory.

3. Start the application using the following command:

```bash
 docker-compose build
 docker-compose up -d
```

## Use code with caution. Learn more

The application should be running at http://localhost:8080.

## Structure

The project directory structure is as follows:

```bash
project_root/
├── BE/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── app.module.ts
├── docker-compose.yml
├── FE/
│   ├── index.html
│   ├── package.json
│   └── src/
│       └── main.js
└── README.md
```

## Technologies

The project utilizes the following technologies:

- **NestJS:** A Node.js framework for building efficient and scalable server-side applications.

- **Vue.js:** A progressive JavaScript framework for building user interfaces.

- **PostgreSQL:** An open-source object-relational database management system.
