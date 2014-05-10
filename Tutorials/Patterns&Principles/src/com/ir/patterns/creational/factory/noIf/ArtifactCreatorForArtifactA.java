package com.ir.patterns.creational.factory.noIf;

public class ArtifactCreatorForArtifactA implements ArtifactCreator {

	@Override
	public Artifact create() {
		System.out.println("creating a new instance of artifact A");
		return new ArtifactA();
	}

}
