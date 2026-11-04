import httpx
from fastapi import APIRouter,HTTPException
import time
from app.schemas.request import RequestSchema

router = APIRouter(prefix="/api", tags=["Requests"])


@router.post("/request")
async def send_request(data: RequestSchema):
    start = time.perf_counter()
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:

            response = await client.request(
                method=data.method,
                url=str(data.url),
                headers=data.headers,
                params=data.params,
                json=data.body
            )

            end = time.perf_counter()
            try:
                body = response.json()
            except ValueError:
                body = response.text
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Request timed out"
        )  

        
    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="request failed"
        )


    return {
                "status_code": response.status_code,
                "response_time":((end - start) * 1000),
                "headers": dict(response.headers),
                "body": body
            }





