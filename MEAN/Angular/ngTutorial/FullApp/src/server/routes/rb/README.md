What does this application cover
--------------------------------

- Angular ngTutorial as base of the application for front end
- mobile angular ui & bootstrap for css and style
- node express backend
- dropbox (and local file system) for storing the json files
- Ionic for mobile app

Run
---

gulp
or
node ./app/js/server/main.js local
or
node ./app/js/server/main.js - for dropbox
or
npm start


Install Dependencies
--------------------

npm install
add the path where git.exe (installed by GitHub) to environment path var
create & update ./app/js/server/oauth.js

Debug
-----

http://stackoverflow.com/questions/1911015/how-to-debug-node-js-applications
node-debug main.js


Table of Contents
-----------------

- [Start-Here](#start-here)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [References](#references)
- [TODO](#todo)
- [Journal](#journal)
- [Sample-Article-Structure](#sample-article-structure)
- [Cloud-Hosting](#cloud-hosting)
- [Database-Design](README_files/database_design.md)

Start-Here
----------

- **_Usage: See the section Usage in main.js_**

- http://localhost:3000/#/index/-1
- http://localhost:3000/#/article/2
- http://localhost:3000/#/metadata

Testing
----------

- npm test

Dependencies
------------

| Package | Description |
| ------------------------------- |:-------------:|
| https://docs.angularjs.org/tutorial | core ui framework, the tutorial has beautiful explanation |
| http://mobileangularui.com/ | look and feel |
| http://passportjs.org/ | authentication for node |
| Jasmine, Karma, Protractor | testing |
| node-inspector, nodemon | running node in debug mode, watch for changes and restart automatically, respectively |
| socket.io | websockets for keeping an open connection to load the articles |

References
----------

- https://github.com/sahat/hackathon-starter
- http://www.bootply.com/new

TODO
----

- Filters have performance issues, fix it: 
  - https://toddmotto.com/use-controller-filters-to-prevent-digest-performance-issues/
  - http://www.bennadel.com/blog/2487-filter-vs-nghide-with-ngrepeat-in-angularjs.htm

- Retag / spruce tags of articles, sections and sub-section as per - Kaizen/OnePicture1000Words/Emotions-EQ.jpg, make sure all (sub)sections are tagged

- the search on the articles list page, make it a drop down with 25 frequently used samples that can be quickly selected

- @tags search is not listed at all under Search All

- Instant search bar at the top of articles list - link it to Input Search or have its own logic. The search phrase can be like "key: (value1 OR value2)" or "key:(value1 AND value2)" or "key1(value) AND key2(value)".<br/>e.g.: content:section:main(brave AND PTW)

- delete oauth.js from github

- Structure the app like Hardeep's mobile services code, one part for serverside base, one part for client side base, each with its own testing, and any application over it to make these two as dependencies, this way, hackaton projects will be easy to code
- Article list page should look like this - http://www.flipkart.com/all-categories/pr?sid=search.flipkart.com&filterNone=true
- instant search should be the core value add with this application (like Verse mail client from IBM)
- protractor testing pending
- use 'requirejs' instead of <script src="js/utils.js"></script>
- restructure app - launch page - login, once login, landing page - choose Project Areas (like in 'things for ios' app - Artistic, Attitude, Career, Education, Family, Financial, Physical, Pleasure, Public-Service), once category, create projects - RB, Tech, etc, under suitable category, open the Single page app with navigation on left and search that slides down from top, add a bread crumb for the chosen search criteria like in myntra; 3 * 3 matrix for the selection of project area (like in the http://www.ellucian.com/ home page, followed by some nice interface to select the projects.
- PouchDB / Cloudant storageClient - like stuff for offline storage
- Use http://quilljs.com/ for text editing of sections
- Check the video in (https://www.ibm.com/developerworks/community/blogs/36db6433-2f12-4533-9c68-489067780bfd?lang=en -> ftp://public.dhe.ibm.com/software/ecm/content-analytics/tac/V005-WEX_CA_AlchemyConceptDiscoveryDemo.mp4) if the text analytics can be applied to articles of rb

DEFECTS
-------

- The article is saved in a json file inside a directory - if tags are present, the directory name is the first tag name, if tags are not present, the directory name is 'unknown'. In case this article's tags are updated, a new article is created and saved in the new folder, but the previous article does not get deleted. Workaround - delete it from the dropbox console or explorer for now.

Journal
-------

- Verified manually all the RB files using the /exportForVerification call which internally calls the getStructure method and made sure everything is exported fine
- 160202 - using migrate.js and reverse-migrate.js and spending one whole day doing a manual comparison between the original xml and the xml generated back from the reverse-migrate, made sure every article, section, sub-section, tags are exported correctly. Today, I certify that the migrate tool can be used with complete confidence. (Note: text inside CDATA does not get converted properly, this issue is very low priority, can be ignored)

Sample-Article-Structure
------------------------

```xml
<article>
  <tags>sample-article-tag1, sample-article-tag2</tags> -- article.tags
  <rating>sample-article-rating</rating> -- article.rating
  <summary>sample-article-summary</summary> -- article.summary
  <from>sample-article-from</from> -- article.from
  <content>
    sample-article-content-main -- article.content.main
    <section name="sample-section-name"> -- article.content.section[0].name
      sample-section-main -- article.content.section[0].main
      <sub-section name="sample-sub-section-name"> -- article.content.section[0].sub-section[0].name
        sample-sub-section-main -- article.content.section[0].sub-section[0].main
      </sub-section>
      <sub-section name="sample-sub-section-name-2">
        sample-sub-section-main
      </sub-section>
    </section>
    <section name="sample-section-name-2">
      sample-section-main
    </section>
  </content>
  <annotation>
    sample-article-annotation-main -- article.annotation.main
    <section name="sample-section-name"> -- article.annotation.section[0].name
      sample-section-main
      <sub-section name="sample-sub-section-name">
        sample-sub-section-main
      </sub-section>
    </section>
  </annotation>
</article>
```

Cloud-Hosting
-------------

cf is not able to ignore node_modules/ directory even if it is present in the .cfignore file causing issues while pushing to bluemix. Workaround is to temporarily move the bower_components, node_modules, RB-files, test to a different directory, issue the cf push and move it back after the successful push.

- cf api https://api.ng.bluemix.net
- cf login -u hrishikesh.kumar@in.ibm.com
- cf target -o hrishikesh.kumar@in.ibm.com -s dev
- cf push ng-rb (C:\H\C\GitHub\IR-WS\MEAN\Angular\ngTutorial\ng-rb>cf push ng-rb - note, you push from inside ng-rb directory)
