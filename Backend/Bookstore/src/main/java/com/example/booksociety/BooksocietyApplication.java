package com.example.booksociety;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Foodiko", description = "Food Ordering App"))
public class BooksocietyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BooksocietyApplication.class, args);
		System.out.println("\n\tBooksociety Starts Successfully!\n");
	}
	
}
