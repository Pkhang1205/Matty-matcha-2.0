
FROM python:3.12-slim-bookworm

# Cài các công cụ cần thiết
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    apt-transport-https \
    ca-certificates

# Thêm kho phần mềm Microsoft
RUN curl -fsSL https://packages.microsoft.com/keys/microsoft.asc \
    | gpg --dearmor -o /usr/share/keyrings/microsoft-prod.gpg

RUN curl -fsSL https://packages.microsoft.com/config/debian/12/prod.list \
    -o /etc/apt/sources.list.d/mssql-release.list

# Cài ODBC Driver 18
RUN apt-get update && ACCEPT_EULA=Y apt-get install -y \
    msodbcsql18 \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/*

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài thư viện Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn
COPY . .

# Khởi chạy FastAPI
CMD ["sh", "-c", "python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}"]
