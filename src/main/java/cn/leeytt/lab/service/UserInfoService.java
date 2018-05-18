package cn.leeytt.lab.service;

import cn.leeytt.lab.dao.UserInfoDAO;
import cn.leeytt.lab.view.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserInfoService")
public class UserInfoService {
	@Autowired
	private UserInfoDAO UserInfoDAO;

	/**
	 * 校验用户登录
	 * @param loginName 登录名
	 * @param passWord 登录密码
	 * @return
	 */
	public UserInfo selectUser(String userName, String passWord) {
		
		return UserInfoDAO.selectUser(userName, passWord);
	}

}