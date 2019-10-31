import requests;


r = requests.get("https://api.github.com/repos/:phadej/events")

data = r.json()

print(data)