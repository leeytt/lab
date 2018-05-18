package cn.leeytt.lab.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import cn.leeytt.lab.dao.TipDAO;
import cn.leeytt.lab.view.Tip;



@Service("TipService")
public class TipService {
	
	@Autowired
	private TipDAO tipDAO;
	
	/**
	 * 查询所有公告
	 * */
	public List<Tip> list(Map<String, Object> param) {
		return tipDAO.list(param);
	}
	
	/**
	 * 查询单个公告的信息
	 * */
	public Tip selectById(String id) {
		return tipDAO.selectById(id);
	}
	
	
	/**
	 * 公告保存
	 * */
	public void save(Tip tip) {
		//时间格式转字符串
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = formatter.format(currentTime);
		
		//判断是新增还是更新
		if (StringUtils.isEmpty(tip.getTip_Id())) {
			//新增
			tip.setRecStatus(1);
			tip.setUpdateTime(now);
			
			tipDAO.insert(tip);
		}else {
			//更新
			tip.setUpdateTime(now);
			
			tipDAO.update(tip);
		}
	}
	

	/**
	 * 批量操作
	 * */
	public void batchUpdateStatus(Map<String, Object> param) {
		tipDAO.batchUpdateStatus(param);
	}
	

	/**
	 * 批量彻底删除
	 * */
	public void batchDelete(String[] idArr) {
		tipDAO.batchDelete(idArr);
	}	
}
