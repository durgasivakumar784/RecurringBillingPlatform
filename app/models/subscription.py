from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime

from app.database.database import Base


class Subscription(Base):

    __tablename__ = "subscriptions"

    __table_args__ = {
        "extend_existing": True
    }

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    plan_id = Column(
        Integer,
        ForeignKey("plans.id")
    )

    status = Column(
        String,
        default="Active"
    )

    start_date = Column(
        DateTime,
        default=datetime.utcnow
    )