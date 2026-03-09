# CRUD API (Students)

Simple CRUD API using Node.js + Express with an in-memory data store.

## Run

```bash
npm install
npm start
```

Server runs on `http://localhost:3000` by default.

## Endpoints

- `GET /` health check
- `POST /students` create student
- `GET /students` list students
- `GET /students/:id` get student
- `PUT /students/:id` update student
- `DELETE /students/:id` delete student

### Example payload

```json
{
  "name": "Asha",
  "email": "asha@example.com"
}
```
