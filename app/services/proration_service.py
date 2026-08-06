from datetime import datetime


def calculate_proration(
    old_price: float,
    new_price: float,
    days_used: int,
    total_days: int = 30
):

    unused_days = total_days - days_used

    old_credit = (
        old_price / total_days
    ) * unused_days

    new_charge = (
        new_price / total_days
    ) * unused_days

    amount_to_pay = (
        new_charge - old_credit
    )

    return {
        "unused_days": unused_days,
        "old_plan_credit": round(old_credit, 2),
        "new_plan_charge": round(new_charge, 2),
        "amount_to_pay": round(amount_to_pay, 2)
    }