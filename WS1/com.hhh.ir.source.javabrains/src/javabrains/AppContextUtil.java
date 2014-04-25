package javabrains;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class AppContextUtil implements ApplicationContextAware {

	private static ApplicationContext ctx= null;

	public static ApplicationContext getApplicationContext() {
		return ctx;
	}

	public void setApplicationContext(ApplicationContext ctx1)
			throws BeansException {
		ctx = ctx1;
	}
	
	public static Object getBean(String id) {
		
		Object obj= null;
		try {
			obj= ctx.getBean(id);
			
		} catch (BeansException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obj;
	}
	
}