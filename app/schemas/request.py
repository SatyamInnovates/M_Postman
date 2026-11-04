from pydantic import BaseModel,HttpUrl
from typing import Optional

class RequestSchema(BaseModel):
    method:str
    url:HttpUrl
    headers:dict = {}
    params:dict = {}
    body:Optional[dict] = None
    