from sqlalchemy.orm import Session

from app.models.models import (
    Invoice,
    Payment
)

from app.services.retry_service import create_retry_task



def process_webhook(
    db: Session,
    invoice_id: int,
    event: str
):

    invoice = db.query(
        Invoice
    ).filter(
        Invoice.id == invoice_id
    ).first()


    if not invoice:
        raise ValueError(
            "Invoice not found"
        )


    if event == "paid":

        invoice.status = "paid"

        payment_status = "paid"



    elif event == "failed":

        invoice.status = "failed"

        payment_status = "failed"



    elif event == "refunded":

        invoice.status = "refunded"

        payment_status = "refunded"



    else:

        raise ValueError(
            "Invalid event"
        )


    payment = Payment(
        invoice_id=invoice_id,
        payment_status=payment_status
    )


    db.add(payment)

    db.commit()

    db.refresh(payment)



    # Failed payment retry creation
    if event == "failed":

        create_retry_task(
            db,
            payment.id
        )


    return payment