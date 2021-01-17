from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os 

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

#database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(basedir, 'db.sqlite')
# 如果设置为 True（默认值），Flask-SQLAlchemy 将跟踪对象的修改并发出信号。这需要额外的内存，如果不需要，可以将其禁用。
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

# Student Class/Model
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    gender = db.Column(db.String(20))
    age = db.Column(db.String(10))
    TelNum = db.Column(db.String(70), unique=True)

    def __init__(self, name, gender, age, TelNum):
        self.name = name
        self.gender = gender
        self.age = age
        self.TelNum = TelNum

    def __repr__(self): 
        return '<User %r>' % self.name

# Schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ("id","name","gender","age","TelNum")

#init Schema
student_schema = ProductSchema()
students_schema = ProductSchema(many=True)


# Create a student
@app.route('/student', methods=['POST'])
def add_student():
    name = request.json['name']
    gender = request.json['gender']
    age = request.json['age']
    TelNum = request.json['TelNum']
    
    new_student = Student(name, gender, age, TelNum)

    db.session.add(new_student)
    db.session.commit()

    return student_schema.jsonify(new_student)

# Get All students
@app.route('/student', methods=['GET'])
def get_students():
    all_students = Student.query.all()
    result = students_schema.dump(all_students)
    return jsonify(result)

# Get a student
@app.route('/student/<id>', methods=['GET'])
def get_student(id):
    student = Student.query.get(id)
    return student_schema.jsonify(student)

# Update a student
@app.route('/student/<id>', methods=['PUT'])
def update_student(id):
    student = Student.query.get(id)

    name = request.json['name']
    gender = request.json['gender']
    age = request.json['age']
    TelNum = request.json['TelNum']
    
    student.name = name
    student.gender = gender
    student.age = age
    student.TelNum = TelNum

    db.session.commit()

    return student_schema.jsonify(student)

# Delete a student
@app.route('/student/<id>', methods=['DELETE'])
def delete_student(id):
    student = Student.query.get(id)
    db.session.delete(student)
    db.session.commit()
    return student_schema.jsonify(student)

#Run Server
if __name__=='__main__':
    #print(basedir,' sqlite:///'+os.path.join(basedir, 'db.sqlite'));
    app.run(debug=True)
    