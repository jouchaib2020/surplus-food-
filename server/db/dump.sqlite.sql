-- TABLE
CREATE TABLE Bags (
  BagID INTEGER PRIMARY KEY AUTOINCREMENT,
  BagName VARCHAR(255),
  BagType VARCHAR(50) CHECK (BagType IN ('Regular', 'Surprise')),
  Price INTEGER NOT NULL,
  Size varchar(255) NOT NULL CHECK(Size in ('small', 'medium', 'big')),
  PickUpTime DATETIME DEFAULT (datetime('now','localtime')) NOT NULL,
  EstabID INTEGER NOT NULL,
  FOREIGN KEY (EstabID) REFERENCES Establishments(estabid)
  
);
CREATE TABLE Establishments (
  EstabID INTEGER PRIMARY KEY AUTOINCREMENT,
  EstabName VARCHAR(255),
  EstabType VARCHAR(50) CHECK (EstabType IN ('store', 'restaurant')),
  Adress TEXT DEFAULT 'Not Specified',
  PhoneNumber TEXT DEFAULT 'Not Specified',
  FoodCategory TEXT DEFAULT 'Not Specified'
);
CREATE TABLE Items(
  ItemID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT not NULL,
  Quantity INTEGER DEFAULT 1,
  Notes TEXT,
  BagID INTEGER NOT NULL,
  FOREIGN KEY (BagID) REFERENCES Bags(bagid)
  
);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE "users" (
	"id"	INTEGER NOT NULL,
	"email"	TEXT NOT NULL,
	"name"	TEXT,
	"hash"	TEXT NOT NULL,
	"salt"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
