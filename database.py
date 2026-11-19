from dotenv import load_dotenv
from pathlib import Path
import os
import pyodbc

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

def get_connection():
    connection_string = (
        "DRIVER={ODBC Driver 18 for SQL Server};"
        "SERVER=localhost,1433;"
        "DATABASE=MattyMatcha;"
        f"UID={os.getenv('DB_USER')};"
        f"PWD={os.getenv('DB_PASSWORD')};"
        "Encrypt=yes;"
        "TrustServerCertificate=yes;"
    )

    print("DB_USER:", os.getenv("DB_USER"))
    print("DB_PASSWORD exists:", bool(os.getenv("DB_PASSWORD")))
    print("SERVER: localhost,1433")
    return pyodbc.connect(connection_string)