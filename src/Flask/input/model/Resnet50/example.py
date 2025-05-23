
# TF for image classification model

import tensorflow
import numpy
from PIL import Image

model = tensorflow.saved_model.load('./')
classes = [ "agkistrodon-contortrix" ,  "agkistrodon-piscivorus" ,  "coluber-constrictor" ,  "crotalus-atrox" ,  "crotalus-horridus" ,  "crotalus-ruber" ,  "crotalus-scutulatus" ,  "crotalus-viridis" ,  "diadophis-punctatus" ,  "haldea-striatula" ,  "heterodon-platirhinos" ,  "lampropeltis-californiae" ,  "lampropeltis-triangulum" ,  "masticophis-flagellum" ,  "natrix-natrix" ,  "nerodia-erythrogaster" ,  "nerodia-fasciata" ,  "nerodia-rhombifer" ,  "nerodia-sipedon" ,  "opheodrys-aestivus" ,  "pantherophis-alleghaniensis" ,  "pantherophis-emoryi" ,  "pantherophis-guttatus" ,  "pantherophis-obsoletus" ,  "pantherophis-spiloides" ,  "pantherophis-vulpinus" ,  "pituophis-catenifer" ,  "rhinocheilus-lecontei" ,  "storeria-dekayi" ,  "storeria-occipitomaculata" ,  "thamnophis-elegans" ,  "thamnophis-marcianus" ,  "thamnophis-proximus" ,  "thamnophis-radix" ,  "thamnophis-sirtalis" , ]

img = Image.open("image2.jfif").convert('RGB')
img = img.resize((300, 300 * img.size[1] // img.size[0]), Image.ANTIALIAS)
inp_numpy = numpy.array(img)[None]


inp = tensorflow.constant(inp_numpy, dtype='float32')

class_scores = model(inp)[0].numpy()


print("")
print("class_scores", class_scores)
print("Class : ", classes[class_scores.argmax()])