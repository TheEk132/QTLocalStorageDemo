function dbInit() {
    console.log("Initializing database")

    //open database
    db = LocalStorage.openDatabaseSync('sqlitedemodb', '1.0', 'Sqlite demo database', 100000)

    //create table if it not created already
    db.transaction(function(tx) {
        print('...create table')
        tx.executeSql('CREATE TABLE IF NOT EXISTS sqlitedemotable(name TEXT, value TEXT)');
    });
}

function storeData() {
    console.log('Storing data...')

    if (!db) {
        return;
    }
    db.transaction(function(tx) {
        //check if sqlitedemo entry is available

        var result = tx.executeSql('SELECT * from sqlitedemotable where name = "sqlitedemo"');

        var obj = {txt: textlabel.text}

        if (result.rows.length === 1) {
            //update
            console.log('Updating database table')
            result = tx.executeSql('UPDATE sqlitedemotable set value=? where name = "sqlitedemo"', [JSON.stringify(obj)])
        } else {
            //create entry
            console.log('Creating new database table entry')
            result = tx.executeSql('INSERT INTO sqlitedemotable VALUES (?,?)', ['sqlitedemo', JSON.stringify(obj)])
        }

    });
}

function readData() {
    console.log("reading data...")

    if (!db) {
        return;
    }

    db.transaction( function(tx) {
        print('...Reading data from database')
        var result = tx.executeSql('select * from sqlitedemotable where name = "sqlitedemo"');

        if (result.rows.length === 1) {
            //we have data we can work with

            //get the value column, should be a string value
            var value = result.rows[0].value;
            //convert to JS object
            var obj = JSON.parse(value)

            //apply to object
            textlabel.text = obj.txt;
        }
    });
}
