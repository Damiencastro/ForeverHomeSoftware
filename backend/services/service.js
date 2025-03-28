//const db = require('../db')

module.exports.getAllFosters = async () => {
    /* Add the database functionality later
    const [fosters] = await db.query("SELECT * FROM fosters")
        .catch(err => console.log(err))
    return dogs;
    */
}

module.exports.getDogById = async (id) => {
    /* Add the database functionality later
    const [dog] = await db.query("SELECT * FROM dogs WHERE id = ?", [id])
        .catch(err => console.log(err))
    return dog;
    */
}

module.exports.deleteDog = async (id) => {
    /* Add the database functionality later
    const [dog] = await db.query("DELETE FROM dogs WHERE id = ?", [id])
        .catch(err => console.log(err))
    return dog.affectedRows;
    */
}

module.exports.addDog = async (obj) => {
    /* Add the database functionality later
    const [dog] = await db.query("INSERT INTO dogs (name, breed, weight, sun, mon, tue, wed, thu, fri, sat) VALUES (?,?,?,?,?,?,?,?,?,?);", [obj.name, obj.breed, obj.weight, obj.sun, obj.mon, obj.tue, obj.wed, obj.thu, obj.fri, obj.sat])
        .catch(err => console.log(err))
    return dog;
    */
}

module.exports.updateDog = async (id, obj) => {
    /* Add the database functionality later
    const [dog] = await db.query("UPDATE dogs SET name = ?, breed = ?, weight = ?, sun = ?, mon = ?, tue = ?, wed = ?, thu = ?, fri = ?, sat = ? WHERE id = ?;", [obj.name, obj.breed, obj.weight, obj.sun, obj.mon, obj.tue, obj.wed, obj.thu, obj.fri, obj.sat, id])
        .catch(err => console.log(err))
    return dog;
    */
}