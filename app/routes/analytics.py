from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import Subscription
from app.models.models import Plan


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/mrr")
def get_mrr(
    db: Session = Depends(get_db)
):

    subscriptions = (
        db.query(Subscription)
        .filter(
            Subscription.status == "Active"
        )
        .all()
    )

    total_mrr = 0

    for subscription in subscriptions:

        plan = (
            db.query(Plan)
            .filter(
                Plan.id == subscription.plan_id
            )
            .first()
        )

        if plan:
            total_mrr += plan.price


    return {
        "active_subscriptions": len(subscriptions),
        "current_mrr": total_mrr
    }