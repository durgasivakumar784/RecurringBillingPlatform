from sqlalchemy.orm import Session

from app.models.models import (
    Refund,
    Invoice
)


def process_refund(
    db: Session,
    invoice_id: int,
    amount: float,
    reason: str
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

    refund = Refund(
        invoice_id=invoice.id,
        amount=amount,
        reason=reason,
        status="processed"
    )

    db.add(refund)

    invoice.status = "refunded"

    db.commit()

    db.refresh(refund)

    return refund