from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime

from app.database.database import Base


class Usage(Base):
    __tablename__ = "usages"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    subscription_id = Column(
        Integer,
        ForeignKey("subscriptions.id")
    )

    usage_type = Column(String)

    quantity = Column(Integer)

    unit_price = Column(Float)

    total_amount = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )