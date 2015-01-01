var getStructure = function(data) {

	var returnVal = {};

	if(typeof data =='object') {
		returnVal.main = data._;
		if(data.section) {
			var sections = [];

			var sectionsLength = data.section.length;
			for (var j = 0; j < sectionsLength; j++) {

				var currentSection = data.section[j];
				
				var section = {};

				if (typeof currentSection == 'object') {
					section.main = currentSection._;
				} else {
					section.main = currentSection;
				}

				if (currentSection.$) {
					section.name = currentSection.$.name;
				}

				if (currentSection.tags) {
					section.tags = currentSection.tags[0];
				}

				if (currentSection['sub-section']) { // hyphen is interpreted as minus in javascript, so cannot use currentSection.sub-section
					var temp_sub_sections = [];

					var sub_sectionsLength = currentSection['sub-section'].length;

					for (var k = 0; k < sub_sectionsLength; k++) {

						var currentSubSection = currentSection['sub-section'][k];
						
						var sub_section = {};

						if (typeof currentSubSection == 'object') {
							sub_section.main = currentSubSection._;
						} else {
							sub_section.main = currentSubSection;
						}

						if (currentSubSection.$) {
							sub_section.name = currentSubSection.$.name;
						}

						if (currentSubSection.tags) {
							sub_section.tags = currentSubSection.tags[0];
						}

						temp_sub_sections.push(sub_section);
					}

					section.sub_section = temp_sub_sections;

				}

				sections.push(section);
			}

			returnVal.section = sections;

		}
	} else {
		returnVal.main = data;
	}

	return returnVal;

};

try {
    module.exports.getStructure = getStructure;
}
catch(err) {
    console.log('this file is shared between angular and node.')
}
