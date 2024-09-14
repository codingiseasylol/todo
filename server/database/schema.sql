DROP DATABASE IF EXISTS todo;

CREATE DATABASE todo;
USE todo;

CREATE TABLE user (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    username NVARCHAR(255),
    passwordHash NVARCHAR(255),

    created DATETIME
);

CREATE TABLE todo (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    userId INT UNSIGNED,
    FOREIGN KEY (userId) REFERENCES user(id),

    title NVARCHAR(255),
    completed INT,

    created DATETIME,
    updated DATETIME
);