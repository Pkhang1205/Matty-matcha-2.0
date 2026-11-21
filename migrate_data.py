
from database import get_connection, get_local_connection

tables = [
    ("sanpham", "ma_sp", None),
    ("khachhang", "ma_khachhang", None),
    ("donhang", "ma_donhang", None),
    ("chitiet_donhang", "ma_chitiet", "tong_tien")
]

local = get_local_connection()
neon = get_connection()

try:
    local_cursor = local.cursor()
    neon_cursor = neon.cursor()

    for table, id_column, generated_column in tables:
        local_cursor.execute(f"SELECT * FROM {table}")
        rows = local_cursor.fetchall()

        if not rows:
            print(f"{table}: Không có dữ liệu")
            continue

        columns = [desc.name for desc in local_cursor.description]

        # Bỏ cột tự động tính toán nếu có
        if generated_column:
            columns.remove(generated_column)
            rows = [
                tuple(value for name, value in zip(
                    [desc.name for desc in local_cursor.description], row
                ) if name != generated_column)
                for row in rows
            ]

        column_names = ", ".join(columns)
        placeholders = ", ".join(["%s"] * len(columns))

        query = f"""
            INSERT INTO {table} ({column_names})
            VALUES ({placeholders})
        """

        neon_cursor.executemany(query, rows)
        print(f"{table}: Đã chuyển {len(rows)} dòng")

    # Cập nhật bộ đếm ID tự động
    for table, id_column, _ in tables:
        neon_cursor.execute(f"""
            SELECT setval(
                pg_get_serial_sequence('{table}', '{id_column}'),
                COALESCE(MAX({id_column}), 1),
                MAX({id_column}) IS NOT NULL
            )
            FROM {table}
        """)

    neon.commit()
    print("Chuyển dữ liệu thành công!")

except Exception as e:
    neon.rollback()
    print("Có lỗi:", repr(e))

finally:
    local.close()
    neon.close()
