Options:
--------

- Mongodb - jsonstore is good for filtering on the database itself instead of getting all the data on to the client and then filtering, but the problem is you lose the flexibility of saving the articles as flat files, saving on the dropbox.
Eventually when scaling becomes an issue, will move to Mongodb or cloudant.
- http://stackoverflow.com/questions/7233057/lightweight-javascript-db-for-use-in-node-js
(need to make sure if the files used by serverless databases can be in dropbox, which is doubtful.)
- dropbox datastore - https://www.dropbox.com/developers/datastore/sdks/js: relatively new, restriction on size, will lose the flexibility of having the articles in flat files. But this looks like the right solution for app development, where the data can be saved in offline mode, synced across ios and android devices. Will explore later.
- The solution that will be implemented for now is as follows:
Assumption: User has the onus to create appropriate projects under appropriate areas and make sure he keeps the project size very small, so that the use case of instant search is possible. Since the data is not too large for a project, the structure of flat files will be DROPBOX/App-Folder/Area/Project/sub-project/file.json
