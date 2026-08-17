from sqlalchemy.orm import Session

from app.models.models import AuditLog


def create_audit_log(
    db: Session,
    action: str,
    entity: str,
    entity_id: int,
    details: str
):
    log = AuditLog(
        action=action,
        entity=entity,
        entity_id=entity_id,
        description=details
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log