from enum import Enum


class SubscriptionStatus(str, Enum):

    TRIAL = "Trial"

    ACTIVE = "Active"

    PAST_DUE = "Past Due"

    CANCELLED = "Cancelled"