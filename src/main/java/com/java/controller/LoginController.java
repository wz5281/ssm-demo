package com.java.controller;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.java.mapper.UserDao;
import com.java.model.User;
import com.java.service.UserService;
@Controller
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("login")
     public String Login() {
    	 return "login";
     }
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	@RequestMapping("/home")
	public String Home() {
		return "home";
	}
	//去签到页面
	@RequestMapping("/register")
	public String Register() {
		return "register";
	}
	/*
	 * 登录
	 */
	@RequestMapping(value="/checkLogin",method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> login(@RequestBody User user,HttpServletRequest request){
        return userService.checkLogin(user.getJob_number(), user.getPassword(), request);
    }

	/*
	 * 用户修改信息
	 */
	@RequestMapping("/updateUser")
	@ResponseBody
	public JSONObject updateUser(@RequestBody JSONObject requestJson) {
		return userService.updateUser(requestJson);
	}
	
	/*
	 * 用户修改密码
	 */
	@RequestMapping(value="/updatePassword",method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> updatePassword(@RequestBody User user){
        return userService.updatePassword(user.getJob_number(), user.getPassword());
    }
	
	/*
	 * 获取用户列表
	 */
	@RequestMapping("/getUserList")
	@ResponseBody
	public Map<String,Object> getUserList() {
		return userService.getUserList();
	}
	
	/*
	 * 
	 * 删除用户
	 */
	@RequestMapping("/deleteUser")
	@ResponseBody
	public JSONObject deleteUser(@RequestBody JSONObject requestJson) {
		return userService.deleteUser(requestJson);
	}
	
	/*
	 * 添加用户
	 */
	@RequestMapping("/addUser")
	@ResponseBody
	public String addUser(@RequestBody User user) {
		//User user = JSON.parseObject(requestJson,User.class);
		return userService.addUser(user);
	}
	/*
	 * 管理员编辑用户信息
	 */
	@RequestMapping("/updateUsers")
	@ResponseBody
	public String updateUsers(@RequestBody User user) {
		return userService.updateUsers(user);
	}
}
