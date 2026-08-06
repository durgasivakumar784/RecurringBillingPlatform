from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
    Date
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


# ---------------- PLAN ----------------

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    price = Column(Float, nullable=False)

    billing_cycle = Column(
        String,
        nullable=False
    )

    trial_days = Column(
        Integer,
        default=0
    )

    is_active = Column(
        String,
        default="true"
    )



# ---------------- CUSTOMER ----------------

class Customer(Base):
    __tablename__ = "customers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=func.now()
    )



# ---------------- SUBSCRIPTION ----------------

class Subscription(Base):

    __tablename__ = "subscriptions"


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
        default="trial"
    )


    start_date = Column(
        DateTime,
        default=func.now()
    )


    end_date = Column(
        DateTime,
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=func.now()
    )


    updated_at = Column(
        DateTime,
        default=func.now(),
        onupdate=func.now()
    )



# ---------------- BILLING CYCLE ----------------

class BillingCycle(Base):

    __tablename__ = "billing_cycles"


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
        Date
    )


    next_billing_date = Column(
        Date
    )


    status = Column(
        String,
        default="pending"
    )



# ---------------- INVOICE ----------------

class Invoice(Base):

    __tablename__ = "invoices"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    subscription_id = Column(
        Integer,
        ForeignKey("subscriptions.id")
    )


    invoice_number = Column(
        String,
        unique=True
    )


    amount = Column(
        Float
    )


    tax_amount = Column(
        Float,
        default=0
    )


    status = Column(
        String,
        default="pending"
    )


    created_at = Column(
        DateTime,
        default=func.now()
    )



# ---------------- PAYMENT ----------------

class Payment(Base):

    __tablename__ = "payments"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    invoice_id = Column(
        Integer,
        ForeignKey("invoices.id")
    )


    payment_status = Column(
        String,
        default="pending"
    )


    payment_date = Column(
        DateTime,
        default=func.now()
    )



# ---------------- AUDIT LOG ----------------

class AuditLog(Base):

    __tablename__ = "audit_logs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    entity = Column(String)


    entity_id = Column(Integer)


    action = Column(String)


    description = Column(String)


    created_at = Column(
        DateTime,
        default=func.now()
    )



# ---------------- PAYMENT RETRY ----------------

class PaymentRetry(Base):

    __tablename__ = "payment_retries"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    payment_id = Column(
        Integer,
        ForeignKey("payments.id")
    )


    retry_count = Column(
        Integer,
        default=0
    )


    max_retries = Column(
        Integer,
        default=3
    )


    status = Column(
        String,
        default="pending"
    )


    next_retry_date = Column(
        DateTime
    )


    last_retry_date = Column(
        DateTime,
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=func.now()
    )



# ---------------- REFUND ----------------

class Refund(Base):

    __tablename__ = "refunds"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    invoice_id = Column(
        Integer,
        ForeignKey("invoices.id")
    )


    amount = Column(
        Float,
        nullable=False
    )


    reason = Column(
        String,
        nullable=False
    )


    status = Column(
        String,
        default="processed"
    )


    created_at = Column(
        DateTime,
        default=func.now()
    )
# ---------------- TAX MASTER ----------------

class TaxMaster(Base):

    __tablename__ = "tax_master"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    country = Column(
        String,
        nullable=False
    )


    state = Column(
        String,
        nullable=True
    )


    tax_name = Column(
        String,
        nullable=False
    )


    tax_percentage = Column(
        Float,
        nullable=False
    )


    effective_from = Column(
        Date
    )


    effective_to = Column(
        Date
    )


    is_active = Column(
        String,
        default="true"
    )


    created_at = Column(
        DateTime,
        default=func.now()
    )