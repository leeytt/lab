package cn.leeytt.lab.dao;

import org.apache.ibatis.annotations.Param;

import cn.leeytt.lab.view.UserInfo;

public interface UserInfoDAO {

	/**
	 * 校验用户
	 * @param userName 登录名
	 * @param passWord 登录密码
	 * @return
	 */
	UserInfo selectUser(@Param("userName") String userName, @Param("passWord") String passWord);


}