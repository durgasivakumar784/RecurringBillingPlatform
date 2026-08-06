from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    email: str
    password: str



@router.post("/login")
def login(request: LoginRequest):

    if request.email == "admin@gmail.com" and request.password == "Admin@123":

        return {
            "message": "Login Successful",
            "access_token": "admin-token"
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid Email or Password"
    )