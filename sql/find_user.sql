SELECT * 
    FROM accounts a
    WHERE a.Username LIKE ? 
        OR a.Nickname LIKE ?
    LIMIT 50;