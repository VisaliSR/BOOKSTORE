package com.example.booksociety.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.booksociety.model.Books;
import com.example.booksociety.service.BooksService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin("*")
public class BooksController {
	@Autowired
	BooksService booksService;

	@GetMapping("/getAllbooks")
	public List<Books> getAll() {
		List<Books> booksList = booksService.getAll();
		return booksList;
	}

	@GetMapping("/getbook/{id}")
	public Books get(@PathVariable int id) {
		return booksService.get(id);
	}

	@PostMapping("/saveAllbook")
	public List<Books> saveAll(@RequestBody List<Books> i) {
		return booksService.saveAll(i);
	}

	@PostMapping("/savebook")
	public Books save(@RequestBody Books i) {
		return booksService.save(i);
	}

	@PutMapping("/updatebook/{id}")
	public Books update(@RequestBody Books i, @PathVariable int id) {
		return booksService.update(i, id);
	}

	@DeleteMapping("/deletebook/{id}")
	public void delete(@PathVariable int id) {
		booksService.delete(id);
	}

	@GetMapping("/sortbooks/{field}")
	public List<Books> sort(@PathVariable String field) {
		return booksService.sort(field); 
	}

	@GetMapping("/reversesortbooks/{field}")
	public List<Books> rsort(@PathVariable String field) {
		return booksService.rsort(field);
	}

	@GetMapping("/paging/{pageSize}/{offset}")
	public List<Books> paging(@PathVariable int offset, @PathVariable int pageSize) {
		return booksService.paging(offset, pageSize);
	}

	@GetMapping("/pagingAndSorting/{field}/{pageSize}/{offset}")
	public List<Books> pagingAndSorting(@PathVariable int offset, @PathVariable int pageSize,
			@PathVariable String field) {
		return booksService.pagingAndSorting(offset, pageSize, field);
	}

	@GetMapping("/pagingAndreverseSorting/{field}/{pageSize}/{offset}")
	public List<Books> rpagingAndSorting(@PathVariable int offset, @PathVariable int pageSize,
			@PathVariable String field) {
		return booksService.rpagingAndSorting(offset, pageSize, field);
	}

	@Operation(summary = "Get books by Name")
	@GetMapping("/getbookByName/{name}")
	public Books getbookByName(@PathVariable String name) {
		return booksService.getbookByName(name);
	}

	@Operation(summary = "Delete books by Name")
	@DeleteMapping("/deleteByName/{name}")
	public String deleteByName(@PathVariable String name) {
		int result = booksService.deleteByName(name);
		if (result > 0)
			return "book deleted";
		else
			return "Problem occured while deleting";
	}

	@Operation(summary = "Update Price by Name")
	@PutMapping("/updatePriceByName/{price}/{name}")
	public String updatePriceByName(@PathVariable String price, @PathVariable String name) {
		int result = booksService.updatePriceByName(price, name);
		if (result > 0)
			return "book updated";
		else
			return "Problem occured while updating";
	}

	@Operation(summary = "Get books by Rating")
	@GetMapping("/getbooksByRating/{rating}")
	public List<Books> getbooksByrating(@PathVariable String rating) {
		List<Books> iList = booksService.getbooksByRating(rating);
		return iList;
	}

}
