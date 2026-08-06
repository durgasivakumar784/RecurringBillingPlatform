from pydantic import BaseModel


class PlanCreate(BaseModel):
    name: str
    price: float
    billing_cycle: str


class PlanResponse(PlanCreate):
    id: int

    class Config:
        from_attributes = True
class CustomerCreate(BaseModel):
    name: str
    email: str


class CustomerResponse(CustomerCreate):
    id: int

    class Config:
        from_attributes = True
class SubscriptionCreate(BaseModel):
    customer_id: int
    plan_id: int


class SubscriptionResponse(SubscriptionCreate):
    id: int
    status: str

    class Config:
        from_attributes = True
class SubscriptionCreate(BaseModel):
    customer_id: int
    plan_id: int


class SubscriptionResponse(BaseModel):
    id: int
    customer_id: int
    plan_id: int
    status: str

    class Config:
        from_attributes = True
class InvoiceCreate(BaseModel):
    subscription_id: int
    amount: float


class InvoiceResponse(BaseModel):
    id: int
    subscription_id: int
    amount: float
    status: str

    class Config:
        from_attributes = True
class PaymentCreate(BaseModel):
    invoice_id: int


class PaymentResponse(BaseModel):
    id: int
    invoice_id: int
    payment_status: str

    class Config:
        from_attributes = True
from pydantic import BaseModel


class ChangePlanRequest(BaseModel):
    new_plan_id: int
from datetime import date
from pydantic import BaseModel


class BillingCycleCreate(BaseModel):
    subscription_id: int
    billing_date: date
    next_billing_date: date


class BillingCycleResponse(BaseModel):
    id: int
    subscription_id: int
    billing_date: date
    next_billing_date: date
    status: str

    class Config:
        from_attributes = True
class PaymentRequest(BaseModel):
    invoice_id: int
    success: bool
class PaymentWebhook(BaseModel):
    invoice_id: int
    event: str
class PaymentRetryResponse(BaseModel):

    id: int
    payment_id: int
    retry_count: int
    max_retries: int
    status: str

    class Config:
        from_attributes = True