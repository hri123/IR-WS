package spring3hibernateosgi;

import org.springframework.osgi.web.context.support.OsgiBundleXmlWebApplicationContext;

public class BAC extends OsgiBundleXmlWebApplicationContext {

	public BAC() {
		super();
		setBundleContext(Activator.getContext());

	}
	
}