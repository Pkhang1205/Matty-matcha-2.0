
from dotenv import load_dotenv
from pathlib import Path
import os
import psycopg

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")


def get_connection():
    connection = psycopg.connect(
        host=os.getenv("PG_HOST", "localhost"),
        port=os.getenv("PG_PORT", "5432"),
        dbname=os.getenv("PG_DATABASE", "MattyMatcha"),
        user=os.getenv("PG_USER"),
        password=os.getenv("PG_PASSWORD"),
        sslmode="require",
    )

    print("Connected to PostgreSQL!")
    return connection

def get_local_connection():
    connection = psycopg.connect(
        host="localhost",
        port=5432,
        dbname="MattyMatcha",
        user="postgres",
        password=os.getenv("LOCAL_PG_PASSWORD")
    )
    print("Connected to Local PostgreSQL!")
    return connection