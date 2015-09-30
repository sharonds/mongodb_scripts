// Container class
function CollStats(name, storageSizeGB, indexSizeGB, totalSizeGB) {
  this.name = name;
  this.storageSizeGB = storageSizeGB.toFixed(0);
  this.indexSizeGB = indexSizeGB.toFixed(0);
  this.totalSizeGB = totalSizeGB.toFixed(0);
}

CollStats.prototype.toString = function toStr() {
  var s = this.name + ', storage = ' + this.storageSizeGB + ' GB, index = ' +
          this.indexSizeGB + ' GB, total = ' + this.totalSizeGB + ' GB';
  return s;
}

// Switch to admin database and get list of databases.

db = db.getSiblingDB("admin");
dbs = db.runCommand({ "listDatabases": 1 }).databases;
var bytesInGB = 1024 * 1024;
var collStats = [];

// Iterate through each database and get its collections.
dbs.forEach(function(database) {
    db = db.getSiblingDB(database.name);
    cols = db.getCollectionNames();

    // Iterate through each collection.
    cols.forEach(function(col) {
        if(col == 'assetMatch') {
        // Do something with each collection.
        print(col);
        s = db[col].stats();
        var storageSizeGB = s['storageSize'] / bytesInGB;
        var indexSizeGB = s['totalIndexSize'] / bytesInGB;
        var totalSizeGB = storageSizeGB + indexSizeGB;
        var cs = new CollStats(s['ns'], storageSizeGB, indexSizeGB, totalSizeGB);
        collStats.push(cs);
        }
    });

});

// descending order sort
collStats.sort(function compare(a, b) {
  return b.totalSizeGB - a.totalSizeGB;
});

for (var i = 0; i < collStats.length; i++) {
  print(collStats[i]);
}
