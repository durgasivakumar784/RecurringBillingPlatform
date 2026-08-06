from sqlalchemy.orm import Session

from app.models.models import (
    Invoice,
    Subscription,
    Plan,
    Customer
)

from app.utils.invoice_generator import generate_invoice_number
from app.utils.pdf_generator import generate_invoice_pdf

from app.services.tax_service import calculate_tax
from app.services.email_service import send_invoice_email



def generate_invoice(
    db: Session,
    subscription_id: int
):


    # Get Subscription

    subscription = (
        db.query(Subscription)
        .filter(
            Subscription.id == subscription_id
        )
        .first()
    )


    if not subscription:

        raise ValueError(
            "Subscription not found"
        )



    # Get Plan

    plan = (
        db.query(Plan)
        .filter(
            Plan.id == subscription.plan_id
        )
        .first()
    )


    if not plan:

        raise ValueError(
            "Plan not found"
        )



    # Get Customer

    customer = (
        db.query(Customer)
        .filter(
            Customer.id == subscription.customer_id
        )
        .first()
    )


    if not customer:

        raise ValueError(
            "Customer not found"
        )



    # ---------------- TAX CALCULATION ----------------


    tax = calculate_tax(
        db,
        amount=plan.price,
        country="India",
        state="Tamil Nadu"
    )


    print("PLAN PRICE:", plan.price)
    print("TAX RESULT:", tax)



    # ---------------- CREATE INVOICE ----------------


    invoice = Invoice(

        subscription_id=subscription.id,

        invoice_number=generate_invoice_number(),

        amount=tax["total"],

        tax_amount=tax["tax"],

        status="pending"

    )


    db.add(invoice)

    db.commit()

    db.refresh(invoice)



    # ---------------- PDF GENERATION ----------------


    pdf_path = generate_invoice_pdf(
        invoice
    )



    # ---------------- EMAIL ----------------


    send_invoice_email(

        receiver_email=customer.email,

        subject="Invoice Generated",

        body="Your invoice has been generated successfully.",

        attachment_path=pdf_path

    )



    return invoice