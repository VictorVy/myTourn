import oracledb from "oracledb";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// sanitization with help from docs at https://node-oracledb.readthedocs.io/en/latest/user_guide/bind.html#binding-column-and-table-names-in-queries
const validTables = ["BROADCAST",
                    "HOSTPLATFORM",
                    "ESPORTSORG",
                    "GAME",
                    "INDIVIDUALGAME",
                    "TEAMGAME",
                    "ORGANIZER",
                    "PARTICIPANT",
                    "PLAYER",
                    "TEAM",
                    "SPONSOR",
                    "TOURNAMENT",
                    "STARTDATE",
                    "VENUE",
                    "POSTALCODE",
                    "CONTRACT",
                    "JOINS",
                    "MEMBER",
                    "TOURNAMENTFUNDING",
                    "TEAMPLAYS",
                    "PLAYERPLAYS"];

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

function checkTables(tableList) {
    let tables = tableList.split(",").map(table => table.trim().toUpperCase());
    for (let table of tables) {
        if (!validTables.includes(table)) {
            return { err: true, table: table };
        }
    }

    return { err: false };
}

async function executeQuery(selectList, fromList, whereClause, groupList, havingClause, orderList) {
    let connection;
    let result;

    try {
        let check = checkTables(fromList);
        if (check.err) {
            throw new Error("Invalid table name: " + check.table);
        }

        connection = await oracledb.getConnection();

        let query = `SELECT ${selectList} FROM ${fromList}`;

        if (whereClause !== undefined) {
            query += ` WHERE ${whereClause}`;
        }

        if (groupList !== undefined) {
            query += ` GROUP BY ${groupList}`;

            if (havingClause !== undefined) {
                query += ` HAVING ${havingClause}`;
            }
        }

        if (orderList !== undefined) {
            query += ` ORDER BY ${orderList}`;
        }

        result = await connection.execute(query);
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function executeInsert(table, columns, valuesArr) {
    let connection;
    let result;

    try {
        let check = checkTables(table);
        if (check.err) {
            throw new Error("Invalid table name: " + check.table);
        }

        connection = await oracledb.getConnection();

        let query = "INSERT ALL";

        for (let i = 0; i < valuesArr.length; i++) {
            query += ` INTO ${table} (${columns}) VALUES (${valuesArr[i]})`;
        }

        query += " SELECT * FROM dual";

        result = await connection.execute(query);
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function executeUpdate(table, setList, whereClause) {
    let connection;
    let result;

    try {
        let check = checkTables(table);
        if (check.err) {
            throw new Error("Invalid table name: " + check.table);
        }

        connection = await oracledb.getConnection();

        let query = `UPDATE ${table} SET ${setList}`;

        if (whereClause !== undefined) {
            query += ` WHERE ${whereClause}`;
        }

        result = await connection.execute(query);
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function executeDelete(table, whereClause) {
    let connection;
    let result;

    try {
        let check = checkTables(table);
        if (check.err) {
            throw new Error("Invalid table name: " + check.table);
        }

        connection = await oracledb.getConnection();

        let query = `DELETE FROM ${table}`;

        if (whereClause !== undefined) {
            query += ` WHERE ${whereClause}`;
        }

        result = await connection.execute(query);
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function getTeamPlayers(teamId) {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection();

        result = await connection.execute(
            `SELECT * 
            FROM Member, Player 
            WHERE teamid = :teamId AND
                  playerid = id`,
            [teamId]
        );
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function getNumTournParticipants() {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection();

        result = await connection.execute(
            `SELECT tid, COUNT(*) as PARTICIPANT_COUNT 
            FROM Joins 
            GROUP BY tid`
        );
        } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function getPopularGames() {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection();

        const teamGames = await connection.execute(
            `SELECT id, name, genre, company, yearPublished
            FROM Game
            WHERE id IN (SELECT gameid 
                        FROM TeamPlays
                        GROUP BY gameid 
                        HAVING COUNT(*) >= 3)`
        );

        const playerGames = await connection.execute(
            `SELECT id, name, genre, company, yearPublished
            FROM Game
            WHERE id IN (SELECT gameid 
                        FROM PlayerPlays 
                        GROUP BY gameid 
                        HAVING COUNT(*) >= 5)`
        );
        
        result = { teamGames, playerGames };
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function getHighestAvgViewershipPlatform() {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection();

        result = await connection.execute(
            `SELECT platform, AVG(viewership) as AVG_VIEWERSHIP
            FROM Broadcast NATURAL JOIN HostPlatform
            GROUP BY platform
            HAVING AVG(viewership) >= ALL (SELECT AVG(viewership) 
                                            FROM Broadcast NATURAL JOIN HostPlatform
                                            GROUP BY platform)`
        );
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}

async function getMVPs() {
    let connection;
    let result;

    try {
        connection = await oracledb.getConnection();

        result = await connection.execute(
            `SELECT * 
            FROM Player p
            WHERE NOT EXISTS (SELECT t.id
                              FROM Tournament t
                              WHERE t.gameid IN (SELECT g.id
                                                 FROM IndividualGame g)
                              MINUS
                              SELECT j.tid
                              FROM Joins j
                              WHERE j.pid = p.id)`
        );
    } catch (err) {
        console.error(err);
        result = err;
    } finally {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
        return result;
    }
}


process
    .once("SIGTERM", closePool)
    .once("SIGINT", closePool);

export default { initializePool,
                 executeQuery,
                 executeInsert,
                 executeUpdate,
                 executeDelete,
                 getTeamPlayers,
                 getNumTournParticipants,
                 getPopularGames,
                 getHighestAvgViewershipPlatform,
                 getMVPs };