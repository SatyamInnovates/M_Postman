# M_Postman 🚀

A lightweight, web-based API testing tool built with **FastAPI, Python, HTTPX, and Vanilla JavaScript**.

Send HTTP requests, configure request parameters, and inspect API responses directly from your browser.

## 🌐 Live Demo

**[Open M_Postman](https://mpostman-production.up.railway.app/)**

![M_Postman Interface](https://github.com/user-attachments/assets/d56bc2c4-b817-4589-8000-a09f252306b3)

*The free hosting service may take a few seconds to start.*

## ✨ Features

- **HTTP Methods:** GET, POST, PUT, PATCH, and DELETE.
- **Custom Headers:** Add and manage request headers.
- **Query Parameters:** Configure URL query parameters.
- **JSON Request Body:** Send JSON payloads.
- **Response Viewer:** Inspect response status, headers, and body.
- **Response Cookies:** View cookies and their attributes.
- **Response Time:** Measure request execution time.
- **Error Handling:** Handle request timeouts, invalid URLs, and connection errors.

## 🛠️ Tech Stack

- Python
- FastAPI
- HTTPX
- Pydantic
- HTML
- CSS
- Vanilla JavaScript

## ⚠️ Error Handling Examples

M_Postman provides error feedback when requests cannot be completed successfully.

### 1. Invalid URL

![Invalid URL Error](https://github.com/user-attachments/assets/2e3b3342-0abb-4e12-8e6d-fbc43aae67bb)

**Cause:** The entered URL is invalid or incorrectly formatted.

**Solution:** Check the URL and make sure you are using a valid API endpoint.

### 2. Request Timeout

![Request Timeout Error](https://github.com/user-attachments/assets/8067e303-862a-4a97-bd88-91ac35a77cd8)

**Cause:** The target API takes longer than the configured 10-second timeout to respond.

**Solution:** Check the target server or try again later.

### 3. Too Many Requests

![Rate Limit Error](https://github.com/user-attachments/assets/88dcc8f0-18e1-4472-a65f-25b77ae691ef)

**Cause:** The target API or hosting service may have reached its request rate limit.

**Solution:** Wait before sending another request. Check the API's rate-limit policy if the problem continues.

## 💻 Run Locally (Optional)

M_Postman is designed to run as a web application, but you can also run it locally.

### Requirements

- Python 3.11+
- Git

### Setup

Clone the repository and navigate to the project directory.

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

```text
http://127.0.0.1:8000
```

API documentation:

```text
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
