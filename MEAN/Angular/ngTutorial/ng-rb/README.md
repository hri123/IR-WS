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

- Usage: See the section Usage in main.js

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

- Structure the app like Hardeep's mobile services code, one part for serverside base, one part for client side base, each with its own testing, and any application over it to make these two as dependencies, this way, hackaton projects will be easy to code
- delete article-details.html
- Article list page should look like this - http://www.flipkart.com/all-categories/pr?sid=search.flipkart.com&filterNone=true
- instant search should be the core value add with this application (like Verse mail client from IBM)
- protractor testing pending
- use 'requirejs' instead of <script src="js/utils.js"></script>
- restructure app - launch page - login, once login, landing page - choose Project Areas (like in 'things for ios' app - Artistic, Attitude, Career, Education, Family, Financial, Physical, Pleasure, Public-Service), once category, create projects - RB, Tech, etc, under suitable category, open the Single page app with navigation on left and search that slides down from top, add a bread crumb for the chosen search criteria like in myntra; 3 * 3 matrix for the selection of project area (like in the http://www.ellucian.com/ home page, followed by some nice interface to select the projects.
- PouchDB like stuff for offline storage

DEFECTS
-------

- The article is saved in a json file inside a directory - if tags are present, the directory name is the first tag name, if tags are not present, the directory name is 'unknown'. In case this article's tags are updated, a new article is created and saved in the new folder, but the previous article does not get deleted. Workaround - delete it from the dropbox console or explorer for now.

Journal
-------

- Verified manually all the RB files using the /exportForVerification call which internally calls the getStructure method and made sure everything is exported fine

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

cf is not able to ignore node_modules/ directory even if it is present in the .cfignore file causing issues while pushing to bluemix. Workaround is to temporarily move the node_modules to a different directory, issue the cf push and move it back after the successful push.

- cf api https://api.ng.bluemix.net
- cf login -u hrishikesh.kumar@in.ibm.com
- cf target -o hrishikesh.kumar@in.ibm.com -s dev
- cf push ng-rb
