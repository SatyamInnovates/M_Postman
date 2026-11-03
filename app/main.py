from fastapi import FastAPI

app = FastAPI(
    title="Mini Postman",
    description="A lightweight API testing tool",
    version="1.0.0"
)


@app.get("/")
async def root():
    return {"message": "Mini Postman API is running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}