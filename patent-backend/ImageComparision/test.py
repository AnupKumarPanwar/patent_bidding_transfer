import MySQLdb
from PIL import Image
import imagehash

db = MySQLdb.connect("localhost","root","biappanwar","dejavu")

cursor = db.cursor()

hash1 = imagehash.dhash(Image.open('sample.jpg'))
hash2 = imagehash.dhash(Image.open('sample2.jpg'))
hash3 = imagehash.dhash(Image.open('sample3.jpg'))
x = 'HEllo'
print(str(hash1))
print(str(hash2))
print(str(hash3))
print(type(hash1))
print(type(x))
print(hash2-hash3)