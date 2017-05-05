[![CircleCI](https://circleci.com/gh/reccanti/StudentRecords.svg?style=svg)](https://circleci.com/gh/reccanti/StudentRecords) [![Coverage Status](https://coveralls.io/repos/github/reccanti/StudentRecords/badge.svg?branch=master)](https://coveralls.io/github/reccanti/StudentRecords?branch=master)

# StudentRecords

This is a Node.js server that creates a RESTful API for accessing the contents of a MariaDB database. Users can interact directly with the HTTP endpoints, or they can use the [Command Line Tool](https://github.com/reccanti/StudentRecordsClient)

For this project, I wanted to maintain a distinction between the client and the server so that multiple and different types of clients could potentially connect to the same server. This server provides Models to represent the Major database tables - Student, Courses, and Majors, and creates Controllers to make them accessible as server endpoints. Models are meant to model database information and provide general-purpose utilities, while Controllers are meant to handle validation and more complex queries. Validation is handled mostly on the server, while accessing and filtering data is handled on the database whenever possible.

## Requirements

- **Node.js** >= 7.10.0
- **npm** >= 4.3.0

## Setup

To run the server locally, do the following steps:

1. Clone the repo using `git clone https://github.com/reccanti/StudentRecords.git` and navigate into that directory that was created
2. install dependencies using `npm install`
3. Copy the `.env.example.js` file using `cp .env.example.js > .env.example.js`. Replace the placeholder data with your database credentials. Select a Port for your server.
4. Start the server using `npm start`. This should compile the TypeScript files and start the server

## API

### Student

#### `GET /student/`

Get a list of all students in the database

#### `GET /student/:id`

Get information about a single student in the database

#### `GET /student/:id/availableCourses`

Get a list of all the courses that are available to a student

#### `POST /student/enroll/`

Attempt to enroll a student in a given course. 

##### Parameters:

- **student_id** the id of the student we want to enroll in the course
- **course_id** the id of the course we want to enroll the student in

##### Statuses:

- **405** The student is not allowed to enroll in the given course
- **409** The student is already enrolled in the given course
- **201** The student is successfully enrolled in the given course

### Course

#### `GET /course/`

Get a list of all courses in the database

#### `GET /course/:id/`

Get information about a single course in the database

#### `GET /course/:id/enrolledStudents`

Get a list of students currently enrolled in the course

### Major

#### `GET /major/`

Get a list of all majors in the database

#### `GET /major/:id`

Get information about a single Major in the database
