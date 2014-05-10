package com.ir.patterns.iterator.collectionfilter;

public interface Filter {
	
	// return true if this object should not be filtered
	public boolean filterThis(Artifact artifact);

}
