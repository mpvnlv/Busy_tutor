import socket
import sqlite3
import json


def log(mail, password):
    pass


def reg(mail, password, role, fullname, phone, ownerMail=''):
    pass


def checkInOwners(mail, password):
    pass


def checkInOwnersOnlyMail(mail):
    pass


def checkInVisitors(mail, password):
    pass


def checkInVisitorsOnlyMail(mail):
    pass


def getTime(mail):
    pass


def setFreeSlots(mail, password, data):
    pass


def setBusySlots(mail, password, data):
    pass


def getInfo(mail):
    pass


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


    connection.commit()
    print(f"--------------------{cn}--------------------")
    print()
    head = f'HTTP/1.1 {code_response} {"OK" if code_response == 200 else "FAIL"}\r\n' \
           f'Content-Type: application/json; charset=utf-8\r\nAccess-Control-Allow-Origin: *\r\n' \
           f'Access-Control-Allow-Headers: *\r\n\r\n'
    content.send(head.encode() + json.dumps(res).encode())
    content.close()
