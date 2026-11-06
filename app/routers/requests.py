import httpx
from http.cookies import SimpleCookie
from fastapi import APIRouter,HTTPException
import time
from app.schemas.request import RequestSchema

router = APIRouter(prefix="/api", tags=["Requests"])



@router.post("/request")
async def send_request(data: RequestSchema):
    start = time.perf_counter()
    try:
        async with httpx.AsyncClient(timeout=15.0,follow_redirects=True) as client:

            response = await client.request(
                method=data.method,
                url=str(data.url),
                headers=data.headers,
                params=data.params,
                json=data.body
            )
            response_cookies = {}
            for cookie_response in [*response.history, response]:
                for set_cookie in cookie_response.headers.get_list("set-cookie"):
                    parsed_cookie = SimpleCookie()
                    parsed_cookie.load(set_cookie)
                    for name, cookie in parsed_cookie.items():
                        domain = cookie["domain"] or cookie_response.url.host
                        path = cookie["path"] or "/"
                        key = (name, domain, path)
                        response_cookies[key] = {
                            "name": name,
                            "value": cookie.value,
                            "domain": domain,
                            "path": path,
                            "secure": bool(cookie["secure"]),
                            "httponly": bool(cookie["httponly"]),
                            "samesite": cookie["samesite"] or None
                        }
            cookies = list(response_cookies.values())


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
                "body": body,
                "cookies":cookies
            }





