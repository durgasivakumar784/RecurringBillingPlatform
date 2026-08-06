from celery import Celery


celery = Celery(
    "billing_platform",

    broker="redis://localhost:6363/0",

    backend="redis://localhost:6363/0",

    include=[
        "app.tasks.retry_failed_payments"
    ]
)


# Celery Beat Schedule

celery.conf.beat_schedule = {

    "retry-failed-payments-every-day": {

        "task": "app.tasks.retry_failed_payments",

        # Every 24 hours
        "schedule": 30,

    }

}


# Timezone

celery.conf.timezone = "Asia/Kolkata"


# Track task execution status

celery.conf.task_track_started = True


# Store result for 1 hour

celery.conf.result_expires = 3600


# Optional settings

celery.conf.update(

    task_serializer="json",

    accept_content=[
        "json"
    ],

    result_serializer="json",

)