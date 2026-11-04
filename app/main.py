from fastapi import FastAPI
from app.routers.requests import router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Mini Postman",
    description="A lightweight API testing tool",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# main app here let me drink waterrr





