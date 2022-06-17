import cv2 
import numpy as np
#import matplotlib.pyplot as plt
#import glob
#from IPython.display import clear_output
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sympy import * 

app = FastAPI()

"""origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
"""
"""
def show_img(img, bigger=False):
    if bigger:
        plt.figure(figsize=(15,15))
    image_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    plt.imshow(image_rgb)
    plt.show()"""

def resize_img(img, scale_percent=25):

    width = int(img.shape[1] * scale_percent / 100) 
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    resize_img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)  
    
    return resize_img

def picture(lat , lng):
    #img1
    file_name = "./img/ntust_map.jpg"
    img1 = cv2.imread(file_name)

    #img2
    file_name = "./img/img2.png"
    img2 = cv2.imread(file_name)

    #resize the img2
    img2 = resize_img(img2, scale_percent = 25)

    img2gray = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)
    ret, mask = cv2.threshold(img2gray, 254, 255, cv2.THRESH_BINARY)

    #receive the sizeInfo from img2

    rows, cols, channels = img2.shape

    #linear transform
    origin = [25.01390648525629 , 121.54461886896823 ]
    x_axis = [25.011100933885338 , 121.54117377377323925]
    y_axis = [25.01571636583346, 121.54266712547633]
    
    a = (x_axis[0] - origin[0])/3260
    #print(a)
    b = (x_axis[1] - origin[1])/3260
    #print(b)
    m = (y_axis[0] - origin[0])/1835
    #print(m)
    n = (y_axis[1] - origin[1])/1835
    #print(b)

    lat_c = lat - 25.01390648525629
    lng_c = lng - 121.54461886896823
    x = Symbol('x')
    y = Symbol('y')

    f1 = x*a + y*m - lat_c
    f2 = x*b + y*n - lng_c


    sol = solve((f1, f2) , x, y)

    x = int(sol.get(x))
    y = int(sol.get(y))

    roi = img1[y:y+rows, x:x+cols]


    # Now black-out the area of logo in ROI
    img1_bg = cv2.bitwise_and(roi, roi, mask = mask)
    #show_img(img1_bg)
    mask_inv = cv2.bitwise_not(mask)
    #show_img(mask_inv)
    # Take only region of logo from logo image.
    img2_fg = cv2.bitwise_and(img2, img2, mask = mask_inv)
    #how_img(img2_fg)
    # Put logo in ROI and modify the main image
    dst = cv2.add(img1_bg,img2_fg)
    img1[y:y+rows, x:x+cols] = dst

    #write file
    cv2.imwrite('output.jpg', img1)
    file_name = open('./output.jpg' , mode = 'rb')
    return StreamingResponse(file_name , media_type= 'image/jpeg')

#picture(25.013362460447322, 121.54140203728495)

"""def picture():
    file_name = open('img/ntust_map.jpg' , mode = 'rb')
    return StreamingResponse(file_name , media_type="image/jpeg")

@app.get("/picture")
def read_root():
    return picture()"""

def tryit(lat , lng):
    return {'lat' : lat , 'lng' : lng}

@app.get('/map/')
def read_root(lat : float , lng : float ):
    return picture(lat , lng)
   