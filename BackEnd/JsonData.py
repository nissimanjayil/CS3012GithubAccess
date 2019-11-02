import requests;
import json;
import csv;

base_url= 'https://api.github.com'



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
    return filtered_commits
    
    

def main():
    username = 'torvalds'
    repo = 'Linux'
   
    request = get_request(username,repo)
    data =parse_data(request)
   
    i=0
    for i in data:   
        print(data[i])
        i = i+1
       
     
    # author = ['name',
    #           'email',
    #           'date'
    # ]

    # committer =['name',
    #           'email',
    #           'date'
    # ]

    # tree =['sha',
    #        'url'
    # ]

    # verification =['verified',
    #                 'reason',
    #                 'signature',
    #                 'payload'
    # ]

    # field_names =[author,
    #              committer,
    #              'message',
    #              tree,
    #              'url',
    #              'comment_count',
    #              verification
    # ]

    # output_file = open('commit.csv',"w")
    # output = csv.DictWriter(output_file,
    #             fieldnames=field_names,
    #             restval=None,
    #             extrasaction='ignore',
    #             delimiter='|',
    #             quoting=csv.QUOTE_ALL,
    #             quotechar='"',
    #             doublequote=True,  
    #             lineterminator='\n')    
    
    # for row in data:
    #     output.writerow(row)
   
   
 #https://api.github.com/repos/torvalds/Linux/commits
    



if __name__ == '__main__':
    main()
     

