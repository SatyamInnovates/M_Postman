import httpx
from fastapi import APIRouter,HTTPException

router = APIRouter(prefix="/api", tags=["Requests"])


@router.post("/request")
async def send_request(data: dict):
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:

            response = await client.request(
                method=data["method"],
                url=data["url"],
                headers=data.get("headers", {}),
                params=data.get("params", {}),
                json=data.get("body")
            )

            return {
                "status_code": response.status_code,
                "headers": dict(response.headers),
                "body": response.text
            }
    except Exception:
        raise HTTPException(
            status_code=504,
            detail="Request timed out"
        )






