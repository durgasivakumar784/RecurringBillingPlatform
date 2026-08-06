from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import Subscription
from app.services.proration_service import calculate_proration

router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"]
)


@router.put("/change-plan/{subscription_id}")
def change_plan(
    subscription_id: int,
    new_plan_price: float,
    db: Session = Depends(get_db)
):

    subscription = db.query(
        Subscription
    ).filter(
        Subscription.id == subscription_id
    ).first()

    if not subscription:
        return {
            "message": "Subscription not found"
        }

    result = calculate_proration(
        old_price=1000,
        new_price=new_plan_price,
        days_used=15
    )

    return result