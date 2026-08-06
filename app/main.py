from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base
from app.models import models
from app.routes import retry
from app.routes import tax
from app.routes import invoice_download

# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Recurring Payment System",
    version="1.0.0"
)



# CORS Configuration
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



# Import Routes

from app.routes import auth
from app.routes import plans
from app.routes import customers
from app.routes import subscriptions
from app.routes import invoices
from app.routes import payments
from app.routes import billing
from app.routes import dashboard
from app.routes import refunds
from app.routes import webhooks
from app.routes import audit





# Register Routes


app.include_router(
    auth.router
)


app.include_router(
    plans.router
)


app.include_router(
    customers.router
)


app.include_router(
    subscriptions.router
)


app.include_router(
    invoices.router
)


app.include_router(
    payments.router
)


app.include_router(
    billing.router
)


app.include_router(
    dashboard.router
)


app.include_router(
    refunds.router
)


app.include_router(
    webhooks.router
)


app.include_router(
    audit.router
)

app.include_router(
    tax.router
)

app.include_router(retry.router)

app.include_router(
    invoice_download.router
)



@app.get("/")
def home():

    return {
        "message": "Recurring Payment System API Running"
    }