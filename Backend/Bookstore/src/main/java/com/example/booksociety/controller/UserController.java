package com.example.booksociety.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.booksociety.model.User;
import com.example.booksociety.service.EmailOtpService;
import com.example.booksociety.service.UserService;

@RestController
@CrossOrigin("*")
public class UserController {
	@Autowired
	UserService uService;
	@Autowired
	EmailOtpService emailOtpService;

	@PostMapping("/user/signup")
	public User signup(@RequestBody User u) {
		return uService.signup(u);
	}

	@PostMapping("/user/login")
	public String login(@RequestBody User u) {
		String result = uService.login(u.getEmail(), u.getPassword());
		return result;
	}

	@PostMapping("/user/loginauth")
	public User loginAuth(@RequestBody User u) {
		User user = uService.loginAuth(u.getEmail());
		return user;
	}

	@GetMapping("/user/getall")
	public List<User> getAllUser() {
		List<User> uList = uService.getAllUser();
		return uList;
	}
	
	@GetMapping("/user/profile/{id}")
	public User getUserById (@PathVariable int id) {
		User user = uService.getUserByID(id);
		return user;
	}

	@DeleteMapping("/user/delete/{id}")
	public void deleteUser(@PathVariable int id) {
		uService.deleteUser(id);
	}

	@PostMapping("/user/update/{id}")
	public User updateUser(@RequestBody User user,@PathVariable int id) {
		return uService.updateUser(user,id);
	}
	
	Random random = new Random();
	int otp = 0;
	String emailOtpReset;

	@PostMapping("/user/send_otp")
	public int sendOtp(@RequestBody User u) {
		String email=u.getEmail();
		if (emailOtpService.emailExist(email) != null) {
			otp = random.nextInt(900000) + 100000;
			emailOtpService.sendMessage(email, "Foodiko Password Reset ", "OTP for Resetting Your Password \n" + otp);
			return otp;
		} else {
			return -1;
		}
	}

	@PostMapping("/user/change_password")
	public void changePassword(@RequestBody User u) {
		uService.changePassword(u.getEmail(), u.getPassword());
	}
	
}
