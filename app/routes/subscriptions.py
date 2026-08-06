from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import Subscription

from app.services.subscription_service import (
    pause_subscription,
    resume_subscription,
    cancel_subscription,
    change_subscription_status
)


router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"]
)


# ---------------- CREATE SUBSCRIPTION ----------------

@router.post("/")
def create_subscription(
    customer_id: int,
    plan_id: int,
    db: Session = Depends(get_db)
):

    subscription = Subscription(
        customer_id=customer_id,
        plan_id=plan_id,
        status="Trial"
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    return subscription



# ---------------- CHANGE STATUS ----------------

@router.put("/{subscription_id}/status")
def update_subscription_status(
    subscription_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    try:

        subscription = change_subscription_status(
            db,
            subscription_id,
            status
        )

        return {
            "message": "Status updated successfully",
            "subscription_id": subscription.id,
            "new_status": subscription.status
        }


    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )



# ---------------- GET ALL ----------------

@router.get("/")
def get_subscriptions(
    db: Session = Depends(get_db)
):

    return db.query(Subscription).all()



# ---------------- GET ONE ----------------

@router.get("/{subscription_id}")
def get_subscription(
    subscription_id: int,
    db: Session = Depends(get_db)
):

    subscription = (
        db.query(Subscription)
        .filter(
            Subscription.id == subscription_id
        )
        .first()
    )


    if not subscription:

        raise HTTPException(
            status_code=404,
            detail="Subscription not found"
        )


    return subscription



# ---------------- PAUSE ----------------

@router.put("/pause/{subscription_id}")
def pause(
    subscription_id: int,
    db: Session = Depends(get_db)
):

    try:

        return pause_subscription(
            db,
            subscription_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )



# ---------------- RESUME ----------------

@router.put("/resume/{subscription_id}")
def resume(
    subscription_id: int,
    db: Session = Depends(get_db)
):

    try:

        return resume_subscription(
            db,
            subscription_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )



# ---------------- CANCEL ----------------

@router.put("/cancel/{subscription_id}")
def cancel(
    subscription_id: int,
    db: Session = Depends(get_db)
):

    try:

        return cancel_subscription(
            db,
            subscription_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )