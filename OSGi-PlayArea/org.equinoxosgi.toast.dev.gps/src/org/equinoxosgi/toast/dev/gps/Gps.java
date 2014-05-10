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
package org.equinoxosgi.toast.dev.gps;

public class Gps {
	public int getHeading() {
		return 90; // 90 degrees (east)
	}

	public int getLatitude() {
		return 3776999; // 37.76999 N
	}

	public int getLongitude() {
		return -12244694; // 122.44694 W
	}

	public int getSpeed() {
		return 50; // 50 kph
	}
}
