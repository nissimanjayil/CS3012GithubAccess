import requests;
import json;
import csv;

base_url= 'https://api.github.com'



#This function parses the commits from JSON data returned from the API request
def get_commit(username,repo):
    url = '{}/repos/{}/{}/commits'.format(base_url,username,repo)
    response = requests.get(url)
    print(response.status_code)
    if response.status_code == 200:
        print("Connection successful.Decoding JSON")
    json_data = response.json()
    json_commit = json_data[0]['commit']
   
    return json_commit
    
    
# url = base_url
# json_data = requests.get(url).json()
# json_commit = json_data[0]['commit']
# print(json_commit)
    

def main():
    username = 'torvalds'
    repo = 'Linux'
   
    data = get_commit(username,repo)
    print(data)
      
   
    # field_names =[array1,

    # ]

    # output_file = open('csv_file.csv',"w")
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
     

