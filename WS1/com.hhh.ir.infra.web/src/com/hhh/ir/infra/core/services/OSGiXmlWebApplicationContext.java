package com.hhh.ir.infra.core.services;

import org.osgi.framework.BundleContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;

public class OSGiXmlWebApplicationContext extends XmlWebApplicationContext implements
                                ConfigurableWebApplicationContext
{
    protected BundleContext ctx;
    
    protected AbstractApplicationContext appCtx;
    
    public OSGiXmlWebApplicationContext(BundleContext ctx)
    {
        this.ctx = ctx;
    }
    
}
