import cv2 
import numpy as np
#import matplotlib.pyplot as plt
#import glob
#from IPython.display import clear_output
from fastapi.responses import StreamingResponse
from sympy import * 

points = np.array([
    [260, 1290], [260 , 1098], [260, 896], [260, 695], [417, 695], [417, 570], [616, 570],
    [666, 695], [666, 896], [829, 800], [829, 896], [829, 970], [829, 1098], [829, 1290],
    [904, 1253], [904, 970], [939, 869], [939, 746], [939, 570], [939, 377], [939, 332],
    [1007, 970], [1007, 1167], [1007, 1253], [1149, 1253], [1149, 1167], [1149, 970],
    [1149, 869], [1278, 1253], [1065, 746], [1258, 746], [1065, 435], [1065, 332] , [1258, 332],
    [1258, 435], [1428, 332], [1428, 746], [1428, 869], [1428, 970], [1428, 1100], [1428, 1182],
    [1428, 1288], [1617, 1288], [1617, 1100], [1617, 869], [1790, 147], [1790, 252], [1790, 332],
    [1790, 512], [1790, 702], [1790, 778], [1790, 869], [1790, 1100], [1790, 1133], [1790, 1248],
    [2094, 252], [2094, 512], [1981, 512], [1981, 702], [2094, 778], [2060, 778], [2060, 869],
    [2060, 1133], [2060, 1248]
])

def show_img(img, bigger=False):
    if bigger:
        plt.figure(figsize=(15,15))
    image_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    plt.imshow(image_rgb)
    plt.show()

def resize_img(img, scale_percent=25):

    width = int(img.shape[1] * scale_percent / 100) 
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
    resize_img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)  

    return resize_img

def picture(lat , lng):
    #img1
    file_name = "./img/map2.png"
    img1 = cv2.imread(file_name)

    #img2
    file_name = "./img/placeholder.png"
    img2 = cv2.imread(file_name)

    #resize the img2
    img2 = resize_img(img2, scale_percent = 25)

    img2gray = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)
    ret, mask = cv2.threshold(img2gray, 254, 255, cv2.THRESH_BINARY)

    #receive the sizeInfo from img2

    rows, cols, channels = img2.shape
    print(img1.shape)
    print(img2.shape)
    #linear transform
    origin = [25.01390648525629 , 121.54461886896823 ]
    x_axis = [25.011100933885338 , 121.54117377377323925]
    y_axis = [25.01571636583346, 121.54266712547633]

    a = (x_axis[0] - origin[0])/(2560-128)
    #print(a)
    b = (x_axis[1] - origin[1])/(2560-91)
    #print(b)
    m = (y_axis[0] - origin[0])/(1440-128)
    #print(m)
    n = (y_axis[1] - origin[1])/(1440-91)
    #print(n)

    lat_c = lat - 25.01390648525629
    lng_c = lng - 121.54461886896823
    x = Symbol('x')
    y = Symbol('y')

    f1 = x*a + y*m - lat_c
    f2 = x*b + y*n - lng_c


    sol = solve((f1, f2) , x, y)

    x = int(sol.get(x))
    y = int(sol.get(y))
    print(x ,'  ' ,  y)
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

    #draw line
    """print(img1.shape)
    for i in range(0 , img1.shape[0]):
        cv2.line(img1, (i*25 , 0), (i*25 ,img1.shape[0] ), (255,0,0), 5)
        
    for i in range(0 , img1.shape[1]):
        cv2.line(img1 , (0 , i*25) , ( img1.shape[1] , i*25) , (0 , 0, 255) , 5)"""

    #write file
    cv2.imwrite('output.jpg', img1)
    file_name = open('./output.jpg' , mode = 'rb')
    return StreamingResponse(file_name , media_type= 'image/jpeg')

picture(25.01390648525629 , 121.54461886896823)

