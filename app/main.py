from fastapi import FastAPI
from fastapi.responses import FileResponse
from app.routers.requests import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
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
app.mount("/static", StaticFiles(directory=Path(__file__).parent / "static"), name="static")

@app.get("/")
async def home():
    return FileResponse(Path(__file__).parent / "static" / "index.html")

# main app here let me drink waterrr





