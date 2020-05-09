# Real Time Data Streaming
1. mysql docker

    [https://medium.com/@dilsimchandrasena/how-to-deploy-and-use-a-mysql-docker-container-in-ubuntu-4ace7c893982](https://medium.com/@dilsimchandrasena/how-to-deploy-and-use-a-mysql-docker-container-in-ubuntu-4ace7c893982)

MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client

Solution:

- Open mysql client
    - ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
    - To refersh privileges
     - flush privileges;
