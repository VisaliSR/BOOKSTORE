package com.example.booksociety.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.booksociety.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	User findByemail(String email);
	
}
