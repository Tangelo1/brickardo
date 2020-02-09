import websockets
import _thread
import time
import operator
import asyncio

HOST = '10.2.5.173'
SIZE = 1024
PORT = 42069
votes = {'forward': 0, 'back': 0, 'left': 0, 'right': 0}


def motor_controller():
    while True:
        time.sleep(3)
        if max(votes.values()) == 0:
            print('No Votes')
        else:
            print(max(votes.items(), key=operator.itemgetter(1))[0])
        votes['forward'] = 0
        votes['back'] = 0
        votes['right'] = 0
        votes['left'] = 0


async def on_new_client(websocket, path):
    check = await websocket.recv()
    print(check)
    if check != 'Hello Server':
        websocket.close()
    msg = 'Hello Client'
    await websocket.send(msg)
    while True:
        msg = await websocket.recv()
        print(msg)
        if msg == 'F':
            votes['forward'] = votes['forward'] + 1
        elif msg == 'R':
            votes['right'] = votes['right'] + 1
        elif msg == 'B':
            votes['back'] = votes['back'] + 1
        elif msg == 'L':
            votes['left'] = votes['left'] + 1
        else:
            pass
    websocket.close()


if __name__ == "__main__":

    _thread.start_new_thread(motor_controller, ())

    start_server = websockets.serve(on_new_client, HOST, 42069)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()

