package com.example.booksociety.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.booksociety.model.User;
import com.example.booksociety.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository uRepo;

	public User signup(User u) {
		return uRepo.save(u);
	}

	public String login(String email, String password) {
		User user = uRepo.findByemail(email);
		if (user == null) {
			return "Email not found";
		} else {
			if (user.getPassword().equals(password)) {
				return "Login Successful";
			} else {
				return "Password Wrong";
			}
		}
	}

	public User loginAuth(String email) {
		User user = uRepo.findByemail(email);
		return user;
	}

	public List<User> getAllUser() {
		List<User> uList = uRepo.findAll();
		return uList;
	}

	public User getUserByID(int id) {
		User user = uRepo.findById(id).get();
		return user;
	}

	public void deleteUser(int id) {
		uRepo.deleteById(id);
	}

	public void changePassword(String email, String password) {
		User user = uRepo.findByemail(email);
		if (user != null) {
			user.setPassword(password);
			uRepo.saveAndFlush(user);
		}
	}

	public User updateUser(User user, int id) {
		Optional<User> optional = uRepo.findById(id);
		User u = null;
		if (optional.isPresent()) {
			u = optional.get();
			uRepo.saveAndFlush(user);
		}
		return u;
	}

}
