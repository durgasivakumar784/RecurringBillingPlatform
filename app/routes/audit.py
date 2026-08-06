from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.models import AuditLog


router = APIRouter(
    prefix="/audit-logs",
    tags=["Audit Logs"]
)



@router.get("/")
def get_audit_logs(
    db: Session = Depends(get_db)
):

    logs = db.query(AuditLog).all()

    return logs