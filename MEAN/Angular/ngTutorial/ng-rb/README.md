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

Start-Here
----------

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

References
----------

- https://github.com/sahat/hackathon-starter

TODO
----

- protractor testing pending
- Host it on bluemix / heroku
- use 'requirejs' instead of <script src="js/utils.js"></script>
- restructure app - launch page - login, once login, landing page - choose categories (like in 'things for ios' app - RB, Tech, etc), once category, open the Single page app with navigation on left and search that slides down from top, add a bread crumb for the chosen search criteria like in myntra

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

- cf api https://api.ng.bluemix.net
- cf login -u hrishikesh.kumar@in.ibm.com
- cf target -o hrishikesh.kumar@in.ibm.com -s dev
- cf push ng-rb
