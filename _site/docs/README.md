# TechNet v2

## Moving a community of passionate people to a better place.

This project is an experiment in moving the content and functionality of the world's greatest collaboration platform to a better host.

This is a copy of articles tagged as **[User Page](https://social.technet.microsoft.com/wiki/contents/articles/tags/User+Page/default.aspx)** or **[PEJL](https://social.technet.microsoft.com/wiki/contents/articles/tags/PEJL/default.aspx)** on [Microsoft TechNet Wiki](https://social.technet.microsoft.com/wiki).

These have been imported and index pages were generated below: 
 * [User Pages](https://technet2.github.io/Wiki/articles/UserPages.html)
 * [PEJL Tagged](https://technet2.github.io/Wiki/articles/PageIndex1.html)

Behind this repo is an Azure Function sentinel, which periodically polls the repo.

After every poll, the sentinel writes it's status to [this file](https://github.com/technet2/Sentinel/blob/master/logs/WikiSentinelStatus.json).

If there are polling errors, they are written to a file within the date structure from [this logs folder](https://github.com/technet2/Sentinel/tree/master/logs).

## GitHub Pages

If you are looking at the 'raw' repository file view of this markdown file, the pages are designed to be viewed below:
https://technet2.github.io/Wiki

To honour the original HTML and CSS from TechNet Wiki, the pages have been pulled without any changes to the article body. 
A wrapper is placed around the article to reconstruct the original TechNet Wiki branding. 
Most of the links will take you back to TechNet Wiki, except:
* Breadcrumb "Wiki" link - Goes to the root of the docs folder of this project
* Breadcrumb "TechNet Articles" link - Goes to an Index page (soon to change)
* Breadcrumb article title - Goes to the file in this project, where you can edit the GitHub version
* Country/language (top left) - Hard coded joke (to be replaced)
* Links which refer to an anchor within an article - Point to the same article, not the TechNet version


## Function Labels

This service uses "Labels" to act on user commands.


### THIS IS MINE (live only for members)

Use this label to identify one of your articles, so that the service can check for your Ownership Proof. 
All it currently does is create a look-up file [here](https://github.com/technet2/Wiki/tree/master/authors)
 * Your GitHub login name must be in double quotes, in your TechNet Wiki Profile. In the biography section.
 * Create an issue, add the THIS IS MINE label and paste a url to one of the GitHub articles.
 * You must be the owner of the article
 
 
## How to become a member

"Labels" are only visible to members and contributors. Therefore, the phrase "THIS IS MINE" can now be added to the **title** of an issue, with the GitHub file reference still in the issue **description field**. This will authenticate the GitHub user against their TechNet profile as above, but also add the user as a member of the organisation and team. If you try this, you will receive an email from GitHub with the invitation to join. You will then have full member access to update documents, just like on TechNet Wiki.


### Who can join now

To become a member in this initial trial (and contribute directly) you must have an article imported [here](https://github.com/technet2/Wiki/tree/master/docs/articles), for you to claim the ownership of. All the "user pages" from TechNet WIki have now been imported. If you see your article above, you can join right now.

1. Add your GitHub name (WITH QUOTES) to your TechNet profile, in the bio section. 
2. Create a new ticket [here](https://github.com/technet2/Wiki/issues), with "THIS IS MINE" in the title. 
3. Put the URL of your article, from the list [here](https://github.com/technet2/Wiki/tree/master/docs/articles) into the **description** field. 


## Gists

To more easily contribute content to this Wiki, there is a demo feature of embedded Gists. Gists are loose file content which you can post to GitHub, using [this form](https://gist.github.com/). There will be a label system similar to above, for linking your gists into the library. Your gist is then wrapped within the template used on the site. An proof of concept of this is [shown here](https://technet2.github.io/Wiki/articles/GistFile.html). 


## Collaborate

If you see any bugs, broken links or improvements, please add an issue to this repository. There are a selection of labels to choose from.

If you would like to be a collaborator, please get in touch, or raise an issue.

[Index](https://github.com/technet2/Wiki/tree/master/docs/index) and [look up](https://github.com/technet2/Wiki/tree/master/docs/info) files are generated in various folders. Why not contribute a tool which uses this data, to generate other cross-reference or statistics files.


## Indexes

Below are some of the pages being generated and tested.
Many of these are still 'work in progress'.
 
* [68 Articles tagged with User Page](https://technet2.github.io/Wiki/articles/UserPages.html)
* [130 Articles tagged with PEJL](https://technet2.github.io/Wiki/articles/PageIndex1.html)
* [Key Phrases Index](https://technet2.github.io/Wiki/articles/KeyPhrasesIndex.html) - Using [Azure Text Analytics](https://azure.microsoft.com/en-gb/services/cognitive-services/text-analytics/)
* [Key Phrases Tally](https://technet2.github.io/Wiki/articles/KeyPhrasesTally.html) - Using [Azure Text Analytics](https://azure.microsoft.com/en-gb/services/cognitive-services/text-analytics/)
* [Gist file example](https://technet2.github.io/Wiki/articles/GistFile.html)


## Roadmap

1. Auto-create collaborators from ownership profile matches.
2. Finish the IMPORT THIS function
3. Poll TechNet and import articles, when revised on TechNet
