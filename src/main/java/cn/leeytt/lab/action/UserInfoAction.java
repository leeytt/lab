package cn.leeytt.lab.action;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cn.leeytt.lab.service.UserInfoService;
import cn.leeytt.lab.view.UserInfo;

@Controller
@RequestMapping("admin")
public class UserInfoAction {

	@Autowired
	private UserInfoService userInfoService;
	
	/**
	 * 首页跳转登录页面
	 */ 
	@RequestMapping("index.action")
	public String index() {
		return "admin/login";
	}
	
	/**
	 * 用户登录
	 * @param loginName 登录名
	 * @param passWord 登录密码
	 */
	@RequestMapping("login.action")
	public String login(ModelMap map,
			@RequestParam(required = false, value = "UserName") String userName,
			@RequestParam(required = false, value = "PassWord") String passWord) {
		
		// 如果登录名或密码未填写，直接返回登录页面
		if (StringUtils.isEmpty(userName) || StringUtils.isEmpty(passWord)) {
			return "admin/login";
		}
		
		// 校验用户名、密码是否正确
		UserInfo userInfo = userInfoService.selectUser(userName, passWord);
		if (userInfo==null) {
			return "admin/login";
		}
		
		// 登录成功，进入主页
		return "admin/index";
	}

}
