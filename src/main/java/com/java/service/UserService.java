package com.java.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.java.model.User;


public interface UserService {
	//登录
    Map<String,Object> checkLogin(String job_number,String password,HttpServletRequest request); 
    	
    /*
     * 修改用户信息
     */
    JSONObject updateUser(JSONObject jsonObject);
    
    /*
     * 用户修改密码
     */
    JSONObject updatePassword(JSONObject jsonObject);

	Map<String, Object> updatePassword(String job_number, String password);

	 Map<String,Object> getUserList();

	JSONObject deleteUser(JSONObject jsonObject);

	String addUser(User user);

	String updateUsers(User user);
}
