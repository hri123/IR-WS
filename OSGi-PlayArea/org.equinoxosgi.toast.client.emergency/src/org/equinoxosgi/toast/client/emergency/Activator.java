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
package org.equinoxosgi.toast.client.emergency;

import org.equinoxosgi.toast.dev.airbag.Airbag;
import org.equinoxosgi.toast.dev.gps.Gps;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

public class Activator implements BundleActivator {
	private Airbag airbag;
	private Gps gps;
	private EmergencyMonitor monitor;

	public void start(BundleContext context) throws Exception {
		System.out.println("Launching");
		gps = new Gps();
		airbag = new Airbag();
		monitor = new EmergencyMonitor();
		monitor.setGps(gps);
		monitor.setAirbag(airbag);
		monitor.startup();
		airbag.deploy();
	}

	public void stop(BundleContext context) throws Exception {
		monitor.shutdown();
		System.out.println("Terminating");
	}
}
