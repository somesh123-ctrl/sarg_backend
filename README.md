

# Node.js Express API with MySQL Database

## Overview
This Node.js application serves as an API backend using Express.js, connecting to a MySQL database. It provides CRUD operations for managing data in a table named `DistanceTable`, as well as CSV file upload functionality to populate the database.

## Technologies Used
- Node.js
- Express.js
- MySQL (with mysql2 driver)
- multer (for file uploads)
- csv-parser (for CSV file parsing)
- dotenv (for environment variables)
- cors (for enabling CORS)

## Prerequisites
Before running the application, make sure you have the following installed:
- Node.js (https://nodejs.org/)
- MySQL Server (https://dev.mysql.com/downloads/)
- Git (https://git-scm.com/) (Optional)

## Getting Started
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up the database:**
   - Create a MySQL database and table named `DistanceTable` with the following schema:
     ```sql
     CREATE TABLE DistanceTable (
       id INT AUTO_INCREMENT PRIMARY KEY,
       DischargePort VARCHAR(255),
       SevenIslandsTotal FLOAT,
       SevenIslandsIFO FLOAT,
       SevenIslandsSECA FLOAT,
       BaltimoreTotal FLOAT,
       BaltimoreIFO FLOAT,
       BaltimoreSECA FLOAT,
       PortCartierTotal FLOAT,
       PortCartierIFO FLOAT,
       PortCartierSECA FLOAT,
       TubaraoTotal FLOAT,
       TubaraoIFO FLOAT,
       TubaraoSECA FLOAT,
       PDMTotal FLOAT,
       PDMIFO FLOAT,
       PDMSECA FLOAT,
       MurmanskTotal FLOAT,
       MurmanskIFO FLOAT,
       MurmanskSECA FLOAT
     );
     ```
   - Update `.env` file with your MySQL database credentials:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_DATABASE=your_database_name
     ```

4. **Run the application:**
   ```
   npm start
   ```
   The server will start running on `http://localhost:5000`.

## APIs
### CRUD Operations
- **Create:** POST `/data` - Create a new row in `DistanceTable`.
- **Read:** GET `/data` - Retrieve all rows from `DistanceTable`.
- **Update:** PUT `/data/:id` - Update a row in `DistanceTable` by ID.
- **Delete:** DELETE `/data/:id` - Delete a row from `DistanceTable` by ID.

### CSV File Upload
- **Upload:** POST `/upload` - Upload a CSV file containing data to populate `DistanceTable`.

## Usage
- Use tools like Postman or any HTTP client to interact with the APIs.
- Perform CRUD operations on the `/data` endpoints.
- Use `/upload` endpoint to upload CSV files containing data for bulk insertion into the database.

## Error Handling
- Proper error handling is implemented for database operations and file uploads.
- Errors are logged to the console and appropriate HTTP status codes and error messages are returned.

## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Node.js
- Express.js
- MySQL
- multer
- csv-parser

![image](https://github.com/somesh123-ctrl/sarg_backend/assets/55444715/c4632df3-5f76-406b-817d-d0f4270c3692)
![image](https://github.com/somesh123-ctrl/sarg_backend/assets/55444715/743e4e8f-7892-4125-8f90-dd75a7606a57)
![image](https://github.com/somesh123-ctrl/sarg_backend/assets/55444715/4b848a42-f340-48ed-a888-cede0de0dd32)




