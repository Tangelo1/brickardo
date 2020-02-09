import serial

port = '/dev/ttyACM0'

ard = serial.Serial(port,9600,timeout=5)

def forward_motor():
    ard.write(str.encode('w'))
    print(ard.readline())
    ard.write(str.encode(' '))

def back_motor():
    ard.write(str.encode('s'))
    print(ard.readline())
    ard.write(str.encode(' '))
    
def right_motor():
    ard.write(str.encode('d'))
    print(ard.readline())
    ard.write(str.encode(' '))
    
def left_motor():
    ard.write(str.encode('a'))
    print(ard.readline())
    ard.write(str.encode(' '))


    