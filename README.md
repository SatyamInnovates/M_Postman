# M_Postman 🚀

A lightweight, web-based API testing tool built with **FastAPI, Python, HTTPX, and Vanilla JavaScript**.

Test APIs, configure requests, and inspect responses directly from your browser.

## 🌐 Live Demo

**[Open M_Postman](https://mpostman-production.up.railway.app/)**

*The free hosting service may take a few seconds to start.*

## ✨ Features

- **HTTP Methods:** GET, POST, PUT, PATCH, DELETE.
- **Custom Headers:** Add and manage request headers.
- **Query Parameters:** Configure URL parameters.
- **JSON Request Body:** Send JSON payloads.
- **Response Viewer:** Inspect response status, headers, and body.
- **Response Cookies:** View cookies and their attributes.
- **Response Time:** Measure request execution time.
- **Error Handling:** Handle request timeouts and connection errors.

## 🛠️ Tech Stack

- Python
- FastAPI
- HTTPX
- Pydantic
- HTML, CSS, JavaScript

## 📸 Screenshots

*Screenshots of the application and API responses will be added here.*

## 💻 Run Locally (Optional)

M_Postman is primarily designed to be used as a web application. However, you can also run it locally.

### Requirements

- Python 3.11+
- Git

### Setup

Clone the repository from GitHub and navigate to its project directory.

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it:

**Linux / macOS**
```bash
source .venv/bin/activate
```

**Windows**
```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the application:

```bash
fastapi dev app/main.py
```

Open the application:

```bash
http://127.0.0.1:8000
```

API Documentation:

```bash
http://127.0.0.1:8000/docs
```




## 🔌 Backend API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/request` | Sends an HTTP request to an external API |

## 👨‍💻 Author

**Satyam Kumar**

---

If you find M_Postman useful, consider giving the repository a ⭐.
