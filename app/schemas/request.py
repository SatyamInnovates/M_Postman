from pydantic import BaseModel
from typing import Optional

class RequestSchema(BaseModel):
    method:str
    url:str
    headers:dict = {}
    params:dict = {}
    body:Optional[dict] = None

