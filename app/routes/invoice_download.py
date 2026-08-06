from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os


router = APIRouter(
    prefix="/invoice-download",
    tags=["Invoice Download"]
)



@router.get("/{invoice_number}")
def download_invoice(invoice_number:str):

    file_path = f"invoices/{invoice_number}.pdf"


    if not os.path.exists(file_path):

        raise HTTPException(
            status_code=404,
            detail="PDF file not found"
        )


    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=f"{invoice_number}.pdf"
    )