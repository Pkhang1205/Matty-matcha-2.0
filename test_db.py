from database import get_connection

try:
    conn = get_connection()
    print("Kết nối SQL Server thành công!")

    conn.close()

except Exception as e:
    print("Lỗi kết nối:", e)
    
#Lệnh chạy Backend: 
#DYLD_LIBRARY_PATH="$(brew --prefix openssl@3)/lib" python -m uvicorn main:app --reload 