# M_Postman 🚀

A lightweight, browser-based API testing tool inspired by Postman, built with **FastAPI, Python, HTTPX, and Vanilla JavaScript**.

M_Postman allows developers to send HTTP requests, configure headers and query parameters, submit JSON request bodies, and inspect server responses through a simple interface.

## ✨ Features

- **HTTP Methods:** Supports GET, POST, PUT, PATCH, and DELETE.
- **Custom Headers:** Add and configure request headers.
- **Query Parameters:** Send query parameters with requests.
- **Request Body:** Send JSON payloads for supported HTTP methods.
- **Response Viewer:** View response status codes, headers, and body.
- **Response Cookies:** Inspect cookies and their attributes.
- **Response Time:** Measure how long a request takes.
- **JSON Support:** Automatically parse JSON responses.
- **Error Handling:** Handle request timeouts and connection errors.
- **Simple Interface:** Lightweight frontend built with HTML, CSS, and JavaScript.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | REST API framework |
| HTTPX | Sending asynchronous HTTP requests |
| Pydantic | Request data validation |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend functionality |

## 📁 Project Structure

```text
M_Postman/
│
├── app/
│   ├── main.py
│   │
│   ├── routers/
│   │   └── requests.py
│   │
│   ├── schemas/
│   │   └── request.py
│   │
│   └── static/
│       ├── index.html
│       ├── style.css
│       └── index.js
│
├── requirements.txt
├── .gitignore
└── README.md
```

## 🌐 Try M_Postman Online

You can access the deployed version of M_Postman here:

**Live Demo:** [M_Postman](https://m-postman.onrender.com/)

Wait a few seconds while it starts.

No installation is required. Open the link and start testing APIs directly from your browser.

### How to Test

1. Open the deployed application.
2. Select an HTTP method (GET, POST, PUT, PATCH, or DELETE).
3. Enter an API endpoint URL.
4. Add headers or query parameters if required.
5. Provide a JSON request body for POST, PUT, or PATCH requests.
6. Click **Send**.
7. Inspect the response status, response time, headers, cookies, and body.

### APIs Used for Testing

- **JSONPlaceholder:** GET, POST, PUT, PATCH, and DELETE requests.
- **HTTPBin:** Custom headers, query parameters, and cookies.
- **Groq API:** Authenticated requests with JSON payloads.
- **OpenWeatherMap API:** API requests using query parameters and API keys.

*Note: JSONPlaceholder simulates write operations. Changes made through POST, PUT, PATCH, and DELETE requests are not permanently stored.*

## 💻 Run M_Postman Locally

If you want to run M_Postman on your own machine, follow these steps.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/M_Postman.git
```

### 2. Navigate to the project directory

```bash
cd M_Postman
```

### 3. Create a virtual environment

```bash
python -m venv .venv
```

### 4. Activate the virtual environment

**Linux / macOS:**

```bash
source .venv/bin/activate
```

**Windows:**

```bash
.venv\Scripts\activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the application

```bash
uvicorn app.main:app --reload
```

### 7. Open M_Postman

Visit the following URL in your browser:

```text
http://127.0.0.1:8000
```

**API Documentation:** `http://127.0.0.1:8000/docs`

## 🔌 API Endpoint

M_Postman uses a FastAPI backend to process HTTP requests.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/request` | Send an HTTP request to an external API |

### Example Request

```json
{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "headers": {},
  "params": {},
  "body": null
}
```

### Example Response

```json
{
  "status_code": 200,
  "response_time": 120.5,
  "headers": {},
  "body": {
    "userId": 1,
    "id": 1,
    "title": "Example title",
    "body": "Example response body"
  },
  "cookies": []
}
```

*The response values above are illustrative.*

## 🚀 Deployment

M_Postman can be deployed as a FastAPI web service on platforms such as Render.

Before deploying:

1. Push the project to GitHub.
2. Configure the production start command.
3. Ensure the frontend uses relative API paths.
4. Configure environment variables where required.
5. Implement security protections before exposing the request proxy publicly.

## 🔒 Security Note

M_Postman forwards requests to external URLs. A publicly accessible deployment should implement protections against Server-Side Request Forgery (SSRF), unauthorized usage, abuse, and access to internal network resources.

Never commit API keys, credentials, or other sensitive information to GitHub.

## 🎯 Project Goal

The goal of M_Postman is to understand how API testing tools work internally by building a simplified alternative from scratch.

This project demonstrates practical knowledge of:

- REST API development
- Asynchronous HTTP requests
- FastAPI routing
- Pydantic validation
- Frontend and backend integration
- HTTP methods, headers, parameters, and responses
- Error handling and API debugging

## 👨‍💻 Author

**Satyam Kumar**

GitHub: [Your GitHub Profile](https://github.com/your-username)

---

⭐ If you find this project useful, consider giving it a star!
