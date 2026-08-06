from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.usage import Usage


router = APIRouter(
    prefix="/usage",
    tags=["Usage"]
)


# Add usage record
@router.post("/")
def create_usage(
    customer_id: int,
    subscription_id: int,
    usage_type: str,
    quantity: int,
    unit_price: float,
    db: Session = Depends(get_db)
):

    total_amount = quantity * unit_price

    usage = Usage(
        customer_id=customer_id,
        subscription_id=subscription_id,
        usage_type=usage_type,
        quantity=quantity,
        unit_price=unit_price,
        total_amount=total_amount
    )

    db.add(usage)
    db.commit()
    db.refresh(usage)

    return {
        "message": "Usage added successfully",
        "usage_id": usage.id,
        "total_amount": usage.total_amount
    }


# Get all usage records
@router.get("/")
def get_usage(
    db: Session = Depends(get_db)
):

    usages = db.query(Usage).all()

    return usages


# Get customer usage
@router.get("/customer/{customer_id}")
def get_customer_usage(
    customer_id: int,
    db: Session = Depends(get_db)
):

    usages = (
        db.query(Usage)
        .filter(
            Usage.customer_id == customer_id
        )
        .all()
    )

    return usages