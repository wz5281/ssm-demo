package com.java.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.alibaba.fastjson.JSONObject;
import com.java.mapper.UserDao;
import com.java.model.User;
import com.java.service.UserService;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Override
	public Map<String, Object> checkLogin(String job_number, String password,HttpServletRequest request) {
		System.out.println("-----------------------"+job_number);
		System.out.println("-----------------------"+password);
		User user = userDao.findByUsername(job_number,password);
		
//		System.out.println("-----------------------"+user.getId());
		//System.out.println(user.getPlace());
		Map<String,Object> map = new HashMap<>();
		if(user == null) {
			map.put("errMsg", "账号或密码错误");
			map.put("state", "0");
		}else if(user != null) {
			map.put("state", "1");
			map.put("user_info", user);
			request.getSession().setAttribute("user", user);
		}
		return map;
	}
	
	
	/**
	 * 修改用户
	 */
	@Override
	public JSONObject updateUser(JSONObject jsonObject) {
	     int query = userDao.updateUser(jsonObject);
	     JSONObject json = new JSONObject();
	     if(query>0) {
	    	 json.put("state", "1");
	    	 json.put("msg", "保存成功");
	     }else {
	    	 json.put("state", "0");
	    	 json.put("errMsg", "保存失败");
	     }
	     return json;
	}

    /*
     * 用户修改密码
     */
	@Override
	public JSONObject updatePassword(JSONObject jsonObject) {
		int query = userDao.updatePassword(jsonObject);
	     JSONObject json = new JSONObject();
	     if(query>0) {
	    	 json.put("state", "1");
	    	 json.put("msg", "修改成功");
	     }else {
	    	 json.put("state", "0");
	    	 json.put("errMsg", "修改密码失败");
	     }
	     return json;
	}


	@Override
	public Map<String, Object> updatePassword(String job_number, String password) {
		int query = userDao.updatePassword(job_number,password);
		Map<String,Object> map = new HashMap<>();
	     if(query>0) {
	    	 map.put("state", "1");
	    	 map.put("msg", "修改成功");
	     }else {
	    	 map.put("state", "0");
	    	 map.put("errMsg", "修改密码失败");
	     }
	     return map;
	
	}

    /*
     * 获取用户列表
     *
     */
	@Override
	public Map<String,Object> getUserList() {
		List<JSONObject> userList = userDao.getUserList();
		JSONObject info = new JSONObject();
		info.put("user_list", userList);
		return info;
	}

   /*
    * 删除用户
    * 
    */
	@Override
	public JSONObject deleteUser(JSONObject jsonObject) {
		int query = userDao.deleteUser(jsonObject);
		JSONObject info = new JSONObject();
		if(query>0) {
			info.put("state", "1");
			info.put("msg", "删除成功");
		}else {
			info.put("state", "0");
			info.put("errMsg", "删除失败");
		}
		return info;
	}

/*
 *添加用户 
 */
	@Override
	public String addUser(User user) {
		int exist = userDao.queryExistUsername(user.getName());
		JSONObject resultJson = new JSONObject();
		if(exist>0) {
			resultJson.put("state", "0");
			resultJson.put("errMsg", "账户已存在");
			return resultJson.toJSONString();
		}
		int query = userDao.addUser(user);
		if(query>0) {
			resultJson.put("state", "1");
			resultJson.put("msg", "添加成功");
		}
		return resultJson.toJSONString();
	}


	@Override
	public String updateUsers(User user) {
		int query = userDao.updateUsers(user);
		JSONObject resultJson = new JSONObject();
		if(query>0) {
			resultJson.put("state", "1");
		}
		return resultJson.toJSONString();
	}

}
