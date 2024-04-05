DROP TABLE TournamentFunding CASCADE CONSTRAINTS;
DROP TABLE Member CASCADE CONSTRAINTS;
DROP TABLE Joins CASCADE CONSTRAINTS;
DROP TABLE Contract CASCADE CONSTRAINTS;
DROP TABLE PostalCode CASCADE CONSTRAINTS;
DROP TABLE Venue CASCADE CONSTRAINTS;
DROP TABLE StartDate CASCADE CONSTRAINTS;
DROP TABLE Tournament CASCADE CONSTRAINTS;
DROP TABLE Sponsor CASCADE CONSTRAINTS;
DROP TABLE Team CASCADE CONSTRAINTS;
DROP TABLE Player CASCADE CONSTRAINTS;
DROP TABLE Participant CASCADE CONSTRAINTS;
DROP TABLE Organizer CASCADE CONSTRAINTS;
DROP TABLE TeamGame CASCADE CONSTRAINTS;
DROP TABLE IndividualGame CASCADE CONSTRAINTS;
DROP TABLE Game CASCADE CONSTRAINTS;
DROP TABLE ESportsOrg CASCADE CONSTRAINTS;
DROP TABLE HostPlatform CASCADE CONSTRAINTS;
DROP TABLE Broadcast CASCADE CONSTRAINTS;
DROP TABLE TeamPlays CASCADE CONSTRAINTS;
DROP TABLE PlayerPlays CASCADE CONSTRAINTS;

CREATE TABLE HostPlatform (host VARCHAR(50) PRIMARY KEY, platform VARCHAR(50));
CREATE TABLE ESportsOrg (id INT PRIMARY KEY, name VARCHAR(50), region VARCHAR(50), contact VARCHAR(50));
CREATE TABLE Game (id INT PRIMARY KEY, name VARCHAR(50), genre VARCHAR(50), company VARCHAR(50), yearPublished INT);
CREATE TABLE Participant (id INT PRIMARY KEY, displayName VARCHAR(50));
CREATE TABLE Sponsor (id INT PRIMARY KEY, name VARCHAR(50));
CREATE TABLE Organizer (id INT PRIMARY KEY, name VARCHAR(50), email VARCHAR(50));
CREATE TABLE Player (id INT PRIMARY KEY, firstName VARCHAR(50), lastName VARCHAR(50), age INT, FOREIGN KEY (id) REFERENCES Participant(id) ON DELETE CASCADE);
CREATE TABLE Tournament (id INT PRIMARY KEY, name VARCHAR(50), startDate DATE, endDate DATE, streetAddress VARCHAR(30), city VARCHAR(50), country VARCHAR(50), organizerid INT, gameid INT, FOREIGN KEY (organizerid) REFERENCES Organizer(id), FOREIGN KEY (gameid) REFERENCES Game(id));
CREATE TABLE Venue (streetAddress VARCHAR(30), postalCode CHAR(10), PRIMARY KEY (streetAddress, postalCode));
CREATE TABLE PostalCode (postalCode CHAR(10) PRIMARY KEY, city VARCHAR(50), country VARCHAR(50));
CREATE TABLE Contract (pid INT PRIMARY KEY, orgid INT, startDate DATE, endDate DATE, amount INT, FOREIGN KEY (pid) REFERENCES Participant(id) ON DELETE CASCADE, FOREIGN KEY (orgid) REFERENCES ESportsOrg(id) ON DELETE CASCADE);
CREATE TABLE Broadcast (tid INT, host VARCHAR(50), viewership INT, PRIMARY KEY (tid, host), FOREIGN KEY (tid) REFERENCES Tournament(id));
CREATE TABLE IndividualGame (id INT PRIMARY KEY, FOREIGN KEY (id) REFERENCES Game(id) ON DELETE CASCADE);
CREATE TABLE Team (id INT PRIMARY KEY, coach VARCHAR(50), FOREIGN KEY (id) REFERENCES Participant(id) ON DELETE CASCADE);
CREATE TABLE TeamGame (id INT PRIMARY KEY, teamSize INT, numTeams INT, FOREIGN KEY (id) REFERENCES Game(id) ON DELETE CASCADE);
CREATE TABLE StartDate (startDate DATE PRIMARY KEY, year INT);
CREATE TABLE Joins (pid INT, tid INT, PRIMARY KEY (pid, tid), FOREIGN KEY (pid) REFERENCES Participant(id) ON DELETE CASCADE, FOREIGN KEY (tid) REFERENCES Tournament(id) ON DELETE CASCADE);
CREATE TABLE Member (playerid INT PRIMARY KEY, teamid INT NOT NULL, FOREIGN KEY (playerid) REFERENCES Player(id) ON DELETE CASCADE, FOREIGN KEY (teamid) REFERENCES Team(id) ON DELETE CASCADE);
CREATE TABLE TournamentFunding (tid INT, sid INT, amount INT, PRIMARY KEY (tid, sid), FOREIGN KEY (tid) REFERENCES Tournament(id) ON DELETE CASCADE, FOREIGN KEY (sid) REFERENCES Sponsor(id) ON DELETE CASCADE);
CREATE TABLE TeamPlays (teamid INT, gameid INT, PRIMARY KEY (teamid, gameid), FOREIGN KEY (teamid) REFERENCES Team(id) ON DELETE CASCADE, FOREIGN KEY (gameid) REFERENCES TeamGame(id) ON DELETE CASCADE);
CREATE TABLE PlayerPlays (playerid INT, gameid INT, PRIMARY KEY (playerid, gameid), FOREIGN KEY (playerid) REFERENCES Player(id) ON DELETE CASCADE, FOREIGN KEY (gameid) REFERENCES IndividualGame(id) ON DELETE CASCADE);

INSERT INTO StartDate (startDate, year) VALUES (TO_DATE('2024-01-01', 'YYYY-MM-DD'), 2024);
INSERT INTO StartDate (startDate, year) VALUES (TO_DATE('2024-02-01', 'YYYY-MM-DD'), 2024);
INSERT INTO StartDate (startDate, year) VALUES (TO_DATE('2024-03-01', 'YYYY-MM-DD'), 2024);
INSERT INTO StartDate (startDate, year) VALUES (TO_DATE('2024-04-01', 'YYYY-MM-DD'), 2024);
INSERT INTO StartDate (startDate, year) VALUES (TO_DATE('2024-05-01', 'YYYY-MM-DD'), 2024);

INSERT INTO PostalCode (postalCode, city, country) VALUES ('M5A 1A1', 'Toronto', 'Canada');
INSERT INTO PostalCode (postalCode, city, country) VALUES ('V6B 1B1', 'Vancouver', 'Canada');
INSERT INTO PostalCode (postalCode, city, country) VALUES ('H3A 1B9', 'Montreal', 'Canada');
INSERT INTO PostalCode (postalCode, city, country) VALUES ('K1P 5M7', 'Ottawa', 'Canada');
INSERT INTO PostalCode (postalCode, city, country) VALUES ('T2P 1B2', 'Calgary', 'Canada');

INSERT INTO HostPlatform (host, platform) VALUES ('GameCon Live', 'Twitch');
INSERT INTO HostPlatform (host, platform) VALUES ('E3 Coverage', 'YouTube');
INSERT INTO HostPlatform (host, platform) VALUES ('PAX Stream', 'Facebook Live');
INSERT INTO HostPlatform (host, platform) VALUES ('DreamHack Online', 'Mixer');
INSERT INTO HostPlatform (host, platform) VALUES ('BlizzCon Virtual', 'SteamTV');

INSERT INTO ESportsOrg (id, name, region, contact) VALUES (1, 'Faze', 'North America', 'faze@faze.com');
INSERT INTO ESportsOrg (id, name, region, contact) VALUES (2, 'Liquid', 'North America', 'liquid@liquid.com');
INSERT INTO ESportsOrg (id, name, region, contact) VALUES (3, 'Cloud9', 'North America', 'cloud9@cloud9.com');
INSERT INTO ESportsOrg (id, name, region, contact) VALUES (4, 'TSM', 'South America', 'tsm@tsm.com');
INSERT INTO ESportsOrg (id, name, region, contact) VALUES (5, 'G2', 'South America', 'g2@g2.com');

-- team games
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8801, 'Valorant', 'FPS', 'Riot Games', 2020);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8802, 'CS:GO', 'FPS', 'Valve Corporation', 2012);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8803, 'League of Legends', 'MOBA', 'Riot Games', 2009);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8804, 'Dota 2', 'MOBA', 'Valve Corporation', 2013);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8805, 'Overwatch', 'FPS', 'Blizzard Entertainment', 2016);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8806, 'Apex Legends', 'Battle royale', 'Respawn Entertainment', 2019);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8807, 'Rainbow Six Siege', 'FPS', 'Ubisoft', 2015);

-- Single-player Games
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8808, 'The Witcher 3: Wild Hunt', 'RPG', 'CD Projekt Red', 2015);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8809, 'The Legend of Zelda: Breath of the Wild', 'Action-adventure', 'Nintendo', 2017);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8810, 'Dark Souls III', 'Action RPG', 'FromSoftware', 2016);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8811, 'God of War', 'Action-adventure', 'Sony Interactive Entertainment', 2018);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8812, 'Skyrim', 'RPG', 'Bethesda Game Studios', 2011);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8813, 'Red Dead Redemption 2', 'Action-adventure', 'Rockstar Games', 2018);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8814, 'Horizon Zero Dawn', 'Action RPG', 'Guerrilla Games', 2017);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8815, 'Sekiro: Shadows Die Twice', 'Action-adventure', 'FromSoftware', 2019);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8816, 'Death Stranding', 'Action', 'Kojima Productions', 2019);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8817, 'Cyberpunk 2077', 'RPG', 'CD Projekt Red', 2020);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8818, 'Hollow Knight', 'Metroidvania', 'Team Cherry', 2017);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8819, 'Celeste', 'Platformer', 'Maddy Makes Games', 2018);
INSERT INTO Game (id, name, genre, company, yearPublished) VALUES (8820, 'Control', 'Action-adventure', 'Remedy Entertainment', 2019);


-- teams
INSERT INTO Participant (id, displayName) VALUES (1001, 'TEAM AceHunter');
INSERT INTO Participant (id, displayName) VALUES (1002, 'TEAM BlazeKnight');
INSERT INTO Participant (id, displayName) VALUES (1003, 'TEAM CrimsonFury');
INSERT INTO Participant (id, displayName) VALUES (1004, 'TEAM DeltaEcho');
INSERT INTO Participant (id, displayName) VALUES (1005, 'TEAM EchoRanger');

-- solo
INSERT INTO Participant (id, displayName) VALUES (1006, 'SOLO FoxtrotAlpha');
INSERT INTO Participant (id, displayName) VALUES (1007, 'SOLO GammaHawk');
INSERT INTO Participant (id, displayName) VALUES (1008, 'SOLO HyperIon');
INSERT INTO Participant (id, displayName) VALUES (1009, 'SOLO IvoryWolf');
INSERT INTO Participant (id, displayName) VALUES (1010, 'SOLO JadeFalcon');
INSERT INTO Participant (id, displayName) VALUES (1011, 'SOLO KiloTango');
INSERT INTO Participant (id, displayName) VALUES (1012, 'SOLO LimaCharlie');
INSERT INTO Participant (id, displayName) VALUES (1013, 'SOLO MysticDragon');
INSERT INTO Participant (id, displayName) VALUES (1014, 'SOLO NovaPirate');
INSERT INTO Participant (id, displayName) VALUES (1015, 'SOLO OmegaSpartan');
INSERT INTO Participant (id, displayName) VALUES (1016, 'SOLO PhantomKnight');
INSERT INTO Participant (id, displayName) VALUES (1017, 'SOLO QuartzSpecter');
INSERT INTO Participant (id, displayName) VALUES (1018, 'SOLO RazorEdge');
INSERT INTO Participant (id, displayName) VALUES (1019, 'SOLO StormSeeker');
INSERT INTO Participant (id, displayName) VALUES (1020, 'SOLO TitaniumFist');

INSERT INTO Sponsor (id, name) VALUES (1, 'HyperX Gaming');
INSERT INTO Sponsor (id, name) VALUES (2, 'Red Bull Esports');
INSERT INTO Sponsor (id, name) VALUES (3, 'Logitech G');
INSERT INTO Sponsor (id, name) VALUES (4, 'Intel Gaming');
INSERT INTO Sponsor (id, name) VALUES (5, 'NVIDIA GeForce');

INSERT INTO Player (id, firstName, lastName, age) VALUES (1001, 'Max', 'Carter', 18);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1002, 'Ruby', 'Walsh', 24);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1003, 'Leo', 'Fletcher', 16);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1004, 'Zoe', 'Patel', 21);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1005, 'Oscar', 'Hughes', 19);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1006, 'Ella', 'Murray', 23);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1007, 'Felix', 'Pearson', 25);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1008, 'Ivy', 'Johnston', 20);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1009, 'Jasper', 'Sutton', 22);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1010, 'Grace', 'Gregory', 17);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1011, 'Milo', 'Barnes', 24);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1012, 'Nora', 'Bell', 18);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1013, 'Ezra', 'Dawson', 25);
INSERT INTO Player (id, firstName, lastName, age) VALUES (1014, 'Lila', 'George', 16);

INSERT INTO Venue (streetAddress, postalCode) VALUES ('123 King St', 'M5A 1A1');
INSERT INTO Venue (streetAddress, postalCode) VALUES ('456 Granville St', 'V6B 1B1');
INSERT INTO Venue (streetAddress, postalCode) VALUES ('789 Saint Catherine St', 'H3A 1B9');
INSERT INTO Venue (streetAddress, postalCode) VALUES ('101 Parliament Hill', 'K1P 5M7');
INSERT INTO Venue (streetAddress, postalCode) VALUES ('202 Stephen Ave', 'T2P 1B2');

-- 1 - 7 are team games
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8801, 5, 2);
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8802, 5, 2);
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8803, 5, 2);
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8804, 5, 2);
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8805, 5, 2);
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8806, 6, 2);
INSERT INTO TeamGame (id, teamSize, numTeams) VALUES (8807, 5, 2);

-- 8 - 19 are individual games
INSERT INTO IndividualGame (id) VALUES (8808);
INSERT INTO IndividualGame (id) VALUES (8809);
INSERT INTO IndividualGame (id) VALUES (8810);
INSERT INTO IndividualGame (id) VALUES (8811);
INSERT INTO IndividualGame (id) VALUES (8812);
INSERT INTO IndividualGame (id) VALUES (8813);
INSERT INTO IndividualGame (id) VALUES (8814);
INSERT INTO IndividualGame (id) VALUES (8815);
INSERT INTO IndividualGame (id) VALUES (8816); 
INSERT INTO IndividualGame (id) VALUES (8817); 
INSERT INTO IndividualGame (id) VALUES (8818);
INSERT INTO IndividualGame (id) VALUES (8819);

INSERT INTO Team (id, coach) VALUES (1001, 'Danny Sorensen');
INSERT INTO Team (id, coach) VALUES (1002, 'Kim Jeong-gyun');
INSERT INTO Team (id, coach) VALUES (1003, 'Dae-hee Park');
INSERT INTO Team (id, coach) VALUES (1004, 'Bok Han-gyu');
INSERT INTO Team (id, coach) VALUES (1005, 'Jacob Mebdi');

INSERT INTO Member (playerid, teamid) VALUES (1001, 1001);
INSERT INTO Member (playerid, teamid) VALUES (1002, 1001);
INSERT INTO Member (playerid, teamid) VALUES (1003, 1001);
INSERT INTO Member (playerid, teamid) VALUES (1004, 1001);
INSERT INTO Member (playerid, teamid) VALUES (1005, 1001);
INSERT INTO Member (playerid, teamid) VALUES (1006, 1002);
INSERT INTO Member (playerid, teamid) VALUES (1007, 1002);
INSERT INTO Member (playerid, teamid) VALUES (1008, 1002);
INSERT INTO Member (playerid, teamid) VALUES (1009, 1002);
INSERT INTO Member (playerid, teamid) VALUES (1010, 1002);

INSERT INTO Organizer (id, name, email) VALUES (1, 'Alex Harper', 'alex@example.com');
INSERT INTO Organizer (id, name, email) VALUES (2, 'Jordan Lee', 'jordan@example.com');
INSERT INTO Organizer (id, name, email) VALUES (3, 'Casey Kim', 'casey@example.com');
INSERT INTO Organizer (id, name, email) VALUES (4, 'Morgan Bailey', 'morgan@example.com');
INSERT INTO Organizer (id, name, email) VALUES (5, 'Taylor Chen', 'taylor@example.com');

INSERT INTO Tournament (id, name, startDate, endDate, streetAddress, city, country, organizerid, gameid) VALUES (1, 'Solo Cup', TO_DATE('2024-01-01', 'YYYY-MM-DD'), TO_DATE('2024-01-01', 'YYYY-MM-DD'), '123 King St', 'Toronto', 'Canada', 1, 8808);
INSERT INTO Tournament (id, name, startDate, endDate, streetAddress, city, country, organizerid, gameid) VALUES (2, 'Solo Tournament', TO_DATE('2024-02-01', 'YYYY-MM-DD'), TO_DATE('2024-02-01', 'YYYY-MM-DD'), '456 Granville St', 'Vancouver', 'Canada', 2, 8809);
INSERT INTO Tournament (id, name, startDate, endDate, streetAddress, city, country, organizerid, gameid) VALUES (3, 'Team Cup', TO_DATE('2024-03-01', 'YYYY-MM-DD'), TO_DATE('2024-03-01', 'YYYY-MM-DD'), '789 Saint Catherine St', 'Montreal', 'Canada', 3, 8810);
INSERT INTO Tournament (id, name, startDate, endDate, streetAddress, city, country, organizerid, gameid) VALUES (4, 'Team Tournament4', TO_DATE('2024-04-01', 'YYYY-MM-DD'), TO_DATE('2024-04-01', 'YYYY-MM-DD'), '101 Parliament Hill', 'Ottawa', 'Canada', 4, 8804);
INSERT INTO Tournament (id, name, startDate, endDate, streetAddress, city, country, organizerid, gameid) VALUES (5, 'Team Tournament', TO_DATE('2024-05-01', 'YYYY-MM-DD'), TO_DATE('2024-05-01', 'YYYY-MM-DD'), '202 Stephen Ave', 'Calgary', 'Canada', 5, 8805);

INSERT INTO Joins (pid, tid) VALUES (1001, 1);
INSERT INTO Joins (pid, tid) VALUES (1001, 2);
INSERT INTO Joins (pid, tid) VALUES (1001, 3);
INSERT INTO Joins (pid, tid) VALUES (1002, 1);
INSERT INTO Joins (pid, tid) VALUES (1002, 2);
INSERT INTO Joins (pid, tid) VALUES (1003, 3);
INSERT INTO Joins (pid, tid) VALUES (1004, 4);
INSERT INTO Joins (pid, tid) VALUES (1005, 5);

INSERT INTO Broadcast (tid, host, viewership) VALUES (1, 'GameCon Live', 1000);
INSERT INTO Broadcast (tid, host, viewership) VALUES (2, 'GameCon Live', 2000);
INSERT INTO Broadcast (tid, host, viewership) VALUES (3, 'GameCon Live', 1500);
INSERT INTO Broadcast (tid, host, viewership) VALUES (4, 'BlizzCon Virtual', 1800);
INSERT INTO Broadcast (tid, host, viewership) VALUES (5, 'BlizzCon Virtual', 2200);

INSERT INTO TournamentFunding (tid, sid, amount) VALUES (1, 1, 10000);
INSERT INTO TournamentFunding (tid, sid, amount) VALUES (2, 2, 20000);
INSERT INTO TournamentFunding (tid, sid, amount) VALUES (3, 3, 15000);
INSERT INTO TournamentFunding (tid, sid, amount) VALUES (4, 4, 18000);
INSERT INTO TournamentFunding (tid, sid, amount) VALUES (5, 5, 22000);

INSERT INTO Contract (pid, orgid, startDate, endDate, amount) VALUES (1001, 1, TO_DATE('2024-01-01', 'YYYY-MM-DD'), TO_DATE('2024-01-10', 'YYYY-MM-DD'), 1000);
INSERT INTO Contract (pid, orgid, startDate, endDate, amount) VALUES (1002, 2, TO_DATE('2024-02-01', 'YYYY-MM-DD'), TO_DATE('2024-02-10', 'YYYY-MM-DD'), 2000);
INSERT INTO Contract (pid, orgid, startDate, endDate, amount) VALUES (1003, 3, TO_DATE('2024-03-01', 'YYYY-MM-DD'), TO_DATE('2024-03-10', 'YYYY-MM-DD'), 1500);
INSERT INTO Contract (pid, orgid, startDate, endDate, amount) VALUES (1004, 4, TO_DATE('2024-04-01', 'YYYY-MM-DD'), TO_DATE('2024-04-10', 'YYYY-MM-DD'), 1800);
INSERT INTO Contract (pid, orgid, startDate, endDate, amount) VALUES (1005, 5, TO_DATE('2024-05-01', 'YYYY-MM-DD'), TO_DATE('2024-05-10', 'YYYY-MM-DD'), 2200);

INSERT INTO TeamPlays (teamid, gameid) VALUES (1001, 8801);
INSERT INTO TeamPlays (teamid, gameid) VALUES (1002, 8802);
INSERT INTO TeamPlays (teamid, gameid) VALUES (1003, 8803);
INSERT INTO TeamPlays (teamid, gameid) VALUES (1004, 8804);
INSERT INTO TeamPlays (teamid, gameid) VALUES (1005, 8805);

INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8808);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8809);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8810);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8811);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8812);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8813);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8814);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8815);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8816);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8817);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8818);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1001, 8819);

INSERT INTO PlayerPlays (playerid, gameid) VALUES (1002, 8809);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1002, 8810);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1002, 8814);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1002, 8815);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1002, 8811);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1003, 8812);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1004, 8813);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1005, 8814);
INSERT INTO PlayerPlays (playerid, gameid) VALUES (1005, 8815);

commit;