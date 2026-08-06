from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.models import PaymentRetry



def create_retry_task(
    db: Session,
    payment_id: int
):

    retry = PaymentRetry(

        payment_id=payment_id,

        retry_count=0,

        max_retries=3,

        next_retry_date=
        datetime.utcnow()
        + timedelta(days=1),

        status="pending"
    )


    db.add(retry)

    db.commit()

    db.refresh(retry)


    return retry