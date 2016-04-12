// TODO: THIS FILE YET TO BE PORTED

// <li><a href="/auth/dropbox"><span class="glyphicon glyphicon-log-in"></span> Login via DropBox</a></li>


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

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});
