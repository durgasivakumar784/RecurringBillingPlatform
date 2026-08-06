def calculate_tax(
    db,
    amount: float,
    country="India",
    state="Tamil Nadu"
):

    print("TAX FUNCTION CALLED")
    print("AMOUNT:", amount)


    tax_percentage = 18


    tax_amount = (
        amount * tax_percentage
    ) / 100


    total = amount + tax_amount


    return {
        "tax": round(tax_amount, 2),
        "total": round(total, 2)
    }