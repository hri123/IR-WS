package com.hhh.ir.infra.core.services;

import org.osgi.framework.BundleContext;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.osgi.util.BundleDelegatingClassLoader;
import org.springframework.util.StringUtils;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class OSGiDispatcherServlet extends DispatcherServlet implements ApplicationListener
{
    
    /**
     * 
     */
    private static final long serialVersionUID = -123456768789090L;
    protected BundleContext defaultBundleContext = null;
    protected ApplicationContext defaultAppContext = null;
    
    public BundleContext getDefaultBundleContext()
    {
        return defaultBundleContext;
    }
    
    public void setDefaultBundleContext(BundleContext defaultBundleContext)
    {
        this.defaultBundleContext = defaultBundleContext;
    }
    public void setApplicationContext(ApplicationContext arg0) throws BeansException
    {
     
        defaultAppContext = arg0;
    }
    
    public ApplicationContext getApplicationContext()
    {
        return defaultAppContext;
    }
    

    protected WebApplicationContext createWebApplicationContext(WebApplicationContext parent)
                                    throws BeansException
    {
        ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
        BundleContext ctx = getDefaultBundleContext();
        ConfigurableWebApplicationContext wac = new OSGiXmlWebApplicationContext(ctx);
        try
        {
            ClassLoader cl = BundleDelegatingClassLoader.createBundleClassLoaderFor(
                                            ctx.getBundle(), getClass().getClassLoader());
            //Thread.currentThread().setContextClassLoader(cl);
            
            
            wac.setParent(getApplicationContext());
            
            wac.setServletContext(getServletContext());
            wac.setServletConfig(getServletConfig());
            wac.setNamespace(getNamespace());
            if (getContextConfigLocation() != null)
            {
                wac.setConfigLocations(StringUtils.tokenizeToStringArray(getContextConfigLocation(),
                 ConfigurableWebApplicationContext.CONFIG_LOCATION_DELIMITERS));
            }
            wac.addApplicationListener(this);
            wac.refresh();
           
        }
        finally
        {
            Thread.currentThread().setContextClassLoader(contextClassLoader);
        }
        return wac;
    }

	public void onApplicationEvent(ApplicationEvent arg0) {
		// TODO Auto-generated method stub
		
	}
}
