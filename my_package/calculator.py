def BMRCAL(sex="",weight=0,height=0,age=0):
    if sex =="ชาย":
        bmr = int(66+(13.75*int(weight))+(5.003*int(height))-(6.755*int(age)))
        return bmr
    elif sex == "หญิง":
        bmr = int(655+(9.563*int(weight))+(1.85*int(height))-(4.676*int(age)))
        return bmr
    else:
        bmr = 0
        return bmr

def TDEECAL(bmr=0,a=''):
    tdeenum = [1.2,1.375,1.55,1.725,1.9]
    tdee = int(bmr*tdeenum[int(a)-1])
    return tdee


def CALCAL(tdee,w,nw,d):
    cal = int((((int(nw)-int(w))*7700)/int(d))+tdee)
    return cal


