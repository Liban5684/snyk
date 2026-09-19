"""Intentionally vulnerable sample for Snyk demo - DO NOT USE IN PRODUCTION."""
import yaml
import requests
from flask import Flask, request, render_template_string

app = Flask(__name__)

# Vulnerable PyYAML usage - CVE-2017-18342 (yaml.load without Loader in 3.12)
def load_config(data):
    return yaml.load(data)

# Vulnerable requests + urllib3 combo
def fetch_url(url):
    # No timeout / verification - plus old requests 2.18.0 / urllib3 1.23
    return requests.get(url).text

@app.route('/')
def index():
    # SSTI risk with old Jinja2 2.10 + Flask 0.12
    name = request.args.get('name', 'Snyk Demo')
    return render_template_string(f"<h1>Hello {name}</h1>")

@app.route('/fetch')
def fetch():
    url = request.args.get('url', 'http://example.com')
    return fetch_url(url)

if __name__ == '__main__':
    # Debug enabled + old Django/Flask for Snyk to flag
    app.run(host='0.0.0.0', port=5000, debug=True)
