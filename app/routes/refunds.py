from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.models import Refund

from app.services.refund_service import process_refund



router = APIRouter(
    prefix="/refunds",
    tags=["Refunds"]
)



# ---------------- GET ALL REFUNDS ----------------

@router.get("/")
def get_refunds(

    db: Session = Depends(get_db)

):

    refunds = db.query(
        Refund
    ).all()


    return refunds





# ---------------- CREATE REFUND ----------------

@router.post("/{invoice_id}")
def refund_invoice(

    invoice_id: int,
    amount: float,
    reason: str,
    db: Session = Depends(get_db)

):

    try:

        refund = process_refund(
            db,
            invoice_id,
            amount,
            reason
        )

        return refund


    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )