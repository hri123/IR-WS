(function() {

    var Dropbox = require("dropbox");
    var fs = require('fs');

    StorageFactory = (function() {
        function StorageFactory() {
            throw new Error("Not implemented. Used only for module.exports.");
        }

        return StorageFactory;

    })();

    StorageFactory.getStorageClient = (function() {

        function getStorageClient(clientName) {

            if (this.constructor == getStorageClient)
                throw new Error("Do not use this method as a constructor.");

            if (clientName && clientName == 'Dropbox') {

                return Dropbox.Client;

            } else if (clientName && clientName == 'LocalFileSystem') {

                return StorageFactory.LocalFileSystemClient;

            } else {

                // default
                return Dropbox.Client;

            }


        }

        return getStorageClient;

    })();

    StorageFactory.LocalFileSystemClient = (function() {

        function LocalFileSystemClient() {

        }

        LocalFileSystemClient.prototype.readdir = function(path, callback) {

            return fs.readdir(path, callback);

        }

        LocalFileSystemClient.prototype.mkdir = function(path, callback) {

            return fs.mkdir(path, callback);

        }

        LocalFileSystemClient.prototype.readFile = function(path, callback) {

            return fs.readFile(path, callback);

        }

        LocalFileSystemClient.prototype.writeFile = function(path, data, options, callback) {

        	var dirName = require('path').dirname(path);

            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName);
            }

            // return fs.writeFile(path, data, options, callback); // throwing - Error: ENOENT, open 'H:\H\GitHub\IR-WS\MEAN\Angular\ngT...
            return fs.writeFileSync(path, data, options);

        }

        LocalFileSystemClient.prototype.isAuthenticated = function() {

            return true;

        }


        return LocalFileSystemClient;

    })();

    module.exports = StorageFactory;

}).call(this);
