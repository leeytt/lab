package cn.leeytt.lab.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.leeytt.lab.view.Lab;


public interface LabDAO {
	
	/**
	 * 查询所有实验室
	 * */
	List<Lab> list(Map<String, Object> param);
	
	/**
	 * 根据主键查询单个实验室的信息
	 * */
	Lab selectById(String lab_Id);

	/**
	 * 新增实验室
	 * */
	int insert(Lab lab);
	
	
	/**
	 * 更新实验室
	 * */
	int update(Lab lab);
	
	
	/**
	 * 批量还原操作
	 * */
	void batchUpdateStatus(Map<String, Object> param);
	
	/**
	 * 根据实验室主键批量彻底删除
	 * */
	void batchDelete(@Param("idArr") String[] idArr);
	
	
	/**
	 * 根据实验室类型，查询实验室的数量
	 * @Param typeIdArr 类型id数组
	 * @Param recStatus 实验室的回收状态
	 * */
	int countByTypeIdArr(@Param("typeIdArr") String[] typeIdArr,@Param("recStatus") String recStatus);
	
	
	/**
	 * 根据实验室门牌号，查询实验室的数量
	 * @Param doorIdArr 门牌id数组
	 * @Param recStatus 实验室的回收状态
	 * */
	int countByDoorIdArr(@Param("doorIdArr") String[] doorIdArr,@Param("recStatus") String recStatus);
	
	/**
	 * 根据实验室类型，批量删除回收站的所有实验室
	 * @Param typeIdArr 类型id数组
	 * */
	void batchDeleteTypeIdArr(@Param("typeIdArr") String[] typeIdArr);
	
	/**
	 * 根据实验室门牌号，批量删除回收站的所有实验室
	 * @Param doorIdArr 门牌id数组
	 * */
	void batchDeleteDoorIdArr(@Param("doorIdArr") String[] doorIdArr);

	
}
