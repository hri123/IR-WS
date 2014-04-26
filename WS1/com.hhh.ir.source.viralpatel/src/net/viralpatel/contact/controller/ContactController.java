package net.viralpatel.contact.controller;

import java.util.List;
import java.util.Map;

import net.viralpatel.contact.form.Contact;
import net.viralpatel.contact.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

/**
 * In Spring, you mark component classes with @Component annotation.
 * There are three specializations to Component:
 * @Controller
 * @Service
 * @Repository
 * http://stackoverflow.com/questions/6827752/whats-the-difference-between-component-repository-service-annotations-in
 *
 */
@Controller
@Transactional
public class ContactController {

	@Autowired
	private ContactService contactService;

	public ContactService getContactService() {
		return contactService;
	}

	public void setContactService(ContactService contactService) {
		this.contactService = contactService;
	}
	
	// TODO: taglibs in OSGi world - http://davidvaleri.wordpress.com/2011/08/17/deploying-spring-mvc-based-web-applications-to-osgi-using-apache-servicemix/

	// http://localhost:1085/Spring3HibernateOSGiJSPs/jsp/contact.jsp
	
	// http://localhost:1085/Spring3HibernateOSGi/index
	// and not 
	// http://localhost:8080/Spring3HibernateOSGi/index
	// 1085 is what is set in the arguments
	// Spring3HibernateOSGi is what is set in service.registerServlet("/Spring3HibernateOSGi",  servlet, initparam, null); in Activator.java
	// if @ResponseBody is not mentioned, spring will search for a jsp file with that value present in the return string
	@RequestMapping("/index")
	public @ResponseBody String listContacts() {

		List<Contact> contacts= contactService.listContact();

		Gson gson = new Gson();
		return gson.toJson(contacts);
	}

	// http://localhost:1085/Spring3HibernateOSGi/add
	// firstname=hrishi&lastname=kumar&email=hhh%40hhh&telephone=123424
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public @ResponseBody String addContact(@ModelAttribute("contact")
	Contact contact, BindingResult result) {

		contactService.addContact(contact);

		return listContacts();
	}

	// http://localhost:1085/Spring3HibernateOSGi/delete/41
	@RequestMapping("/delete/{contactId}")
	public @ResponseBody String deleteContact(@PathVariable("contactId")
	Integer contactId) {

		contactService.removeContact(contactId);

		return listContacts();
	}
}
