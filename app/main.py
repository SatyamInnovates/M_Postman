from fastapi import FastAPI
from app.routers.requests import router

app = FastAPI(
    title="Mini Postman",
    description="A lightweight API testing tool",
    version="1.0.0"
)

app.include_router(router)

