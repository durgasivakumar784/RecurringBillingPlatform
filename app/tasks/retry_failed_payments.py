from app.celery_worker import celery
from app.database.database import SessionLocal

from app.models.models import (
    PaymentRetry,
    Payment,
    AuditLog
)


@celery.task(name="app.tasks.retry_failed_payments")
def retry_failed_payments():

    db = SessionLocal()

    try:

        retries = db.query(
            PaymentRetry
        ).filter(
            PaymentRetry.status == "pending"
        ).all()


        for retry in retries:

            payment = db.query(
                Payment
            ).filter(
                Payment.id == retry.payment_id
            ).first()


            if payment:

                # Mock retry payment success
                payment.payment_status = "paid"


                retry.status = "completed"

                retry.retry_count += 1


                audit = AuditLog(
                    entity="Payment",
                    entity_id=payment.id,
                    action="RETRY_SUCCESS",
                    description="Payment retry completed successfully"
                )


                db.add(audit)


        db.commit()

        return "Retry completed"


    except Exception as e:

        db.rollback()
        return str(e)


    finally:

        db.close()