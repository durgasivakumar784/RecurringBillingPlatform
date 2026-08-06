from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.database.database import get_db
from app.models.models import PaymentRetry


router = APIRouter(
    prefix="/retry",
    tags=["Payment Retry"]
)


# -----------------------------
# GET RETRY QUEUE
# -----------------------------

@router.get("/")
def get_retry_queue(
    db: Session = Depends(get_db)
):

    retries = db.query(
        PaymentRetry
    ).all()


    return [

        {
            "id": retry.id,

            "payment_id": retry.payment_id,

            "retry_count": retry.retry_count,

            "max_retries": retry.max_retries,

            "status": retry.status,

            "next_retry_date": retry.next_retry_date,

            "last_retry_date": retry.last_retry_date,

            "created_at": retry.created_at
        }

        for retry in retries

    ]



# -----------------------------
# MANUAL RETRY PAYMENT
# -----------------------------

@router.put("/{retry_id}/retry")
def retry_payment_now(

    retry_id: int,

    db: Session = Depends(get_db)

):


    retry = db.query(
        PaymentRetry
    ).filter(
        PaymentRetry.id == retry_id
    ).first()



    if not retry:

        return {
            "message": "Retry record not found"
        }



    # Check retry limit

    if retry.retry_count >= retry.max_retries:


        retry.status = "failed"

        db.commit()


        return {

            "message": "Maximum retry limit reached"

        }




    # Update retry details

    retry.retry_count += 1


    retry.last_retry_date = datetime.utcnow()


    retry.status = "processing"



    db.commit()



    db.refresh(retry)



    return {

        "message": "Retry started successfully",

        "retry_id": retry.id,

        "payment_id": retry.payment_id,

        "retry_count": retry.retry_count,

        "status": retry.status

    }