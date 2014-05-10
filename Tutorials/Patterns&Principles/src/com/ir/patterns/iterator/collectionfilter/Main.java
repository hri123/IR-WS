package com.ir.patterns.iterator.collectionfilter;

import java.util.ArrayList;

public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Filter filter= new FilterA();
		
		ArrayList<Artifact> collection= new ArrayList<Artifact>();
		
		for (int i = 0; i < 10; i++) {
			Artifact temp= new ArtifactA(i);
			collection.add(temp);
		}
		
		CollectionFilter cf= new CollectionFilter(collection, filter);
		while (cf.hasNext()) {
			ArtifactA artifact=  (ArtifactA) cf.next();
			System.out.println(artifact.i);
		}

	}

}
