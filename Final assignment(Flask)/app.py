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

# Product Class/Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self): 
        return '<User %r>' % self.username

# Schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ("id","username", "email")

#init Schema
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


# Create a product
@app.route('/product', methods=['POST'])
def add_product():
    name = request.json['name']
    email = request.json['email']
    
    new_product = Product(name, email)

    db.session.add(new_product)
    db.session.commit()

    return product_schema.jsonify(new_product)

# Get All Products
@app.route('/product', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    result = products_schema.dump(all_products)
    return jsonify(result)

@app.route('/product/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    return product_schema.jsonify(product)

# update a product
@app.route('/product/<id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get(id)

    name = request.json['name']
    email = request.json['email']
    
    product.name = name
    product.email = email

    db.session.commit()

    return product_schema.jsonify(product)

# Delete
@app.route('/product/<id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return product_schema.jsonify(product)

#Run Server
if __name__=='__main__':
    #print(basedir,' sqlite:///'+os.path.join(basedir, 'db.sqlite'));
    app.run(debug=True)
