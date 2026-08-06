from sqlalchemy.orm import Session
from app.models.models import Payment, Invoice


def process_payment(
    db: Session,
    invoice_id: int,
    success: bool
):

    invoice = db.query(Invoice).filter(
        Invoice.id == invoice_id
    ).first()


    if not invoice:
        raise Exception("Invoice not found")


    if success:

        invoice.status = "paid"

        payment = Payment(
            invoice_id=invoice_id,
            payment_status="success"
        )

    else:

        invoice.status = "failed"

        payment = Payment(
            invoice_id=invoice_id,
            payment_status="failed"
        )


    db.add(payment)

    db.commit()

    db.refresh(payment)


    return payment