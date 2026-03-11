# GitHub Profile Visualizer

A React-based web application that visualizes GitHub user statistics using charts and API data.

## Live Demo

https://gpv-livid.vercel.app

## Overview

GitHub Profile Visualizer allows users to search for any GitHub username and view their profile statistics such as repositories, stars, commits, and language usage through interactive charts.

The project integrates the GitHub REST API to fetch real-time data and presents it using modern data visualization techniques.

## Tech Stack

- React.js
- JavaScript
- Recharts
- REST API Integration
- CSS

## Features

- Search any GitHub username
- View repository statistics
- Language distribution charts
- Interactive data visualization
- Responsive UI
- Error handling for invalid users

## APIs Used

- GitHub User Profile Details API - https://apis2.ccbp.in/gpv/profile-details/{username}
- GitHub User Repository Details API - https://apis2.ccbp.in/gpv/repos/{username}
- GitHub User Repository Item Details API - https://apis2.ccbp.in/gpv/specific-repo/{username}/{repoName}
- GitHub User Analysis Details API - https://apis2.ccbp.in/gpv/profile-summary/{username}

## Installation

Clone the repository

git clone https://github.com/prashanththota98/gpv.git

Navigate to project folder

cd gpv

Install dependencies

npm install

Start development server

npm start

## Future Improvements

- Dark mode
- Contribution graph visualization
- Repository filtering
- Export analytics

## Author

Prashanth Thota
