package cn.leeytt.lab.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.leeytt.lab.view.LabDoor;



public interface LabDoorDAO {
	/**
	 * 查询所有门牌号
	 * */
	List<LabDoor> list();
	
	/**
	 * 插入一条新的数据
	 * @Param sort 排序用
	 * @Param name 分类的名称
	 * */
	int insert(@Param("name") String name);
	
	/**
	 * 更新一条新的数据
	 * @Param id 主键
	 * @Param name 分类的名称
	 * */
	int update(@Param("id") String id, @Param("name") String name);
	
	/**
	 * 批量删除门牌号
	 * @Param idArr 主键数组
	 * */
	int delete(@Param("idArr") String[] idArr);
	
	
}
