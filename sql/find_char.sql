SELECT * 
    FROM characters c
    WHERE c.Name LIKE ?
    LIMIT 50;