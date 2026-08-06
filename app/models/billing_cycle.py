from sqlalchemy import Column, Integer, DateTime, String, ForeignKey
from datetime import datetime

from app.database.database import Base


class BillingCycle(Base):

    __tablename__ = "billing_cycles"

    __table_args__ = {
        "extend_existing": True
    }

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    subscription_id = Column(
        Integer,
        ForeignKey("subscriptions.id")
    )

    billing_date = Column(
        DateTime,
        default=datetime.utcnow
    )

    status = Column(
        String,
        default="Pending"
    )

    invoice_id = Column(
        Integer,
        nullable=True
    )