import requests;
import json;


base_url= 'https://api.github.com'


def get_data(username,repo):
    commit_history = get_commit(username,repo)


def get_commit(username,repo):
    url = '{}/repos/{}/{}/commits'.format(base_url,username,repo)
    r = requests.get(url)
    json_data = r.json()
    json_parsed = json.loads(json_data)
    print(json_parsed)




# def get_Request(username,repo,sha):
#     first_commit = get_commit(username,repo)
    
#     # compare_url = '{}/repos/{}/{}/compare/{}...{}'.format(base_url,id,repo,first_commit,sha)

#     # commit_req = requests.get(base_url)
#     # commit_count = commit_req.json()['total_commits'] + 1
#     # print(commit_count)
#     # return commit_count


# def get_commit(username,repo):
    

#     # if r.headers.get('Link'):
#     #     page_url = req.headers.get('Link').split(',')[1].split(';')[0].split('<')[1].split('>')[0]
#     #     req_last_commit = requests.get(page_url)
#     #     first_commit = req_last_commit.json()
#     #     first_commit_hash = first_commit[-1]['sha']
#     # else:
#     #     first_commit_hash = json_data[-1]['sha']

#     # return first_commit_hash


def main():
    username = 'torvalds'
    repo = 'Linux'
   

    data = get_commit(username,repo)
    print(data)



if __name__ == '__main__':
    main()
     

