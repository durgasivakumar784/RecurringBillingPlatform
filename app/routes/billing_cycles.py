from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import BillingCycle
from app.schemas.schemas import (
    BillingCycleCreate,
    BillingCycleResponse
)


router = APIRouter(
    prefix="/billing-cycles",
    tags=["Billing Cycles"]
)


@router.post(
    "/",
    response_model=BillingCycleResponse
)
def create_billing_cycle(
    cycle: BillingCycleCreate,
    db: Session = Depends(get_db)
):

    new_cycle = BillingCycle(
        subscription_id=cycle.subscription_id,
        billing_date=cycle.billing_date,
        next_billing_date=cycle.next_billing_date,
        status="pending"
    )

    db.add(new_cycle)
    db.commit()
    db.refresh(new_cycle)

    return new_cycle



@router.get(
    "/",
    response_model=list[BillingCycleResponse]
)
def get_billing_cycles(
    db: Session = Depends(get_db)
):

    return db.query(BillingCycle).all()