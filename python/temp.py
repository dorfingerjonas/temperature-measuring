import os
import glob
import time
import json
from firebase import firebase


with open('config.json', 'r') as c:
    config = json.load(c)

firebase = firebase.FirebaseApplication(config['url'], None)

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'


def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines


def read_temp():
    lines = read_temp_raw()

    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()

    equals_pos = lines[1].find('t=')

    if equals_pos != -1:
        temp_string = lines[1][equals_pos + 2:]
        temp_c = float(temp_string) / 1000

        return temp_c


def insert_into_db(value):
    data = {
        'temp': value,
        'timestamp': str(int(time.time() * 1000))
    }

    firebase.post('/temperature/history/', data)
    firebase.put('/temperature', 'currentTemperature', data)


print('Started with url ' + str(config['url']) + ' and interval of ' +
      str(firebase.get('temperature/interval', '')) + ' second(s).')

while True:
    insert_into_db(read_temp())
    time.sleep(int(firebase.get('temperature/interval', '')))
