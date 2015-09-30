// Switch to admin database and get list of databases.
db = db.getSiblingDB("admin");
dbs = db.runCommand({ "listDatabases": 1 }).databases;

// Iterate through each database and get its collections.
dbs.forEach(function(database) {
    db = db.getSiblingDB(database.name);
    cols = db.getCollectionNames();

    // Iterate through each collection.
    cols.forEach(function(col) {

        // Do something with each collection.
        print(col);
    });

});
