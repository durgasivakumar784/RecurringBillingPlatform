from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database.database import get_db
from app.models import models

from app.services.tax_service import calculate_tax
from app.utils.pdf_generator import generate_invoice_pdf


router = APIRouter(
    prefix="/invoices",
    tags=["Invoices"]
)



# ---------------- GENERATE INVOICE ----------------

@router.post("/generate/{subscription_id}")
def generate_invoice(
    subscription_id: int,
    db: Session = Depends(get_db)
):


    # Find Subscription

    subscription = (
        db.query(models.Subscription)
        .filter(
            models.Subscription.id == subscription_id
        )
        .first()
    )


    if not subscription:

        raise HTTPException(
            status_code=404,
            detail="Subscription not found"
        )



    # Find Plan

    plan = (
        db.query(models.Plan)
        .filter(
            models.Plan.id == subscription.plan_id
        )
        .first()
    )


    if not plan:

        raise HTTPException(
            status_code=404,
            detail="Plan not found"
        )



    # Find Customer

    customer = (
        db.query(models.Customer)
        .filter(
            models.Customer.id == subscription.customer_id
        )
        .first()
    )


    if not customer:

        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )




    # -------- TAX CALCULATION --------


    tax = calculate_tax(

        db,

        amount=plan.price,

        country="India",

        state="Tamil Nadu"

    )



    print("PLAN PRICE:", plan.price)

    print("TAX:", tax)



    # -------- CREATE INVOICE --------


    invoice = models.Invoice(

        subscription_id=subscription.id,

        invoice_number=
        f"INV-{datetime.now().strftime('%Y%m%d%H%M%S')}",

        amount=tax["total"],

        tax_amount=tax["tax"],

        status="pending"

    )


    db.add(invoice)

    db.commit()

    db.refresh(invoice)




    # -------- GENERATE PDF --------


    pdf_path = generate_invoice_pdf(
        invoice
    )


    print(
        "PDF CREATED:",
        pdf_path
    )




    return invoice





# ---------------- GET ALL INVOICES ----------------


@router.get("/")
def get_invoices(
    db: Session = Depends(get_db)
):

    return (
        db.query(models.Invoice)
        .all()
    )





# ---------------- GET SINGLE INVOICE ----------------


@router.get("/{invoice_id}")
def get_invoice(

    invoice_id:int,

    db:Session = Depends(get_db)

):


    invoice = (

        db.query(models.Invoice)

        .filter(
            models.Invoice.id == invoice_id
        )

        .first()

    )


    if not invoice:

        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )


    return invoice





# ---------------- DELETE INVOICE ----------------


@router.delete("/{invoice_id}")
def delete_invoice(

    invoice_id:int,

    db:Session = Depends(get_db)

):


    invoice = (

        db.query(models.Invoice)

        .filter(
            models.Invoice.id == invoice_id
        )

        .first()

    )


    if not invoice:

        raise HTTPException(
            status_code=404,
            detail="Invoice not found"
        )



    db.delete(invoice)

    db.commit()


    return {

        "message":
        "Invoice deleted successfully"

    }