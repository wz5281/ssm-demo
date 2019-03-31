package com.java.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.alibaba.fastjson.JSONObject;
import com.java.model.Register;
import com.java.model.User;

@Repository
public interface UserDao {
	/**
	 * 查找工号和密码
	 * @param job_name 工号
	 * @param password 密码
	 * @return
	 */
	User findByUsername(@Param(value="job_number")String job_number,@Param(value="password")String password);

	
	/*
	 * 修改用户信息
	 */
	int updateUser(JSONObject jsonObject);
	
	/*
	 * 用户修改密码
	 */
    int updatePassword(JSONObject jsonObject);


	int updatePassword(@Param(value="job_number")String job_number,@Param(value="password")String password);

    /*
     * 查询用户列表
     */
	List<JSONObject> getUserList();


	int deleteUser(JSONObject jsonObject);

    /*
     * 查询用户名是否存在
     */
	int queryExistUsername(String name);
	/*
	 * 增加用户
	 */
	int addUser(User user);
	
	/*
	 * 添加签到记录
	 */
	int addRegisterRecord();


	void addRegisterRecord(Register re);


	int updateUsers(User user);


}
