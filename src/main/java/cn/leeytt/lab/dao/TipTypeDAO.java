package cn.leeytt.lab.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.leeytt.lab.view.TipType;


public interface TipTypeDAO {
	/**
	 * 查询所有公告类型
	 * */
	List<TipType> list();
	
	/**
	 * 插入一条新的数据
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
	 * 批量删除类型
	 * @Param idArr 主键数组
	 * */
	int delete(@Param("idArr") String[] idArr);
	
	
}
