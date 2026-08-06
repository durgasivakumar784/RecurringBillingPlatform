from enum import Enum


class SubscriptionStatus(str, Enum):
    TRIAL = "trial"
    ACTIVE = "active"
    PAST_DUE = "past_due"
    CANCELLED = "cancelled"


VALID_TRANSITIONS = {

    SubscriptionStatus.TRIAL: [
        SubscriptionStatus.ACTIVE,
        SubscriptionStatus.CANCELLED
    ],

    SubscriptionStatus.ACTIVE: [
        SubscriptionStatus.PAST_DUE,
        SubscriptionStatus.CANCELLED
    ],

    SubscriptionStatus.PAST_DUE: [
        SubscriptionStatus.ACTIVE,
        SubscriptionStatus.CANCELLED
    ],

    SubscriptionStatus.CANCELLED: []
}


def is_valid_transition(current, new):

    return new in VALID_TRANSITIONS[current]