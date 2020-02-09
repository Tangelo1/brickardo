import websockets
import _thread
import time
import operator
import asyncio
from motorFunctions import forward_motor, back_motor, left_motor, right_motor


total_collected_clients = 0
total_votes = 0
#Pi
HOST = '10.2.5.173'

#Tylers Machine
#HOST = '10.2.6.216'
PORT = 42069
votes = {'forward': 0, 'back': 0, 'left': 0, 'right': 0}
forward_votes, left_votes, right_votes, back_votes = 0, 0, 0, 0 
client_list = []
timer = 0


def motor_controller():
    global timer
    while True:
        for x in range(0, 5):
            timer = x
            time.sleep(1)
        if max(votes.values()) == 0:
            pass
        else:
            vote = max(votes.items(), key=operator.itemgetter(1))[0]
            print(vote)
            if vote == 'forward':
                _thread.start_new_thread(forward_motor, ())
            elif vote == 'back':
                _thread.start_new_thread(back_motor, ())
            elif vote == 'right':
                _thread.start_new_thread(right_motor, ())
            elif vote == 'left':
                _thread.start_new_thread(left_motor, ())
            else:
                pass
        votes['forward'] = 0
        votes['back'] = 0
        votes['right'] = 0
        votes['left'] = 0


async def on_new_client(websocket, path):
    try:
        global total_collected_clients, total_votes, timer, forward_votes, left_votes, right_votes, back_votes
        check = await websocket.recv()
        print(check)
        if check != 'Hello Server':
            websocket.close()
        msg = 'time: ' + str(timer+1)
        await websocket.send(msg)

        client_list.append(websocket)

        total_collected_clients += 1
        for socket in client_list:
            await socket.send('total_votes: ' + str(total_votes))
            await socket.send('total: ' + str(total_collected_clients))
            await socket.send('current: ' + str(len(client_list)))
            await socket.send('frbl: %s, %s, %s, %s' % (str(forward_votes), str(right_votes), str(back_votes), str(left_votes)))
            await socket.send(str(votes))


        while True:
            msg = await websocket.recv()
            print(msg)
            if msg == 'F':
                forward_votes += 1
                total_votes += 1
                votes['forward'] = votes['forward'] + 1
            elif msg == 'R':
                right_votes += 1
                total_votes += 1
                votes['right'] = votes['right'] + 1
            elif msg == 'B':
                back_votes += 1
                total_votes += 1
                votes['back'] = votes['back'] + 1
            elif msg == 'L':
                left_votes += 1
                total_votes += 1
                votes['left'] = votes['left'] + 1
            else:
                pass
            for socket in client_list:
                await socket.send('frbl: %s, %s, %s, %s' % (str(forward_votes), str(right_votes), str(back_votes), str(left_votes)))
                await socket.send('total_votes: ' + str(total_votes))
                await socket.send('total: ' + str(total_collected_clients))
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

