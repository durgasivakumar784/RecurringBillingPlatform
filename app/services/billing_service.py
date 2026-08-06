from sqlalchemy.orm import Session

from app.models.usage import Usage


def calculate_usage_charges(
    customer_id: int,
    db: Session
):

    usages = (
        db.query(Usage)
        .filter(
            Usage.customer_id == customer_id
        )
        .all()
    )

    total_usage_charge = 0

    for usage in usages:
        total_usage_charge += usage.total_amount

    return total_usage_charge



def calculate_invoice_total(
    subscription_amount: float,
    customer_id: int,
    db: Session
):

    usage_charge = calculate_usage_charges(
        customer_id,
        db
    )

    final_amount = (
        subscription_amount +
        usage_charge
    )

    return {
        "subscription_amount": subscription_amount,
        "usage_charge": usage_charge,
        "final_amount": final_amount
    }



# Existing billing route support
def generate_invoices(
    db: Session
):

    return {
        "message": "Invoice generation started"
    }