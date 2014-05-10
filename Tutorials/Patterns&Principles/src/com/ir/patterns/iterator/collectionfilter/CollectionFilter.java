package com.ir.patterns.iterator.collectionfilter;

import java.util.Collection;
import java.util.Iterator;

public class CollectionFilter implements Iterator<Artifact> {
	
	Collection<Artifact> collection= null;
	Filter filter= null;
	Iterator<Artifact> iterator= null;
	Artifact next= null;
	
	public CollectionFilter(Collection<Artifact> collection, Filter filter) {
		this.collection= collection;
		this.filter= filter;	
		iterator= collection.iterator();
	}

	@Override
	public boolean hasNext() {
		if (null != next) return true;
		else {
			while (iterator.hasNext() && null == next) {
				Artifact temp= iterator.next();
				if (filter.filterThis(temp) == false) {
					next= temp;
				}
			}
			if (null != next) return true;
			else return false;
		}
	}

	@Override
	public Artifact next() {
		Artifact temp= hasNext() ? next : null;
		next= null;
		return temp;
	}

	@Override
	public void remove() {
		// do nothing
	}

}
