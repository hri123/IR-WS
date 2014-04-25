package spring3hibernateosgi;

import java.util.Dictionary;
import java.util.Hashtable;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;
import org.springframework.web.servlet.DispatcherServlet;

public class Activator implements BundleActivator {

	private static BundleContext context;

	static BundleContext getContext() {
		return context;
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
// http://thomaskratz.blogspot.in/2012/03/osgi-spring-dispatcherservlet.html	
	public void start(BundleContext bundleContext) throws Exception {
		
//		Log logger = LogFactory.getLog(Activator.class);
//		logger.debug("inside start");
		Activator.context = bundleContext;
		
		// http://knowledgeunit.blogspot.in/2012/12/start-level-in-osgi.html
		// if the next line is returning null, change the start level of this plugin to 5 and the start level of osgi.services to 1
		ServiceReference ref = context.getServiceReference(HttpService.class.getName());
//		ServiceReference ref= (ServiceReference) OSGiServicesUtil.waitAndGetService(HttpService.class,10000);
		HttpService service = (HttpService) context.getService(ref);
		  
		DispatcherServlet servlet = new DispatcherServlet();
//		servlet.setNamespace("spring-servlet");
		  
		Dictionary<String, String> initparam = new Hashtable<String, String>();
		initparam.put("contextConfigLocation", "/WebContent/WEB-INF/spring-servlet.xml");
		initparam.put("contextClass", "spring3hibernateosgi.BAC");

		ClassLoader loader = Thread.currentThread().getContextClassLoader();
		Thread.currentThread().setContextClassLoader(this.getClass().getClassLoader());
		
		// this is to register the controller
		service.registerServlet("/Spring3HibernateOSGi",  servlet, initparam, null);
		
		// provide alias to the WebContent folder
		service.registerResources("/Spring3HibernateOSGiWebContent", "/WebContent", service.createDefaultHttpContext());
		
		Thread.currentThread().setContextClassLoader(loader);
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
	}

}
