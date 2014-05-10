package com.ir.patterns.creational.factory.noIf;

public class ArtifactCreatorForArtifactB implements ArtifactCreator {

	@Override
	public Artifact create() {
		System.out.println("creating a new instance of artifact B");
		return new ArtifactB();
	}

}
