from sqlalchemy import Column, Integer, String, Float

from app.database.database import Base


class Plan(Base):

    __tablename__ = "plans"

    __table_args__ = {
        "extend_existing": True
    }

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String
    )

    price = Column(
        Float
    )

    billing_cycle = Column(
        String
    )