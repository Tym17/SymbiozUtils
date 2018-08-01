UPDATE accounts a
    SET a.Username = ?, 
        a.Nickname = ?, 
        a.Password = ?, 
        a.Role = ?
    WHERE a.Id = ?;