import random


def process_payment(amount: float):

    success = random.choice(
        [True, False]
    )

    if success:

        return {
            "status": "paid",
            "transaction_id": random.randint(
                100000,
                999999
            )
        }

    return {
        "status": "failed",
        "transaction_id": None
    }