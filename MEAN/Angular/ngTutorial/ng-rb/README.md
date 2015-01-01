Table of Contents
-----------------

- [Start-Here](#start-here)
- [Dependencies](#dependencies)
- [TODO](#todo)
- [Journal](#journal)

Start-Here
----------

- http://localhost:3000/#/index/-1
- http://localhost:3000/#/article/2
- http://localhost:3000/#/metadata

Dependencies
------------

| Package | Description |
| ------------------------------- |:-------------:|
| https://docs.angularjs.org/tutorial | core ui framework, the tutorial has beautiful explanation |
| http://mobileangularui.com/ | look and feel |

TODO
----

- testing pending
- Connect to dropbox from the back end passing userid / pwd of dropbox using OAuth and load the RB files from there
- Host it on bluemix with passport.js authentication
- need to restructure the @tags so that it becomes useful
- identify articles without tags, without summary
- use 'requirejs' instead of <script src="js/utils.js"></script>
- add tagCloud for the metadata html file
- restructure app - launch page - login, once login, landing page - choose categories (like in things app - RB, Tech, etc), once category, open the Single page app with navigation on left and search that slides down from top, add a bread crumb for the chosen search criteria

Journal
-------

- Verified manually all the RB files using the /exportForVerification call which internally calls the getStructure method and made sure everything is exported fine
