# ToDo List API

This project is a simple Node.js application that provides a REST API for managing a ToDo list. It is designed as a practice exercise for working with Node.js, Express, and file-based data storage.

## Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for handling routing and HTTP requests.
- **UUID**: Library for generating unique IDs for ToDo items.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **fs**: Node.js built-in module for file system operations.

## Requirements

- **Node.js** version 12 or higher.
- A `db.json` file in the root directory, which acts as a local database for storing ToDo items in JSON format.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `db.json` file with the following structure (if it does not exist):

   ```json
   {
     "items": []
   }
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will run on port `9000` by default, or on a custom port if specified via the `PORT` environment variable.

## API Endpoints

### GET `/`

Returns a simple message confirming that the server is running.

**Response:**
Server is running

### GET `/api`

Returns the current list of ToDo items.

**Response:**

```json
{
  "items": [
    {
      "id": "unique-id",
      "body": "Task description",
      "isFinished": false,
      "createdAt": 1694567890123
    }
  ]
}
```

### POST `/api`

Adds a new ToDo item to the list.

**Request Body (Example):**

```json
{
  "body": "Task description",
  "isFinished": false
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "body": "Task description",
  "isFinished": false,
  "createdAt": 1694567890123
}
```

### DELETE `/api:itemId`

Deletes a ToDo item by its `id`.

**Response:**

- **200** OK: If the item was successfully deleted.
- **404** Not Found: If no item with the given id exists.

### PATCH `/api/:itemId`

Updates an existing ToDo item by its id. Supports partial updates.

**Request Body (Example):**

```json
{
  "body": "Updated task description",
  "isFinished": true
}
```

**Response:**

```json
{
  "id": "existing-id",
  "body": "Updated task description",
  "isFinished": true,
  "createdAt": 1694567890123
}
```

### Environment Variables

- `PORT:` The port on which the server will run. Defaults to `9000`.
- `ORIGIN:` The allowed origin for CORS. Defaults to `*` (allow all origins).

### License

This project is licensed under the MIT License.
