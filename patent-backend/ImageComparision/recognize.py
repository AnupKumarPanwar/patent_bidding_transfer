import MySQLdb
from PIL import Image
import imagehash
import numpy
import sys
import json
option = sys.argv[1]

db = MySQLdb.connect("localhost", "root", "biappanwar", "dejavu")
cursor = db.cursor()
hash = imagehash.average_hash(Image.open(sys.argv[2]))

if option == "--recognize":
    getAllHashesQuery = "SELECT * FROM images"
    try:
        minDiff = 30
        similarFound = False
        similarImage = {}
        cursor.execute(getAllHashesQuery)
        result = cursor.fetchall()
        for row in result:
            hashDiff = imagehash.hex_to_hash(row[2])-hash
            if (hashDiff <= minDiff):
                minDiff = hashDiff
                similarFound = True
                similarImage = row
        if(similarFound):
            res = {'similarFound': True,
                   'image_id': similarImage[0], 'image_name': similarImage[1], 'difference': minDiff}
            print(res)
        else:
            res = {'similarFound': False}
            print(res)
    except Exception as e:
        print(e)
elif option == "--fingerprint":
    insertHashQuery = "INSERT INTO images (name, hash) VALUES ('%s', '%s')" % (
        sys.argv[2], str(hash))
    try:
        cursor.execute(insertHashQuery)
        db.commit()
    except Exception as e:
        print(e)
