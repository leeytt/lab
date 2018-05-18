package cn.leeytt.lab.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import cn.leeytt.lab.dao.LabDAO;
import cn.leeytt.lab.view.Lab;

@Service("LabService")
public class LabService {
	
	@Autowired
	private LabDAO labDAO;
	
	/**
	 * 查询所有实验室
	 * */
	public List<Lab> list(Map<String, Object> param) {
		return labDAO.list(param);
	}
	
	/**
	 * 查询单个实验室的信息
	 * */
	public Lab selectById(String lab_Id) {
		return labDAO.selectById(lab_Id);
	}
	
	
	/**
	 * 实验室保存
	 * */
	public void save(Lab lab) {
		//时间格式转字符串
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = formatter.format(currentTime);
		
		//判断是新增还是更新
		if (StringUtils.isEmpty(lab.getLab_Id())) {
			//新增
			lab.setRecStatus(1);
			lab.setUpdateTime(now);
			
			labDAO.insert(lab);
		}else {
			//更新
			lab.setUpdateTime(now);
			
			labDAO.update(lab);
		}
	}
	

	/**
	 * 批量操作
	 * */
	public void batchUpdateStatus(Map<String, Object> param) {
		labDAO.batchUpdateStatus(param);
	}
	

	/**
	 * 批量彻底删除
	 * */
	public void batchDelete(String[] idArr) {
		labDAO.batchDelete(idArr);
	}	
}
