from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime

from app.database.database import Base


class AuditLog(Base):

    __tablename__ = "audit_logs"

    __table_args__ = {
        "extend_existing": True
    }

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    action = Column(
        String
    )

    entity = Column(
        String
    )

    entity_id = Column(
        Integer
    )

    details = Column(
        Text
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )