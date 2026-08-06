from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models import models


router = APIRouter(
    prefix="/plans",
    tags=["Plans"]
)


# Create Plan
@router.post("/")
def create_plan(
    name: str,
    price: float,
    billing_cycle: str,
    db: Session = Depends(get_db)
):

    try:
        plan = models.Plan(
            name=name,
            price=price,
            billing_cycle=billing_cycle,
            trial_days=0,
            is_active="true"
        )

        db.add(plan)
        db.commit()
        db.refresh(plan)

        return plan

    except Exception as e:
        db.rollback()
        raise e



# Get All Plans
@router.get("/")
def get_plans(
    db: Session = Depends(get_db)
):

    plans = db.query(models.Plan).all()

    return plans



# Get Single Plan
@router.get("/{plan_id}")
def get_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):

    plan = (
        db.query(models.Plan)
        .filter(models.Plan.id == plan_id)
        .first()
    )

    if not plan:
        return {
            "message": "Plan not found"
        }

    return plan



# Delete Plan
@router.delete("/{plan_id}")
def delete_plan(
    plan_id: int,
    db: Session = Depends(get_db)
):

    plan = (
        db.query(models.Plan)
        .filter(models.Plan.id == plan_id)
        .first()
    )

    if not plan:
        return {
            "message": "Plan not found"
        }

    db.delete(plan)
    db.commit()

    return {
        "message": "Plan deleted successfully"
    }