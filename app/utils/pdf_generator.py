from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib.styles import getSampleStyleSheet
import os



def generate_invoice_pdf(invoice):

    folder = "invoices"

    if not os.path.exists(folder):
        os.makedirs(folder)


    file_path = (
        f"{folder}/{invoice.invoice_number}.pdf"
    )


    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter
    )


    styles = getSampleStyleSheet()


    content = []


    content.append(
        Paragraph(
            "Recurring Billing Platform",
            styles["Title"]
        )
    )


    content.append(
        Spacer(1,20)
    )



    invoice_data = [

        ["Invoice Number",
         invoice.invoice_number],

        ["Invoice ID",
         str(invoice.id)],

        ["Subscription ID",
         str(invoice.subscription_id)],

        ["Amount",
         f"₹ {invoice.amount}"],

        ["Tax",
         f"₹ {invoice.tax_amount}"],

        ["Status",
         invoice.status],

        ["Created Date",
         str(invoice.created_at)]

    ]



    table = Table(
        invoice_data,
        colWidths=[150,250]
    )


    table.setStyle(
        TableStyle(
            [
                ("GRID",(0,0),(-1,-1),1,None),
                ("VALIGN",(0,0),(-1,-1),"TOP")
            ]
        )
    )


    content.append(table)


    content.append(
        Spacer(1,20)
    )


    content.append(
        Paragraph(
            "Thank you for your payment.",
            styles["Normal"]
        )
    )


    doc.build(content)



    return file_path