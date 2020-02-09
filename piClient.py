import socket

HOST = '10.2.5.173'
PORT = 42069


if __name__ == "__main__":
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST,PORT))

    s.sendall(b'Hello Server')
    msg = s.recv(1024)
    if msg != b'Hello Client':
        s.close()
    while True:

        val = input("Direction(F, B, R, L): ")
        s.sendall(str.encode(val))

    s.close()
