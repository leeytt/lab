package cn.leeytt.lab.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.leeytt.lab.view.LabType;


public interface LabTypeDAO {
	/**
	 * 查询所有实验室类型
	 * */
	List<LabType> list();
	
	/**
	 * 插入一条新的数据
	 * @Param sort 排序用
	 * @Param name 分类的名称
	 * @Param updatime 更新时间
	 * */
	int insert(@Param("sort") String sort, @Param("name") String name);
	
	/**
	 * 更新一条新的数据
	 * @Param id 主键
	 * @Param sort 排序用
	 * @Param name 分类的名称
	 * @Param updatime 更新时间
	 * */
	int update(@Param("id") String id, @Param("sort") String sort, @Param("name") String name);
	
	/**
	 * 批量删除实验室类型
	 * @Param idArr 主键数组
	 * */
	int delete(@Param("idArr") String[] idArr);
	
	
}
