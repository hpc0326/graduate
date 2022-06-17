import cv2
import numpy as np

img = cv2.imread('./img/ntust_map.jpg')

h,w,l = np.shape(img)

(h1, w1) = img.shape[:2]

print(h,w,l)
print(h1,w1)

cv2.imshow('ntust_map' , img)

img1 = np.copy(img)

for x in range(200):
    img1[x,:] = 0

cv2.imshow('ntust_map' , img1)

img2 = np.copy(img)

for y in range(200):
    img2[:,y] = 0

cv2.imshow('ntust_map' , img2)