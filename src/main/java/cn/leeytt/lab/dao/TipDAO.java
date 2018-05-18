package cn.leeytt.lab.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.leeytt.lab.view.Tip;



public interface TipDAO {
	
	/**
	 * 查询所有公告
	 * */
	List<Tip> list(Map<String, Object> param);
	
	/**
	 * 根据主键查询单个公告的信息
	 * */
	Tip selectById(String id);

	/**
	 * 新增公告
	 * */
	int insert(Tip tip);
	
	
	/**
	 * 更新公告
	 * */
	int update(Tip tip);
	
	
	/**
	 * 批量还原操作
	 * */
	void batchUpdateStatus(Map<String, Object> param);
	
	/**
	 * 根据实验室主键批量彻底删除
	 * */
	void batchDelete(@Param("idArr") String[] idArr);
	
	
	/**
	 * 根据公告类型，查询公告的数量
	 * @Param typeIdArr 类型id数组
	 * @Param recStatus 公告的回收状态
	 * */
	int countByTypeIdArr(@Param("typeIdArr") String[] typeIdArr,@Param("recStatus") String recStatus);
	
	
	/**
	 * 根据公告类型，批量删除回收站的所有公告
	 * @Param typeIdArr 类型id数组
	 * */
	void batchDeleteTypeIdArr(@Param("typeIdArr") String[] typeIdArr);

	
}
