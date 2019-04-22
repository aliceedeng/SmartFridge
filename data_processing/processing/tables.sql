CREATE TABLE ingredient_in
(
    rid CHAR(64) NOT NULL,
    num INTEGER NOT NULL,
    name NCHAR(512) NULL,
    unit NCHAR(64) NULL,
    qty DECIMAL(18, 5) NULL,
    input NVARCHAR2(1024) NOT NULL,
    display NVARCHAR2(2000) NOT NULL,
    comment NVARCHAR2(1024) NULL,
    usda_id INTEGER NOT NULL,
    PRIMARY KEY(rid, num),
    FOREIGN KEY(rid) REFERENCES RECIPES(rid),
    FOREIGN KEY(usda_id) REFERENCES USDA(usda_id)
);


/*
CREATE TABLE recipes
(
    rid CHAR(64) PRIMARY KEY,
    title NCHAR(400) NULL,
    instructions CLOB NULL,
    picture_link CHAR(64)  NULL,
    src CHAR(8)  NULL
);
*/


/*
CREATE TABLE usda
(
    usda_id INTEGER PRIMARY KEY,
    cal DECIMAL(18, 5) NULL,
    protein DECIMAL(18, 5)  NULL,
    sugar DECIMAL(18, 5)  NULL,
    sodium DECIMAL(18, 5)  NULL,
    cholesterol DECIMAL(18, 5)  NULL,
    hwt_1 DECIMAL(18, 5)  NULL,
    house_1 NCHAR(200)  NULL,
    hwt_2 DECIMAL(18, 5)  NULL,
    house_2 NCHAR(200)  NULL,
    name NCHAR(200)  NULL
);
*/
