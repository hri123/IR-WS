package com.ir.sample4;

import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;

// referenced in component.xml
public class ServiceComponent implements EventHandler {

	public void handleEvent(Event event) {
		// TODO handle event - org/osgi/framework/BundleEvent/STARTED
		System.out.println(event.getTopic());
	}
	
}