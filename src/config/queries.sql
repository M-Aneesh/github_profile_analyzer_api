CREATE DATABASE github_analyzer;
USE github_analyzer;

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    total_stars INT,
    most_used_language VARCHAR(100),
    account_created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);