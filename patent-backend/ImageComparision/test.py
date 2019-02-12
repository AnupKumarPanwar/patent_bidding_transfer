import MySQLdb
from PIL import Image
import imagehash

db = MySQLdb.connect("localhost","root","biappanwar","dejavu")

cursor = db.cursor()

hash1 = imagehash.dhash(Image.open('sample.jpg'))
hash2 = imagehash.average_hash(Image.open('sample2.jpg'))
hash3 = imagehash.average_hash(Image.open('sample3.jpg'))
x = 'HEllo'
print(str(hash1))
print(hash2)
print(hash3)
print(type(hash1))
print(type(x))
print(hash2-hash3)