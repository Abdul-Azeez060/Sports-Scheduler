# Sports Assessment Project

## Overview

The Sports Assessment Project is designed to evaluate and analyze the performance of athletes across various sports. This project aims to provide insights and metrics that can help in improving the performance and training of athletes.

## Features

- **Data Collection**: Gather data from various sports activities.
- **Performance Analysis**: Analyze the performance metrics of athletes.
- **Visualization**: Visualize the data through charts and graphs.
- **Reporting**: Generate detailed reports on athlete performance.

## Installation

To get started with the Sports Assessment Project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Sports_Assessment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Sports_Assessment
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

# Authentication Routes

## Base URL

# Auth Routes

These routes handle authentication-related functionalities, such as register of new user, login, logout.

### Routes

- **GET /auth/login**: Displays the login page for users to log in.
- **GET /auth/register**: Displays the registration page for users to create a new account.
- **POST /auth/register**: Handles user registration. Accepts a `username` and `password` in the request body.
- **POST /auth/login**: Handles user login. Accepts a `username` and `password` in the request body.
- **GET /auth/logout**: Logs out the user and ends the session.

# Admin and Player Routes

These routes handle admin and player-related functionalities.

### Admin Routes

- **GET /admin/dashboard**: Admin dashboard page (requires authentication).
- **GET /admin/sports/new**: Form to add a new sport (requires authentication).
- **POST /admin/sports**: Create a new sport (requires authentication).

### Player Routes

- **GET /player/dashboard**: Player dashboard page (requires authentication).
- **POST /player/sports/:sportId/join**: Join a specific sport (requires authentication).

## Contributing

We welcome contributions to the Sports Assessment Project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## Docker

To run the Sports Assessment Project using Docker, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t sports_assessment .
   ```
2. Run the Docker container: Use your postgres url
   ```bash
   docker run  -p 8000:8000 -e DATABASE_URL="postgres://postgres:password@localhost:5432/postgres" JWT_SECRET="abshgsjflslj23234" PORT=8000 sports_assessment
   ```

This will start the application in a Docker container and make it accessible at `http://localhost:8000`.
