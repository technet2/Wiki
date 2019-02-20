# TechNet v2

Moving a community of passionate people to a better place.

This project is an experiment in moving the content and functionality of the world's greatest collaboration platform to a better host.

This is a copy of my own articles [tagged with PEJL](https://social.technet.microsoft.com/wiki/contents/articles/tags/PEJL/default.aspx) on TechNet Wiki.

Behind this repo is an Azure Function sentinel, which periodically polls the repo.

After every poll, the sentinel writes it's status to [this file](/Wiki/blob/master/logs/WikiSentinelStatus.json).

**Function Labels**

This service uses "Labels" to act on user commands.

The Labels are:

1. THIS IS MINE (live)
Use this label to identify one of your articles, so that the service can check for your Ownership Proof. 
All it currently does is create a look-up file [here](https://github.com/technet2/Wiki/tree/master/authors)
* Your GitHub login name must be in double quotes, in your TechNet Wiki Profile. In the biography section.
* Create an issue, add the THIS IS MINE label and paste a url to one of the GitHub articles.
* You must be the owner of the article

2. IMPORT THIS (not live)
Use this label to add a TechNet Wiki article to this service. When the service next polls for issues with this label, it will pull the articles in. You can list up to 10 articles in one request.


**Roadmap**

1. Auto-create collaborators from ownership profile matches.
2. Finish the IMPORT THIS function
3. Poll TechNet and import articles, when revised on TechNet

**Collaborate**

If you see any bugs, broken links or improvements, please add an issue to this repository. There are a selection of labels to choose from.

If you would like to be a collaborator, please get in touch, or raise an issue.

Index and loopup files are generated in various folders. Why not contribute a tool which uses this data, to generate other cross-reference or statistics files.