from flask import Flask, render_template, url_for, redirect, session, request
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)


import pymysql
# Configure your MySQL database settings
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'aizendb'


# Create a PyMySQL connection
mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB']
)

# oauth object
oauth = OAuth(app)

# Configure Google OAuth
GOOGLE_CLIENT_ID = 'Your client id'
GOOGLE_CLIENT_SECRET = 'you client secret'
CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'

oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url=CONF_URL,
    client_kwargs={
        'scope': 'openid email profile',
    },
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    redirect_uri = url_for('auth', _external=True)
    session['nonce'] = generate_token(20)
    print("Session nonce ", session['nonce'])
    return oauth.google.authorize_redirect(redirect_uri, nonce=session['nonce'])

@app.route('/auth')
def auth():
    token = oauth.google.authorize_access_token()
    user = oauth.google.parse_id_token(token, nonce=session['nonce'])
    session['user'] = user
    # add this user to database
    cursor = mysql.cursor()
    cursor.execute('SELECT Email_Id FROM aizen_user WHERE Email_Id = %s', (user['email'],))
    result = cursor.fetchone()
    if result:
        return redirect('/profile')
    else:
        print("-----------------------------")
        cursor.execute('INSERT INTO aizen_user (Name, Email_Id, Signup_Type ) VALUES (%s, %s, %s)', (user['name'], user['email'], "gmail" ))
        print("User added to database")
        print("-----------------------------")
        mysql.commit()
        return redirect('/profile')

@app.route('/profile')
def profile():
    user = session.get('user')
    print(user)
    if user:
        return render_template('profile.html', user=user)
    else:
        return redirect('/login')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True, port=5666)

