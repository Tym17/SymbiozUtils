SELECT ci.UId,
    i.Name
FROM charactersitems ci
LEFT JOIN items i 
    ON ci.Gid = i.Id
WHERE ci.CharacterId = ?
	AND i.TypeId in (?);