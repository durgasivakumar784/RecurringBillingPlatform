from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.auth.security import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(user: LoginRequest):

    # Demo Admin Credentials
    if user.email == "admin@gmail.com" and user.password == "Admin@123":

        token = create_access_token(
            {"sub": user.email}
        )

        return {
            "message": "Login Successful",
            "access_token": token,
            "token_type": "bearer"
        }

    raise HTTPException(
        status_code=401,
        detail="Invalid Email or Password"
    )