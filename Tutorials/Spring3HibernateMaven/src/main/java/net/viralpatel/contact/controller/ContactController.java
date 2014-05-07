package net.viralpatel.contact.controller;

import java.util.Map;

import net.viralpatel.contact.form.Contact;
import net.viralpatel.contact.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * In Spring, you mark component classes with @Component annotation.
 * There are three specializations to Component:
 * @Controller
 * @Service
 * @Repository
 * http://stackoverflow.com/questions/6827752/whats-the-difference-between-component-repository-service-annotations-in
 * @author ADMINIBM
 *
 */
@Controller
public class ContactController {

	@Autowired
	private ContactService contactService;

	// http://localhost:8080/Spring3HibernateMaven/index
	@RequestMapping("/index")
	public String listContacts(Map<String, Object> map) {

		map.put("contact", new Contact());
		map.put("contactList", contactService.listContact());

		return "contact";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String addContact(@ModelAttribute("contact")
	Contact contact, BindingResult result) {

		contactService.addContact(contact);

		return "redirect:/index";
	}

	@RequestMapping("/delete/{contactId}")
	public String deleteContact(@PathVariable("contactId")
	Integer contactId) {

		contactService.removeContact(contactId);

		return "redirect:/index";
	}
}
