import random


def generate_invoice_number():

    number = random.randint(10000, 99999)

    return f"INV-{number}"