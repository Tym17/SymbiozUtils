SELECT ci.UId, 
    ci.Effects as 'jet', 
    i.Effects,
    i.Name
FROM charactersitems ci
LEFT JOIN items i
    ON ci.Gid = i.Id
WHERE ci.UId = ?;