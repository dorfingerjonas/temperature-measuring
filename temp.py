import random
import time


def read_demo_temp():
    return random.random() * 50


while True:
    print(read_demo_temp())
    time.sleep(1)
