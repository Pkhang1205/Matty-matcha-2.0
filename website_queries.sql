IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'MattyMatcha')
BEGIN
  CREATE DATABASE MattyMatcha;
END
GO

USE MattyMatcha;
GO


-- TẠO BẢNG



--THÊM SẢN PHẨM 
INSERT into sanpham (ten_sp, gia_sp, mo_ta, hinh_anh)
VALUES
(N'Matcha Latte', 35000, N'Matcha kết hợp sữa tươi', 'matcha-latte.jpg'),
(N'Matcha Kem Trứng', 40000, N'Matcha kết hợp kem trứng', 'matcha-kem-trung.jpg'),
(N'Matcha Đậu Đỏ', 45000, N'Matcha kết hợp đậu đỏ', 'matcha-dau-do.jpg'),
(N'Matcha Dừa', 40000, N'Matcha kết hợp nước cốt dừa', 'matcha-dua.jpg'),
(N'Matcha Đá Xay', 45000, N'Matcha đá xay mát lạnh', 'matcha-da-xay.jpg'),
(N'Matcha Caramel', 35000, N'Matcha kết hợp với Caramel', 'matcha-caramel.jpg');
GO

USE MattyMatcha;
GO

SELECT
    t.name AS TABLE_NAME,
    c.name AS COLUMN_NAME,
    TYPE_NAME(c.user_type_id) AS DATA_TYPE,
    c.is_nullable,
    c.is_identity
FROM sys.tables t
JOIN sys.columns c
    ON t.object_id = c.object_id
WHERE t.is_ms_shipped = 0
ORDER BY t.name, c.column_id;

SELECT
    fk.name AS ten_khoa_ngoai,
    OBJECT_NAME(fk.parent_object_id) AS bang_con,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS cot_con,
    OBJECT_NAME(fk.referenced_object_id) AS bang_cha,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS cot_cha
FROM sys.foreign_keys fk
JOIN sys.foreign_key_columns fkc
    ON fk.object_id = fkc.constraint_object_id;

SELECT
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    NUMERIC_PRECISION,
    NUMERIC_SCALE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME IN (
    'khachhang',
    'donhang',
    'chitiet_donhang'
)
ORDER BY TABLE_NAME, ORDINAL_POSITION;


select column_name, data_type, character_maximum_length, numeric_precision, numeric_scale, is_nullable
from information_schema.columns
where table_name = 'donhang';

USE MattyMatcha;
GO

--KIỂM TRA DỮ LIỆU MỚI NHẤT
SELECT TOP 5 *
FROM dbo.donhang
ORDER BY 1 DESC;

--KIỂM TRA DỮ LIỆU CHI TIẾT ĐƠN HÀNG MỚI NHẤT
SELECT TOP 10 *
FROM dbo.chitiet_donhang
ORDER BY 1 DESC;

SELECT DISTINCT danh_muc
FROM sanpham;