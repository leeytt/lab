package cn.leeytt.lab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import cn.leeytt.lab.dao.TipDAO;
import cn.leeytt.lab.dao.TipTypeDAO;
import cn.leeytt.lab.exception.TaoException;
import cn.leeytt.lab.view.TipType;

@Service("TipTypeService")
public class TipTypeService {
	@Autowired
	private TipTypeDAO tipTypeDAO;
	@Autowired
	private TipDAO tipDAO;
	
	/**
	 * 查看所有类型列表
	 * */
	public List<TipType> list() {
		return tipTypeDAO.list();
	}
	
	/**
	 * 批量更新/插入类型
	 * @Param idArr 
	 * @Param nameArr 
	 * */
	public void save(String[] idArr, String[] nameArr) {
		//遍历第一个数组
		for (int i = 0; i < idArr.length; i++) {
			//判断这条数据是需要更新还是插入
			if (StringUtils.isEmpty(idArr[i])) {
				//插入
				tipTypeDAO.insert(nameArr[i]);
			}else {
				//更新
				tipTypeDAO.update(idArr[i], nameArr[i]);
			}
		}
	}
	
	/**
	 * 批量删除类型
	 * @throws TaoException 
	 * @Param idArr 主键数组
	 * */
	public void delete(String[] idArr) throws TaoException {
		
		//判断该分类有没有被使用
		int nCount = tipDAO.countByTypeIdArr(idArr,"1");
		
		if (nCount>0) {
		//被占用，禁止删除
		throw new TaoException("存在已被使用的类型，不能删除");
		}
		
		//先删除该分类下回收站的所有实验室
		tipDAO.batchDeleteTypeIdArr(idArr);	
		
		//再删除该门牌号
		tipTypeDAO.delete(idArr);
	}


}
