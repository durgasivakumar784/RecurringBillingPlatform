from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.billing_service import generate_invoices

router = APIRouter(
    prefix="/billing",
    tags=["Billing"]
)


@router.post("/run")
def run_billing(db: Session = Depends(get_db)):
    generate_invoices(db)
    return {
        "message": "Billing Completed"
    }