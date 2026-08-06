import smtplib
from email.message import EmailMessage


def send_invoice_email(
    receiver_email: str,
    subject: str,
    body: str,
    attachment_path: str
):

    sender_email = "durgasivakumar784@gmail.com"
    sender_password = "usvurrhflcrryfxc"

    message = EmailMessage()

    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    message.set_content(body)

    with open(attachment_path, "rb") as file:
        file_data = file.read()
        file_name = attachment_path.split("\\")[-1]

    message.add_attachment(
        file_data,
        maintype="application",
        subtype="pdf",
        filename=file_name
    )

    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.starttls()
        smtp.login(
            sender_email,
            sender_password
        )
        smtp.send_message(message)

    print("Invoice email sent successfully")