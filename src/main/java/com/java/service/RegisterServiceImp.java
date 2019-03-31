package com.java.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.java.mapper.RegisterDao;
import com.java.model.Register;
@Service
public class RegisterServiceImp implements RegisterService {
    @Autowired
    private RegisterDao registerDao;
	/*
	 * 添加签到记录
	 */
	@Override
	public String addRegisterRecord(Register register) {
		    int query = registerDao.addRegisterRecord(register);
			JSONObject resultJson = new JSONObject();
		    if(query>0) {
		    	resultJson.put("state", "1");
		    }
		    return resultJson.toJSONString();
	}

}
