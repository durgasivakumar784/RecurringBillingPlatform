from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import Customer
from app.schemas.schemas import CustomerCreate, CustomerResponse
from app.services.audit_service import create_audit_log

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post("/", response_model=CustomerResponse)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    new_customer = Customer(
        name=customer.name,
        email=customer.email
    )

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    # Create Audit Log
    create_audit_log(
        db=db,
        action="CREATE",
        entity="Customer",
        entity_id=new_customer.id,
        details=f"Customer {new_customer.name} created"
    )

    return new_customer


@router.get("/", response_model=list[CustomerResponse])
def get_customers(
    db: Session = Depends(get_db)
):
    return db.query(Customer).all()