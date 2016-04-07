// TODO: THIS FILE YET TO BE PORTED


app.configure(function() {
    app.set("view options", {
        layout: false
    });
    // app.use(express.logger()); // prints too much log
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: 'my_precious'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    app.use(express.static(path.resolve(config.paths.appDir)));
    // app.use('/', express.static(__dirname + '/bower_components/mobile-angular-ui')); // http://localhost:3000/demo/#/ will take you to the mobile angular ui demo on local
    app.use('/bower_components', express.static(path.resolve(config.paths.appDir + '../bower_components')));
});

app.get('/', ensureAuthenticated, function(req, res) {
    res.sendfile(path.resolve(config.paths.appDir + 'index.html')); // http://stackoverflow.com/a/14594282
});

app.get('/select', ensureAuthenticated, function(req, res) {
    res.sendfile(path.resolve(config.paths.appDir + 'select.html'));
});

app.get('/login', function(req, res) {
    res.sendfile(path.resolve(config.paths.appDir + 'login.html'));
});

app.get('/auth/dropbox',
    passport.authenticate('dropbox-oauth2'),
    function(req, res) {});

// Error : Invalid redirect_uri: "http://localhost:3000/auth/dropbox/callback" (https://ng-rb.mybluemix.net/auth/dropbox/callback).
// for OAuth2, the above URL needs to be registered with the app in dropbox app configuration page under OAuth2 - Redirect URIs

app.get('/auth/dropbox/callback',
    passport.authenticate('dropbox-oauth2', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/select');
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});
