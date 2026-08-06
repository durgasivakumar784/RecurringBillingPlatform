from app.celery_worker import celery


@celery.task
def retry_failed_payments():

    print(
        "Checking failed payments..."
    )


    # Later:
    # Query payment_retries table
    # Retry payment
    # Update status


    return "Retry process completed"