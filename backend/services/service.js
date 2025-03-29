const db = require('../db')

module.exports.getAllFosters = async () => {
    const [fosters] = await db.query("SELECT f.id AS foster_id, f.name AS foster_name, fg.label AS fostergroup_label, a.label AS age_label, ca.label AS catsafe_label, ch.label AS childsafe_label, d.label AS dogsafe_label, e.label AS energy_label, h.label AS housetrained_label FROM Foster f LEFT JOIN Fostergroup fg ON f.fostergroup = fg.id LEFT JOIN Age a ON f.age_id = a.id LEFT JOIN Catsafe ca ON f.catsafe_id = ca.id LEFT JOIN Childsafe ch ON f.childsafe_id = ch.id LEFT JOIN Dogsafe d ON f.dogsafe_id = d.id LEFT JOIN Energy e ON f.energy_id = e.id LEFT JOIN Housetrained h ON f.housetrained_id = h.id;")
        .catch(err => console.log(err))
    return fosters;
}

module.exports.getFosterById = async (id) => {
    /* Add the database functionality later
    const [dog] = await db.query("SELECT * FROM dogs WHERE id = ?", [id])
        .catch(err => console.log(err))
    return dog;
    */
}

module.exports.getAllGroups = async () => {
    const [groups] = await db.query("SELECT * FROM Fostergroup;")
        .catch(err => console.log(err))
    return groups;
}

module.exports.getAllAges = async () => {
    const [ages] = await db.query("SELECT * FROM Age;")
        .catch(err => console.log(err))
    return ages;
}

module.exports.getAllCatsafes = async () => {
    const [catsafes] = await db.query("SELECT * FROM Catsafe;")
        .catch(err => console.log(err))
    return catsafes;
}

module.exports.getAllDogsafes = async () => {
    const [dogsafes] = await db.query("SELECT * FROM Dogsafe;")
        .catch(err => console.log(err))
    return dogsafes;
}

module.exports.getAllChildsafes = async () => {
    const [childsafes] = await db.query("SELECT * FROM Childsafe;")
        .catch(err => console.log(err))
    return childsafes;
}

module.exports.getAllEnergy = async () => {
    const [energy] = await db.query("SELECT * FROM Energy;")
        .catch(err => console.log(err))
    return energy;
}

module.exports.getAllHousetrained = async () => {
    const [housetrained] = await db.query("SELECT * FROM Housetrained;")
        .catch(err => console.log(err))
    return housetrained;
}