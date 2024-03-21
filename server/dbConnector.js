import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// with help from guide at https://github.students.cs.ubc.ca/CPSC304/CPSC304_Node_Project/

const dbConfig = {
    user: process.env.ORA_USER,
    password: process.env.ORA_PASSWORD,
    connectString: process.env.ORA_HOST + ":" + 
                    process.env.ORA_PORT + "/" + 
                    process.env.ORA_DBNAME,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

async function initializePool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log("Connection pool initialized");
    } catch (err) {
        console.error("init error: " + err.message);
    }
}

async function closePool() {
    console.log("Closing");
    try {
        await oracledb.getPool().close(10);
        console.log("Pool closed");
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

async function test() {
    let connection = await oracledb.getConnection();
    console.log("Connection started");

    // await connection.execute(
    //     `CREATE TABLE test_victor (id NUMBER, name VARCHAR2(20))`
    // );

    const names = await connection.execute(
        `SELECT * FROM test_victor`
    );

    console.log(names);
    await connection.close();
    console.log("Connection closed");
}

async function executeQuery(selectList, fromList, whereClause) {
    let connection;
    try {
        // TODO: sanitize inputs (https://node-oracledb.readthedocs.io/en/latest/user_guide/bind.html#binding-column-and-table-names-in-queries)
        connection = await oracledb.getConnection();

        let query = `SELECT ${selectList} FROM ${fromList}`;
        if (whereClause !== "") {
            query += ` WHERE ${whereClause}`;
        }

        const result = await connection.execute(query);
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await connection.close();
    }
}

process
    .once("SIGTERM", closePool)
    .once("SIGINT", closePool);

export default { initializePool, test };