package com.java.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.java.model.Register;
import com.java.service.RegisterService;
import com.java.service.UserService;

@Controller
public class RegisterController {
	
	@Autowired
	private RegisterService registerService;
	
    @RequestMapping("/addRegisterRecord")
    @ResponseBody
    public String addRegisterRecord(@RequestBody Register register) {
    	return registerService.addRegisterRecord(register);
    }
}
