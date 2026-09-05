import ssl
import pyexasol


def get_connection():
    return pyexasol.connect(
        dsn="127.0.0.1:9563",
        user="sys",
        password="exasol",
        websocket_sslopt={
            "cert_reqs": ssl.CERT_NONE
        }
    )