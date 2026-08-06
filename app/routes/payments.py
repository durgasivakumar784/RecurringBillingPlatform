from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.schemas import (
    PaymentRequest,
    PaymentWebhook
)

from app.models.models import Payment

from app.services.payment_service import process_payment
from app.services.webhook_service import process_webhook



router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)



# ---------------- GET ALL PAYMENTS ----------------

@router.get("/")
def get_payments(
    db: Session = Depends(get_db)
):

    payments = db.query(Payment).all()

    return payments




# ---------------- PAYMENT PROCESS ----------------

@router.post("/process")
def payment_process(
    request: PaymentRequest,
    db: Session = Depends(get_db)
):

    try:

        payment = process_payment(
            db,
            request.invoice_id,
            request.success
        )


        return {
            "message": "Payment processed",
            "payment": payment
        }


    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )




# ---------------- PAYMENT WEBHOOK ----------------

@router.post("/webhook")
def payment_webhook(
    request: PaymentWebhook,
    db: Session = Depends(get_db)
):

    try:

        payment = process_webhook(
            db,
            request.invoice_id,
            request.event
        )


        return {
            "message": "Webhook processed",
            "payment": payment
        }


    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )