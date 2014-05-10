package com.ir.patterns.creational.factory.noIf;

import java.util.HashMap;

public class Registry {
	
	public HashMap<String, ArtifactCreator> creatorMap= new HashMap<String, ArtifactCreator>();
	
	public Registry() {
		
		// creatorMap must be replaced by the eclipse registry in the real world and 
		// each of the creator must register themselves in the registry using plugin.xml
		// doing the below for simplification purposes only
		creatorMap.put("artifactA", new ArtifactCreatorForArtifactA());
		creatorMap.put("artifactB", new ArtifactCreatorForArtifactB());
		
	}

}
