package cn.leeytt.lab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import cn.leeytt.lab.dao.LabDAO;
import cn.leeytt.lab.dao.LabTypeDAO;
import cn.leeytt.lab.exception.TaoException;
import cn.leeytt.lab.view.LabType;

@Service("LabTypeService")
public class LabTypeService {
	@Autowired
	private LabTypeDAO labTypeDAO;
	@Autowired
	private LabDAO labDAO;
	
	/**
	 * 查询所有实验室类型
	 * */
	public List<LabType> list() {
		return labTypeDAO.list();
	}
	
	/**
	 * 批量更新/插入实验室类型
	 * @Param idArr 
	 * @Param sortArr 
	 * @Param nameArr 
	 * */
	public void save(String[] idArr, String[] sortArr, String[] nameArr) {
		//遍历第一个数组
		for (int i = 0; i < idArr.length; i++) {
			//判断这条数据是需要更新还是插入
			if (StringUtils.isEmpty(idArr[i])) {
				//插入
				labTypeDAO.insert(sortArr[i], nameArr[i]);
			}else {
				//更新
				labTypeDAO.update(idArr[i], sortArr[i], nameArr[i]);
			}
		}
	}
	
	/**
	 * 批量删除实验室类型
	 * @throws TaoException 
	 * @Param idArr 主键数组
	 * */
	public void delete(String[] idArr) throws TaoException {
		//判断该分类有没有被使用
		int nCount = labDAO.countByTypeIdArr(idArr,"1");
		
		if (nCount>0) {
		//被占用，禁止删除
		throw new TaoException("存在已被使用的分类，不能删除");
		}
				
		//先删除该分类下回收站的所有文章
		labDAO.batchDeleteTypeIdArr(idArr);	
		
		//再删除该分类类型
		labTypeDAO.delete(idArr);
	}


}
