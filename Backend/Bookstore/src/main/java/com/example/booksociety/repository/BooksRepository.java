package com.example.booksociety.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.booksociety.model.Books;

@Repository
public interface BooksRepository extends JpaRepository<Books, Integer>{
	
	//positional parameter
	@Query("select i from Books i where i.name=?1")
	public Books getItemByName(String name);
	
	@Modifying
	@Query("update Books i set i.price=?1 where i.name=?2")
	public int updatePriceByName(String price,String name);
	
	//named parameter
	@Modifying
	@Query("delete from Books i where i.name=:name")
	public int deleteByName(String name);
	
	//MySql query using native query
	@Query(value="select * from Books i where i.rating>=?",nativeQuery=true)
	public List<Books> getBooksByRating(String rating);
}
