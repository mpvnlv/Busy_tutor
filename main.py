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

server = socket.create_server(("", 2000))
server.listen(100)
cn = 0
while True:
    cn += 1
    content, address = server.accept()

    request = content.recv(102400).decode().split('\n')
    print(f"--------------------{cn}--------------------")
    print(request[0])

    method, url, prot = request[0].split()

    code_response = 200
    res = {}
    if method == "POST":
        data_json = dict()
        if request[-1] != '':
            data_json = json.loads(request[-1])

        print(data_json)
        if data_json.get("type", "-") == "log" and "mail" in data_json and "password" in data_json:
            res = log(data_json["mail"], data_json["password"])
        elif data_json.get("type", "-") == "reg" and "mail" in data_json and "password" in data_json \
                and "role" in data_json and "fullname" in data_json and "phone" in data_json:
            code_response = reg(data_json["mail"], data_json["password"], data_json["role"], data_json["fullname"], data_json["phone"], data_json.get("ownerMail", ""))
        elif data_json.get("type", "-") == "getTime" and "mail" in data_json:
            res = getTime(data_json["mail"])
            if res is None:
                res = {}
                code_response = 406
        elif data_json.get("type", "-") == "setTime" and "mail" in data_json and "password" in data_json \
                and "freeSlots" in data_json and "busySlots" in data_json:
            if len(checkInOwners(data_json["mail"], data_json["password"])) != 0:
                setFreeSlots(data_json["mail"], data_json["password"], data_json["freeSlots"])
                setBusySlots(data_json["mail"], data_json["password"], data_json["busySlots"])
            else:
                print(checkInOwners(data_json["mail"], data_json["password"]))
                code_response = 406
        else:
            code_response = 404

    connection.commit()
    print(f"--------------------{cn}--------------------")
    print()
    head = f'HTTP/1.1 {code_response} {"OK" if code_response == 200 else "FAIL"}\r\n' \
           f'Content-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\n' \
           f'Access-Control-Allow-Headers: *\r\n\r\n'
    # content.send(b'HTTP/1.1 200 OK\r\n')
    # content.send(b'Content-Type: text/html; charset=utf-8\r\n')
    # content.send(b'Access-Control-Request-Headers: content-type\r\n')
    # content.send(b'Access-Control-Request-Method: POST\r\n')
    content.send(head.encode() + json.dumps(res).encode())
    content.close()
