package com.ir.patterns.iterator.collectionfilter;

public class FilterA implements Filter {

	@Override
	public boolean filterThis(Artifact artifact) {

		ArtifactA temp= (ArtifactA) artifact;
		return temp.i % 2 == 1;
	}

}
