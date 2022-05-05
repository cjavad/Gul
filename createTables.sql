CREATE TABLE IF NOT EXISTS `Bruger` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    navn VARCHAR(256),
    discordid VARCHAR(28) UNIQUE,
    mahogony_coin INT,
    d_slot1 INT UNIQUE,
    d_slot2 INT UNIQUE,
    d_slot3 INT UNIQUE,
    rank_score INT,
    xp_multiplier FLOAT,
    last_login DATE,
    created_at DATE,
    last_used DATE
);

--

CREATE TABLE IF NOT EXISTS `FighterPedia` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    navn VARCHAR(256),
    billede VARCHAR(256),
    moves JSON,
    types JSON,
    stats JSON,
    price int,
    rarity FLOAT
);

--

CREATE TABLE IF NOT EXISTS `Fighter` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    custom_name VARCHAR(256),
    fid INT,
    xp INT,
    added_stats JSON,
    bid INT 
); 