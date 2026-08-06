from fastapi import APIRouter


router = APIRouter(
    prefix="/webhook",
    tags=["Webhook"]
)


@router.post("/payment")
def payment_webhook(
    event: dict
):

    print(
        "Webhook Received:",
        event
    )

    return {
        "message": "Webhook processed"
    }