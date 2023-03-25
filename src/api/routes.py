"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User.query.filter_by(email=email,password=password,is_active=True).first()
    #realizar la logica de validacion
    if user:
        access_token=create_access_token(identity=email)
        response_body={"email":email,
                        "access_token":access_token}

        return response_body,200
    else:
        response_body={"message":"invalid user,bad password or inactive user"}

        return response_body, 410

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body={
        "email":current_user,
        "message":"logged_in"
    }
    
    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():  
    request_body = request.get_json()
    emailEntrada=request_body['email']
    passwordEntrada=request_body['password']

    user=User.query.filter_by(email=emailEntrada).first()
    #Comprobamos si ese usuario existe con ese email de entrada
    if user:
          response_body={
            "email":emailEntrada,
            "message":"Usuario ya existente",
            "codigo":210}
    else:
        user = User(email=emailEntrada ,
                password=passwordEntrada ,
                is_active=True)

        response_body={
            "email":emailEntrada,
            "message":"usuario creado",
            "codigo":220}
            
        db.session.add(user)
        db.session.commit()

    return jsonify(response_body)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200