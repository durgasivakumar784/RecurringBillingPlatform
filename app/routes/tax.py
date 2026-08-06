from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import TaxMaster


router = APIRouter(
    prefix="/tax",
    tags=["Tax Management"]
)



# ---------------- CREATE TAX ----------------

@router.post("/")
def create_tax(
    country: str,
    state: str,
    tax_name: str,
    tax_percentage: float,
    db: Session = Depends(get_db)
):

    tax = TaxMaster(

        country=country,

        state=state,

        tax_name=tax_name,

        tax_percentage=tax_percentage,

        is_active="true"
    )


    db.add(tax)

    db.commit()

    db.refresh(tax)


    return tax





# ---------------- GET ALL TAX ----------------

@router.get("/")
def get_taxes(
    db: Session = Depends(get_db)
):

    return db.query(
        TaxMaster
    ).all()





# ---------------- GET SINGLE TAX ----------------

@router.get("/{tax_id}")
def get_tax(
    tax_id:int,
    db: Session = Depends(get_db)
):

    tax = db.query(
        TaxMaster
    ).filter(
        TaxMaster.id == tax_id
    ).first()


    if not tax:

        raise HTTPException(
            status_code=404,
            detail="Tax not found"
        )


    return tax





# ---------------- UPDATE TAX ----------------

@router.put("/{tax_id}")
def update_tax(
    tax_id:int,
    tax_percentage:float,
    db:Session = Depends(get_db)
):

    tax = db.query(
        TaxMaster
    ).filter(
        TaxMaster.id == tax_id
    ).first()


    if not tax:

        raise HTTPException(
            status_code=404,
            detail="Tax not found"
        )


    tax.tax_percentage = tax_percentage


    db.commit()

    db.refresh(tax)


    return {
        "message":"Tax updated successfully",
        "tax":tax
    }





# ---------------- DELETE / DEACTIVATE TAX ----------------

@router.put("/{tax_id}/disable")
def disable_tax(
    tax_id:int,
    db:Session = Depends(get_db)
):

    tax = db.query(
        TaxMaster
    ).filter(
        TaxMaster.id == tax_id
    ).first()


    if not tax:

        raise HTTPException(
            status_code=404,
            detail="Tax not found"
        )


    tax.is_active="false"


    db.commit()


    return {
        "message":"Tax disabled"
    }