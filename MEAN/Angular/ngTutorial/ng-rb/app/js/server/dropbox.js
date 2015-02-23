var dropbox_apis = {

    projectAreas: ["artistic", "attitude", "career", "education", "family", "financial", "physical", "pleasure", "service"],

    // function is to make sure the default folders are present even if the user has deleted them
    resetProjectAreas: function(client, projectAreas) {
        client.readdir("/", function(error, entries) {
            if (error) {
                console.log("error in function - resetProjectAreas, during call to client.readdir: " + error); // Something went wrong.
            }

            for (i = 0; i < projectAreas.length; i++) {
                if (entries.indexOf(projectAreas[i]) < 0) { // directory not found for project area
                    client.mkdir("/" + projectAreas[i],
                        function(error) {
                        	if (error != null) {
                            	console.log("error in function - resetProjectAreas, during call to client.mkdir: " + error);                         		
                        	}
                        });
                }
            }
        });
    }
}

module.exports = dropbox_apis
