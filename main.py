import socket
import sqlite3
import json


def log(mail, password):
    owner = checkInOwners(mail, password)
    if len(owner) != 0:
        return {
            "role": "owner",
            "mail": owner[0][0],
            "fullname": owner[0][2],
            "freeSlots": owner[0][3],
            "busySlots": owner[0][4],
            "phone": owner[0][5]
        }
    visitor = checkInVisitors(mail, password)
    if len(visitor) != 0:
        return {
            "role": "visitor",
            "mail": visitor[0][0],
            "fullname": visitor[0][2],
            "ownerMail": visitor[0][3],
            "phone": visitor[0][4]
        }
    return {}


def reg(mail, password, role, fullname, phone, ownerMail=''):
    if role == 'owner' and len(checkInOwnersOnlyMail(mail)) == 0:
        cursor.execute(f"""
                        INSERT INTO owners VALUES ('{mail}', '{password}', '{fullname}', '[]', '[]', '{phone}')
                        """)
        connection.commit()
    elif role == "visitor" and len(checkInVisitorsOnlyMail(mail)) == 0:
        cursor.execute(f"""
                        INSERT INTO visitors VALUES ('{mail}', '{password}', '{fullname}', '{ownerMail}', '{phone}')
                        """)
        connection.commit()
    else:
        return 405
    return 200


def checkInOwners(mail, password):
    cursor.execute(f"""
            SELECT * FROM owners
            WHERE mail = '{mail}' and password = '{password}'
            """)
    rows = cursor.fetchall()
    return rows


def checkInOwnersOnlyMail(mail):
    cursor.execute(f"""
            SELECT * FROM owners
            WHERE mail = '{mail}'
            """)
    rows = cursor.fetchall()
    return rows


def checkInVisitors(mail, password):
    cursor.execute(f"""
            SELECT * FROM visitors
            WHERE mail = '{mail}' and password = '{password}'
            """)
    rows = cursor.fetchall()
    return rows


def checkInVisitorsOnlyMail(mail):
    cursor.execute(f"""
            SELECT * FROM visitors
            WHERE mail = '{mail}'
            """)
    rows = cursor.fetchall()
    return rows


def getTime(mail):
    cursor.execute(f"""
                SELECT * FROM owners
                WHERE mail = '{mail}'
                """)
    rows = cursor.fetchall()
    if len(rows) == 0:
        return None
    return {
        "freeSlots": rows[0][3],
        "busySlots": rows[0][4]
    }


def setFreeSlots(mail, password, data):
    cursor.execute(f"""UPDATE owners SET freeSlots = '{data}' where mail = '{mail}' and password = '{password}'""")
    connection.commit()


def setBusySlots(mail, password, data):
    cursor.execute(f"""UPDATE owners SET busySlots = '{data}' where mail = '{mail}' and password = '{password}'""")
    connection.commit()


def cleaner():
    cursor.execute("""
                DROP TABLE owners;
                """)
    cursor.execute("""
                DROP TABLE visitors;
                """)
    connection.commit()


def getInfo(mail):
    owner = checkInOwnersOnlyMail(mail)
    if len(owner) != 0:
        return {
            "role": "owner",
            "mail": owner[0][0],
            "fullname": owner[0][2],
            "freeSlots": owner[0][3],
            "busySlots": owner[0][4]
        }
    visitor = checkInVisitorsOnlyMail(mail)
    if len(visitor) != 0:
        return {
            "role": "visitor",
            "mail": visitor[0][0],
            "fullname": visitor[0][2],
            "ownerMail": visitor[0][3]
        }
    return None

connection = sqlite3.connect('mydatabase.db')
cursor = connection.cursor()

# cleaner()  # ------------очищение базы данных------------

cursor.execute("""
CREATE TABLE IF NOT EXISTS owners (
    mail TEXT,
    password TEXT,
    fullname TEXT,
    freeSlots TEXT,
    busySlots TEXT,
    phone TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS visitors (
    mail TEXT,
    password TEXT,
    fullname TEXT,
    ownerMail TEXT,
    phone TEXT
)
""")
connection.commit()

print(getInfo("vikalol2003"))
