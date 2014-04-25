package com.hhh.ir.infra.core.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.Servlet;

import org.eclipse.equinox.jsp.jasper.JspServlet;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.framework.Filter;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceRegistration;
import org.osgi.service.http.HttpContext;
import org.osgi.service.http.HttpService;
import org.osgi.util.tracker.ServiceTracker;

import com.hhh.ir.infra.web.Activator;
import com.hhh.ir.infra.core.services.DefaultBundleContextAwareBean;
import com.hhh.ir.infra.core.services.HTTPContextRegistry;
import com.hhh.ir.infra.core.services.IServicesStatusProvider;
import com.hhh.ir.infra.core.services.OSGiDispatcherServlet;

public class HTTPContextRegistry extends DefaultBundleContextAwareBean
		implements IServicesStatusProvider {
	/**
	 * this bean is used to register your spring-loaded 'WebContent' directory,
	 * resources, the mappings for your 'jsp' pages (to ensure compilation)
	 * etc.. this is in lieu of using these: <extension
	 * point="org.eclipse.equinox.http.registry.servlets"> & <extension
	 * point="org.eclipse.equinox.http.registry.resources"> esp. since we need
	 * to make sure that Spring processes these using the Bundle Class loader
	 * instead.
	 */

	private static ConcurrentHashMap<String, ServiceTracker> trackerMap = new ConcurrentHashMap<String, ServiceTracker>();

	protected String webRoot = "/";

	protected String alias = "/test";

	protected String contextConfigFile = "WEB-INF/defaultConfig.xml";

	protected String dispatcherID = null;

	protected String controllerAliasPattern = "/*";

	protected ServiceStatus currentStatus = ServiceStatus.DOWN;
	protected String currentStatusMsg = "";
	protected boolean statusSet = false;

	public HTTPContextRegistry() {
		super();
	}

	public String getWebRoot() {
		return webRoot;
	}

	public void setWebRoot(String rootContextPath) {
		this.webRoot = rootContextPath;
	}

	public String getContextConfigFile() {
		return contextConfigFile;
	}

	public void setContextConfigFile(String contextConfigFile) {
		this.contextConfigFile = contextConfigFile;
	}

	public String getDispatcherID() {
		return dispatcherID;
	}

	public void setDispatcherID(String dispatcherID) {
		this.dispatcherID = dispatcherID;
	}

	public static String getFilterString(String serviceInterface,
			Map<String, String> propertyValueMatch) {
		String listenerFilter = "(" + Constants.OBJECTCLASS + "=" + serviceInterface + ")"; //$NON-NLS-1$
		boolean addAmpersand = false;
		if (null != propertyValueMatch) {
			addAmpersand = true;
			for (Iterator propValMatchKeyIterator = propertyValueMatch.keySet()
					.iterator(); propValMatchKeyIterator.hasNext();) {
				String currEntryKey = (String) propValMatchKeyIterator.next();
				String currEntryFilter = "(" + currEntryKey + "="
						+ propertyValueMatch.get(currEntryKey) + ")";
				listenerFilter = listenerFilter + currEntryFilter;
			}
		}
		if (addAmpersand) {
			listenerFilter = "(&" + listenerFilter + ")";
		}
		return listenerFilter;
	}

	public static ServiceTracker createTracker(
			BundleContext requestorBundleContext, String serviceInterface,
			Map<String, String> propertyValueMatch) {
		BundleContext bc = requestorBundleContext;
		boolean reuseTrackers = true;
		if (null == bc) {
			bc = Activator.getContext();
		} else if (bc != Activator.getContext()) {
			reuseTrackers = false; // we cannot reuse the tracker - since the
									// bundle context is relevant
		}

		ServiceTracker tracker = null;
		String listenerFilter = getFilterString(serviceInterface,
				propertyValueMatch);
		Filter filter = createFilter(listenerFilter);
		if (reuseTrackers) {
			// Check if we already have the tracker available
			tracker = (ServiceTracker) trackerMap.get(listenerFilter);
		}

		if (null == tracker) { // only then create a new one - saves on memory
								// use - since this method's flow does not make
								// it convenient to release trackers once the
								// services are
								// no longer needed. But services are usually
								// needed till end of time..
			tracker = new ServiceTracker(bc, filter, null);
			tracker.open();
			if (reuseTrackers) {
				trackerMap.put(listenerFilter, tracker);
			}
		}

		return tracker;
	}

	public static Filter createFilter(String serviceInterface,
			Map<String, String> propertyValueMatch) {

		String listenerFilter = getFilterString(serviceInterface,
				propertyValueMatch);
		return createFilter(listenerFilter);
	}

	public static Filter createFilter(String listenerFilter) {
		Filter filter = null;
		try {
			filter = FrameworkUtil.createFilter(listenerFilter);
		} catch (Exception e) {
			// TODO: log(LogService.LOG_ERROR, e.getMessage());
			throw new IllegalArgumentException(e);
		}
		return filter;
	}

	public static Object waitAndGetService(
			BundleContext requestorBundleContext, String serviceInterface,
			Map<String, String> propertyValueMatch, long timeOut) {
		ServiceTracker tracker = createTracker(requestorBundleContext,
				serviceInterface, propertyValueMatch);
		try {
			tracker.waitForService(timeOut);
		} catch (InterruptedException e) {
		}
		Object ser = null;
		ser = tracker.getService();
		return ser;
	}

	public static HttpService getHTTPService(BundleContext bc) {
		return (HttpService) waitAndGetService(bc, HttpService.class.getName(),
				null, 0);
	}

	public String getControllerAliasPattern() {
		return controllerAliasPattern;
	}

	public void setControllerAliasPattern(String controllerAliasPattern) {
		this.controllerAliasPattern = controllerAliasPattern;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	protected OSGiDispatcherServlet dispatcherServlet = null;

	public OSGiDispatcherServlet getDispatcherServlet() {
		return dispatcherServlet;
	}

	public void setDispatcherServlet(OSGiDispatcherServlet dispatcherServlet) {
		this.dispatcherServlet = dispatcherServlet;
	}

	public static final String SERVICE_REG_KEY = "OSGiServicesUtil_registerService_key";
	protected static ConcurrentHashMap<String, ServiceRegistration> serviceRegistrationMap = new ConcurrentHashMap<String, ServiceRegistration>();

	public static ServiceRegistration registerService(BundleContext bc,
			Object serviceInstance, Class serviceInterface,
			Hashtable serviceProperties, String registrationKey) {
		ServiceRegistration reg = null;
		String regMapKey = null;
		if (null != registrationKey) {
			Map regServMap = new HashMap();
			regServMap.put(SERVICE_REG_KEY, registrationKey);
			regMapKey = getFilterString(serviceInterface.getName(), regServMap);
			reg = serviceRegistrationMap.get(regMapKey);

			if (reg != null) {
				// already registered - this is most likely a design issue...
				// log it
				// TODO: logWarning("Re-registering: " + regMapKey);
			}
		}

		if (null == bc) {
			bc = Activator.getContext();
		}

		reg = bc.registerService(serviceInterface.getName(), serviceInstance,
				serviceProperties);

		if (registrationKey != null) {
			serviceRegistrationMap.put(regMapKey, reg);
		}

		return reg;
	}

	/**
	 * usually called by Spring after this bean has been instantiated
	 */
	public void init() {
		/**
		 * here we would add the resource path, and create a default dispatcher
		 * servlet etc..
		 */
		if (null == dispatcherID) {
			setDispatcherID(getWebRoot());
		}
		if (!statusSet) {
			registerService(getBundleContext(), this,
					IServicesStatusProvider.class, null, null);
			statusSet = true;
		}

		dispatcherServlet = new OSGiDispatcherServlet();
		dispatcherServlet.setDefaultBundleContext(getBundleContext());
		dispatcherServlet.setApplicationContext(getApplicationContext());
		dispatcherServlet.setContextConfigLocation(getWebRoot() + "/"
				+ getContextConfigFile());

		try {
			InitAliasThread initThread = new InitAliasThread();
			initThread.context = this;
			initThread.setName(HTTPContextRegistry.class.getName() + "_"
					+ getAlias());
			initThread.setDaemon(true);
			initThread.start();
		} catch (Exception e) {
			System.out.println("HTTPContextRegistry failed to start: "
					+ getAlias());
			e.printStackTrace();
		}

	}

	protected static class InitAliasThread extends Thread {
		HTTPContextRegistry context = null;

		@Override
		public void run() {
			boolean failed = false;
			Throwable throwBack = null;
			try {
				HttpService httpService = getHTTPService(context
						.getBundleContext());

				HttpContext commonContext = httpService
						.createDefaultHttpContext();
				Dictionary<String, String> initparams = new Hashtable<String, String>();
				initparams.put("load-on-startup", "1");
				initparams.put("servlet-name", context.dispatcherID);

				Servlet jspServlet = new JspServlet(context.getBundleContext()
						.getBundle(), context.getWebRoot(), context.getAlias());
				Dictionary<String, String> jspInitParams = new Hashtable<String, String>();
				jspInitParams = new Hashtable<String, String>();
				jspInitParams.put("load-on-startup", "1");
				jspInitParams.put("servlet-name", context.getWebRoot()
						+ "_jspServlet");

				httpService.registerResources(context.getAlias(),
						context.getWebRoot(), commonContext);

				httpService.registerServlet(
						context.getControllerAliasPattern(),
						context.dispatcherServlet, initparams, commonContext);

				httpService.registerServlet(context.getAlias() + "/*.jsp",
						jspServlet, jspInitParams, commonContext);
			} catch (Throwable e) {
				throwBack = e;
				failed = true;
			}
			if (failed) {
				throwBack.printStackTrace();
				context.currentStatus = ServiceStatus.DOWN;
				context.currentStatusMsg = throwBack.toString();
			} else {
				context.currentStatus = ServiceStatus.UP;
				context.currentStatusMsg = "";
				System.out.println("HTTPContextRegistry started: "
						+ context.getAlias());
			}
		}
	}

	public void stop() {
		HttpService httpService = getHTTPService(getBundleContext());
		httpService.unregister(getAlias());
		httpService.unregister(getControllerAliasPattern());
		httpService.unregister(getAlias() + "/*.jsp");
		currentStatus = ServiceStatus.DOWN;
		currentStatusMsg = "";
	}

	public void start() {
		init();
	}

	public Collection<ServiceInfo> getServicesStatus() {
		ArrayList<ServiceInfo> servicesInfo = new ArrayList<ServiceInfo>(1);
		ServiceInfo currentServiceInfo = new ServiceInfo();
		currentServiceInfo.id = getAlias();
		currentServiceInfo.parentBundleName = getBundleContext().getBundle()
				.getSymbolicName();
		currentServiceInfo.message = currentStatusMsg;
		servicesInfo.add(currentServiceInfo);
		return servicesInfo;
	}

}
