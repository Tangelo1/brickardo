from nanpy import ArduinoApi
from nanpy import Stepper
from nanpy.serialmanager import SerialManager
from nanpy.arduinotree import ArduinoTree

STEPS_PER_REV = 2038
VROOM = 5

connection = SerialManager()
print(connection)

a = ArduinoApi(connection=connection)
leftStep = Stepper(8, 9, 10, 11)
rightStep = Stepper(4, 5, 6, 7)


if __name__ == '__main__':

    leftStep.setSpeed(VROOM)
    rightStep.setSpeed(VROOM)

    while True:

        a = ArduinoTree(connection=connection)
        print(a)
        a.soft_reset()
        print(a)
        leftStep.step(STEPS_PER_REV)
        rightStep.step(STEPS_PER_REV)