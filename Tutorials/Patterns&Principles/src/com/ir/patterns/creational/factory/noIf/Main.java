package com.ir.patterns.creational.factory.noIf;

public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		Registry registry= new Registry();
		
		String[] instancesRequired= {"artifactA", "artifactB"};

		for (String instanceId: instancesRequired) {
			
			ArtifactCreator artifactCreator= registry.creatorMap.get(instanceId);
			
			Artifact artifact= artifactCreator.create();
			
		}

	}

}
