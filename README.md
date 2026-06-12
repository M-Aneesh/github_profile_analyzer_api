# GitHub Profile Analyzer API

A REST API built with **Node.js, Express.js, MySQL, Axios, and GitHub REST API** that analyzes GitHub profiles, stores profile statistics in a MySQL database, and provides filtering, sorting, and profile management endpoints.

---

## Live Demo

**Base URL**

```text
https://github-profile-analyzer-api-w50z.onrender.com
```

> Note: The API is deployed on Render's free tier. The first request may take a few seconds due to cold starts.

---

## Features

* Analyze GitHub profiles using GitHub REST API
* Store analyzed profile data in MySQL
* Fetch all analyzed profiles
* Fetch profile by username
* Delete profiles
* Filter profiles by language
* Filter profiles by minimum followers
* Filter profiles by minimum public repositories
* Sort profiles by followers
* Sort profiles by stars
* Sort profiles by public repositories
* Deployed on Render
* MySQL database hosted on Railway

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios
* GitHub REST API
* Railway
* Render

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_railway_db_port

GITHUB_TOKEN=your_github_personal_access_token
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/M-Aneesh/github_profile_analyzer_api.git

cd github_profile_analyzer_api
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## Database Schema

```sql
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
```

---

# API Endpoints

## Home Route

### Request

```http
GET /
```

### Response

```json
{
  "success": true,
  "message": "GitHub Profile Analyzer API is running"
    ....
}
```

---

## Analyze and Store GitHub Profile

Fetches GitHub profile information, analyzes repositories, and stores the result in MySQL.

### Request

```http
POST /api/profiles
```

### Body

```json
{
  "username": "octocat"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Profile analyzed and stored successfully"
}
```

### Duplicate Profile Response

```json
{
  "success": false,
  "message": "Profile already exists"
}
```

---

## Get All Profiles

### Request

```http
GET /api/profiles
```

### Response

Returns all analyzed profiles ordered by latest analysis date.

---

## Get Profile By Username

### Request

```http
GET /api/profiles/:username
```

### Example

```http
GET /api/profiles/octocat
```

### Response

```json
{
  "success": true,
  "data": {
    "username": "octocat"
  }
}
```

---

## Delete Profile

### Request

```http
DELETE /api/profiles/:username
```

### Example

```http
DELETE /api/profiles/octocat
```

### Response

```json
{
  "success": true,
  "message": "Profile deleted successfully"
}
```

---

# Filtering Endpoints

## Filter By Language

### Request

```http
GET /api/profiles?language=JavaScript
```

Returns only profiles whose most used language is JavaScript.

---

## Filter By Minimum Followers

### Request

```http
GET /api/profiles?minFollowers=100
```

Returns profiles with at least 100 followers.

---

## Filter By Minimum Public Repositories

### Request

```http
GET /api/profiles?minPublicRepo=10
```

Returns profiles with at least 10 public repositories.

---

# Sorting Endpoints

## Sort By Followers

### Request

```http
GET /api/profiles?sortBy=followers
```

Returns profiles ordered by followers (highest first).

---

## Sort By Stars

### Request

```http
GET /api/profiles?sortBy=stars
```

Returns profiles ordered by total stars (highest first).

---

## Sort By Public Repositories

### Request

```http
GET /api/profiles?sortBy=public
```

Returns profiles ordered by public repositories (highest first).

---

# Combined Queries

The API supports combining filters and sorting.

### Example 1

```http
GET /api/profiles?language=JavaScript&sortBy=followers
```

Returns JavaScript profiles sorted by followers.

### Example 2

```http
GET /api/profiles?language=JavaScript&minFollowers=100&sortBy=stars
```

Returns JavaScript profiles having at least 100 followers sorted by stars.

### Example 3

```http
GET /api/profiles?minPublicRepo=20&sortBy=public
```

Returns profiles with at least 20 repositories sorted by repository count.

---

## Sample Usernames For Testing

```text
octocat
torvalds
gaearon
sindresorhus
microsoft
google
```

---

## Deployment

### Backend

* Render

### Database

* Railway MySQL

---

## Author

**Aneesh M**

GitHub: https://github.com/M-Aneesh
