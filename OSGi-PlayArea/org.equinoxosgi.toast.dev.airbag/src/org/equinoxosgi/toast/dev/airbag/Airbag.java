/*******************************************************************************
 * Copyright (c) 2009 Paul VanderLei, Simon Archer, Jeff McAffer and others. All
 * rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0 which
 * accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Toast is an Equinox/OSGi system developed for the book Eclipse, Equinox and
 * OSGi - Creating Highly Modular Java Applications See http://equinoxosgi.org
 * 
 * Contributors: Paul VanderLei, Simon Archer and Jeff McAffer - initial API and
 * implementation
 *******************************************************************************/
package org.equinoxosgi.toast.dev.airbag;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Airbag {
	private List listeners;

	public Airbag() {
		super();
		listeners = new ArrayList();
	}

	public synchronized void addListener(IAirbagListener listener) {
		listeners.add(listener);
	}

	public synchronized void deploy() {
		for (Iterator i = listeners.iterator(); i.hasNext();)
			((IAirbagListener) i.next()).deployed();
	}

	public synchronized void removeListener(IAirbagListener listener) {
		listeners.remove(listener);
	}
}
