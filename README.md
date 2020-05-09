# Socket Real time data streaming

A Full Stack Web Application to handle real-time data streaming with Node socket.

## Current stack

- **Backend:** NodeJS v12, Socket.IO v2
- **Frontend:** ReactJS v16
- **Db:** MySQL v8

## Current Behavior

### On Back End

- An external agent is created to send data at required rate
- Backend is continuously listening for output of above mentioned agent
- Each event is stored in Db as backup
- And the real-time data is emitted to front end

### On Front End

- The UI is very minimal which is displaying last 1 hour data (from Db for initial load) with the help of area chart.
- The real-time data is being displayed continuously on the chart.
- Pause/Play button is present to control data streaming.
- Option to download excel data

## Running locally

1. Ensure that you have installed all the dependencies by running the following commands in the root of folder:

   ```bash
   npm install

   cd ui && npm install
   cd ..
   ```

2. Start a MySQL instance. This can be done by running the [official Docker image of MySQL](https://hub.docker.com/_/mysql).

   ```bash
   mkdir -p ~/dummy/mysql_8
   docker pull mysql:8.0.20
   docker run --name some-mysql -v ~/dummy/mysql_8:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8.0.20
   ```

3. Update the MySQL connection details by creating a file at `.env` with following content

   ```yaml
   NODE_ENV=development
   SERVER_PORT=5000
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=my-secret-pw
   DB_NAME=data_tracker
   ```

4. Connect to MySQL using your favorite client or you can use docker to do that by running following command:

   ```bash
   docker exec -it some-mysql bash
   mysql -h127.0.0.1 -uroot -p
   ```

5. Run following commands while logged into MySQL client

   ```sql
   -- to handle authentication error due to feature still not being available in node mysql driver
   ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
   flush privileges;

   -- create database and table
    CREATE DATABASE data_tracker CHARACTER SET utf8;
    USE data_tracker;

    CREATE TABLE IF NOT EXISTS sensor_data (
        category varchar(100) ,
        metric_name varchar(100) ,
        metric_value DECIMAL(10,2) ,
        timestamp TIMESTAMP
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;
   ```

   You can close this terminal if you want or exit it.

6. Start the backend server by running following command at root of the project

   ```bash
   npm run start-server
   ```

   Keep this running in one terminal. Server will start by default on port no. 5000.

7. Start the UI development server by running following command

   ```bash
   cd ui && npm start
   ```

   This will start the React development server and open your browser at `http://localhost:3000`. The UI will connect to server via URL `http://locahost:5000`.

8. To start sending real-time data via agent, run this at root of folder

   ```bash
   node agent/generateData.js
   ```

   This will connect to server via URL `http://localhost:5000` and start sending random generated data.

## Things to Improve

1. Disconnection of ports between files and use environment variables for the same
2. Deployment support via Docker
3. Deploy live on Heroku
4. Add tests
