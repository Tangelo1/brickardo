import websockets
import _thread
import time
import operator
import asyncio


total_collected_clients = 0
total_votes = 0
#HOST = '10.2.5.173'
HOST = '10.2.6.216'
PORT = 42069
votes = {'forward': 0, 'back': 0, 'left': 0, 'right': 0}
client_list = []


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
    try:
        global total_collected_clients, total_votes
        check = await websocket.recv()
        print(check)
        if check != 'Hello Server':
            websocket.close()
        msg = 'Hello Client'
        await websocket.send(msg)

        client_list.append(websocket)

        total_collected_clients += 1
        for socket in client_list:
            await socket.send('total: ' + str(total_collected_clients))


        while True:
            msg = await websocket.recv()
            print(msg)
            if msg == 'F':
                total_votes += 1
                votes['forward'] = votes['forward'] + 1
            elif msg == 'R':
                total_votes += 1
                votes['right'] = votes['right'] + 1
            elif msg == 'B':
                total_votes += 1
                votes['back'] = votes['back'] + 1
            elif msg == 'L':
                total_votes += 1
                votes['left'] = votes['left'] + 1
            else:
                pass
            for socket in client_list:
                await socket.send('current: ' + str(len(client_list)))
                await socket.send(str(votes))
    finally:
        client_list.remove(websocket)
        for socket in client_list:
            await socket.send('current: ' + str(len(client_list)))
        await websocket.close()


if __name__ == "__main__":

    _thread.start_new_thread(motor_controller, ())

    start_server = websockets.serve(on_new_client, HOST, 42069)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()

