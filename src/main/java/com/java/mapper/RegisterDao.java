package com.java.mapper;

import org.springframework.stereotype.Repository;

import com.java.model.Register;

@Repository
public interface RegisterDao {

	int addRegisterRecord(Register register);
	
	
}
