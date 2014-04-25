package com.hhh.ir.infra.core.services;

import java.util.Collection;

public interface IServicesStatusProvider
{
    public enum ServiceStatus
    {
        UP, DOWN, UNKNOWN;
    }
    
    public class ServiceInfo
    {
        public String id;
        public String parentBundleName = "";
        public String label = "";
        public String description="";
        public ServiceStatus status = ServiceStatus.UP;
        public String message = "";
    }
    
    public Collection<ServiceInfo> getServicesStatus(); 
}
