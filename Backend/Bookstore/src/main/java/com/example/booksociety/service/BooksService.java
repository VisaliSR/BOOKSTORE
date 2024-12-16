package com.example.booksociety.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.example.booksociety.model.Books;
import com.example.booksociety.repository.BooksRepository;

import jakarta.transaction.Transactional;

@Service
public class BooksService {
	@Autowired
	BooksRepository booksRepo;

	public List<Books> getAll() {
		List<Books> booksList = booksRepo.findAll();
		return booksList;
	}

	public Books save(Books f) {
		Books book = booksRepo.save(f);
		return book;
	}

	public List<Books> saveAll(List<Books> f) {
		List<Books> book = booksRepo.saveAllAndFlush(f);
		return book;
	}

	public Books update(Books f, int id) {
		Optional<Books> optional = booksRepo.findById(id);
		Books book = null;
		if (optional.isPresent()) {
			book = optional.get();
			booksRepo.saveAndFlush(f);
		}
		return book;
	}

	public void delete(int id) {
		booksRepo.deleteById(id);
	}

	public Books get(int id) {
		Books books = booksRepo.findById(id).get();
		return books;
	}

	public List<Books> sort(String field) {
		return booksRepo.findAll(Sort.by(field));
	}

	public List<Books> rsort(String field) {
		return booksRepo.findAll(Sort.by(Direction.DESC, field));
	}

	public List<Books> paging(int offset, int pageSize) {
		Pageable paging = PageRequest.of(offset, pageSize);
		Page<Books> iData = booksRepo.findAll(paging);
		List<Books> booksList = iData.getContent();
		return booksList;
	}

	public List<Books> pagingAndSorting(int offset, int pageSize, String field) {
		Pageable paging = PageRequest.of(offset, pageSize).withSort(Sort.by(field));
		Page<Books> iData = booksRepo.findAll(paging);
		List<Books> booksList = iData.getContent();
		return booksList;
	}

	public List<Books> rpagingAndSorting(int offset, int pageSize, String field) {
		Pageable paging = PageRequest.of(offset, pageSize).withSort(Sort.by(Direction.DESC, field));
		Page<Books> iData = booksRepo.findAll(paging);
		List<Books> booksList = iData.getContent();
		return booksList;
	}

	public List<Books> getbooksByRating(String rating) {
		List<Books> booksList = booksRepo.getBooksByRating(rating);
		return booksList;
	}

	@Transactional
	public int updatePriceByName(String price, String name) {
		return booksRepo.updatePriceByName(price, name);
	}

	@Transactional
	public int deleteByName(String name) {
		return booksRepo.deleteByName(name);
	}

	public Books getbookByName(String name) {
		Books book = booksRepo.getItemByName(name);
		return book;
	}

}
