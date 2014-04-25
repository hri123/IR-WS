package com.hhh.ir.infra.core.services;

import org.osgi.framework.BundleContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.osgi.context.BundleContextAware;

public class DefaultBundleContextAwareBean implements BundleContextAware, ApplicationContextAware
{
    protected BundleContext bundleContext = null;
    protected ApplicationContext applicationContext = null;
    public BundleContext getBundleContext()
    {
        return bundleContext;
    }
    public void setBundleContext(BundleContext bundleContext)
    {
        this.bundleContext = bundleContext;
    }
    public ApplicationContext getApplicationContext()
    {
        return applicationContext;
    }
    public void setApplicationContext(ApplicationContext applicationContext)
    {
        this.applicationContext = applicationContext;
    }
       
}    
