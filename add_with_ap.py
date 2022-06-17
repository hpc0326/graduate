import cv2

img1 = cv2.imread('./img/ntust_map.jpg')
img2 = cv2.imread('./img/google.png')

w = img1.shape[1]   # 讀取圖片寬度
print(img1.shape)
h = img1.shape[0]   # 讀取圖片高度
print(img2.shape)
for i in range(w):
    img1[:,i,0] = img1[:,i,0]*((300-i)/300) + img2[:,i,0]*(i/300)  # 藍色按照比例混合
    img1[:,i,1] = img1[:,i,1]*((300-i)/300) + img2[:,i,1]*(i/300)  # 紅色按照比例混合
    img1[:,i,2] = img1[:,i,2]*((300-i)/300) + img2[:,i,2]*(i/300)  # 綠色按照比例混合

cv2.imwrite('oxxostudio.png', save)

