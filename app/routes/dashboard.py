from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db

from app.models.models import (
    Customer,
    Plan,
    Subscription,
    Invoice,
    Payment
)


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)



# ---------------- Dashboard Summary ----------------

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):

    total_customers = db.query(Customer).count()

    total_plans = db.query(Plan).count()

    total_subscriptions = db.query(Subscription).count()

    total_invoices = db.query(Invoice).count()

    total_payments = db.query(Payment).count()


    return {

        "customers": total_customers,

        "plans": total_plans,

        "subscriptions": total_subscriptions,

        "invoices": total_invoices,

        "payments": total_payments

    }





# ---------------- Revenue ----------------

@router.get("/revenue")
def revenue_summary(
    db: Session = Depends(get_db)
):

    total_revenue = db.query(
        func.sum(Invoice.amount)
    ).filter(
        Invoice.status.ilike("paid")
    ).scalar()



    if total_revenue is None:

        total_revenue = 0



    return {

        "total_revenue": total_revenue

    }







# ---------------- Payment Analytics ----------------

@router.get("/payment-analytics")
def payment_analytics(
    db: Session = Depends(get_db)
):


    success = db.query(Payment).filter(
        Payment.payment_status.ilike("success")
    ).count()



    failed = db.query(Payment).filter(
        Payment.payment_status.ilike("failed")
    ).count()



    pending = db.query(Payment).filter(
        Payment.payment_status.ilike("pending")
    ).count()



    return {

        "success": success,

        "failed": failed,

        "pending": pending

    }








# ---------------- Invoice Analytics ----------------

@router.get("/invoice-analytics")
def invoice_analytics(
    db: Session = Depends(get_db)
):


    paid = db.query(Invoice).filter(
        Invoice.status.ilike("paid")
    ).count()



    pending = db.query(Invoice).filter(
        Invoice.status.ilike("pending")
    ).count()



    failed = db.query(Invoice).filter(
        Invoice.status.ilike("failed")
    ).count()



    return {

        "paid": paid,

        "pending": pending,

        "failed": failed

    }









# ---------------- Subscription Analytics ----------------


@router.get("/subscription-analytics")
def subscription_analytics(
    db: Session = Depends(get_db)
):


    active = db.query(Subscription).filter(
        Subscription.status.ilike("active")
    ).count()



    trial = db.query(Subscription).filter(
        Subscription.status.ilike("trial")
    ).count()



    cancelled = db.query(Subscription).filter(
        Subscription.status.ilike("cancelled")
    ).count()



    return {

        "active": active,

        "trial": trial,

        "cancelled": cancelled

    }