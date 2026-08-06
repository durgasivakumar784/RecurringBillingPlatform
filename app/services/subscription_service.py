from sqlalchemy.orm import Session

from app.models.models import Subscription



VALID_TRANSITIONS = {

    "trial": [
        "active",
        "cancelled"
    ],

    "active": [
        "past_due",
        "cancelled"
    ],

    "past_due": [
        "active",
        "cancelled"
    ],

    "cancelled": []

}



def change_subscription_status(
    db: Session,
    subscription_id: int,
    new_status: str
):


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


    current_status = subscription.status.lower()

    new_status = new_status.lower()



    allowed_statuses = VALID_TRANSITIONS.get(
        current_status,
        []
    )



    if new_status not in allowed_statuses:

        raise ValueError(
            f"Invalid transition {current_status} -> {new_status}"
        )



    subscription.status = new_status


    db.commit()

    db.refresh(subscription)



    return subscription





def pause_subscription(
    db: Session,
    subscription_id:int
):

    return change_subscription_status(
        db,
        subscription_id,
        "past_due"
    )





def resume_subscription(
    db: Session,
    subscription_id:int
):

    return change_subscription_status(
        db,
        subscription_id,
        "active"
    )





def cancel_subscription(
    db: Session,
    subscription_id:int
):

    return change_subscription_status(
        db,
        subscription_id,
        "cancelled"
    )