import requests;
import json;
import unicodecsv as csv
import pandas as pd
from flask import Flask


base_url= 'https://api.github.com'
app = Flask(__name__)
api = Api(app)

class CommitData(Resource):

    #This function makes a get request to the github API and returns a JSON data
    def get_request(username,repo):
        url = '{}/repos/{}/{}/commits'.format(base_url,username,repo)
        response = requests.get(url)
        print(response.status_code)
        if response.status_code == 200:
            print("Connection successful.Decoding JSON")
        json_data = response.json()
        return json_data



    #The JSON data returned this function parses just the commit fields and returns a dict
    def parse_data(request):
        filtered_commits = {}
        i=0
        j=0
        for  k in request:
            filtered_commits[j] = request[i]['commit']
            i = i + 1
            j = j + 1
        filtered_json = json.dumps(filtered_commits)
        return filtered_json
        
# def dict_to_csv(dict_data):
#     field_names =['author',
#                     'committer',
#                     'message',
#                     'tree',
#                     'url',
#                     'comment_count',
#                     'verification'
#     ]
    
#     csv_file = "csv_file.csv"
#     with open(csv_file, 'wb') as csvfile:
#             writer = csv.DictWriter(csvfile, fieldnames=field_names)
#             writer.writeheader()
#             for data in dict_data:
#                 writer.writerow(data)
    
    api.add_resource(CommitData, '/commit')

    def main():
        username = 'torvalds'
        repo = 'Linux'
    
        request = get_request(username,repo)
        dict_data =parse_data(request)
        print(dict_data)
        # dict_to_csv(dict_data)

   
    
    
   
 #https://api.github.com/repos/torvalds/Linux/commits
    



    if __name__ == '__main__':
        main()
        app.run(port=5002)
        

