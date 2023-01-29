from flask import Flask,render_template,jsonify,request
from .my_package import calculator

app = Flask(__name__)
app.config['SECRET_KEY'] = 'guzamak007xd'


@app.route('/')
def HOME():
    return render_template('HOME.html',)
 
@app.route('/bmrcal',methods=["post"])
def bmrcal():
    s = request.form['sex']
    w = request.form['weight']
    h = request.form['height']
    a = request.form['age']
    bmr = calculator.BMRCAL(s,w,h,a)
    return jsonify({"bmr" : bmr})

@app.route('/tdeecal',methods=["post"])
def tdeecal():
    a = request.values.get('tdeeans')
    bmr = request.values.get('bmr')
    tdee = calculator.TDEECAL(int(bmr),a)
    return jsonify({"tdee":tdee})

@app.route('/calcal',methods=["post"])
def calcal():
    tdee = request.values.get('tdee')
    w = request.values.get('weight')
    nw  =  request.form['newweight']
    d   =  request.form['day']
    calperday = calculator.CALCAL(int(tdee),int(w),int(nw),int(d))
    return jsonify({"calperday":calperday})


if __name__ == "__main__":
    app.run(debug=True)