UPDATE characters c
    SET c.Kamas = ?, 
        c.SpellPoints = ?, 
        c.StatsPoints = ?, 
        c.SpawnPointMapId = ?
    WHERE c.Id = ?;