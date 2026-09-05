import ssl
import pyexasol

connection = pyexasol.connect(
    dsn="127.0.0.1:9563",
    user="sys",
    password="exasol",
    websocket_sslopt={
        "cert_reqs": ssl.CERT_NONE
    }
)

result = connection.execute("SELECT 1 AS test")

print("SUCCESS!")
print(result.fetchall())

connection.close()