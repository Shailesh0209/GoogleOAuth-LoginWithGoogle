# GoogleOAuth-LoginWithGoogle

1. vvip: google uri should exactly match with where our flask app is running: http://127.0.0.1:5000/auth

How to Run
1. create a venv & activate it
2. install requirements.txt: pip install -r requirements.txt
3. create an oAuth in console.cloud.google.com and add your uri where your code will run locally or globally
   - For my case Authorised redirect URIs (kind info: your local url exactly match with that u have written in the api & services of google cloud
   - http://127.0.0.1:5666/auth
4. python app.py or python3 app.py
