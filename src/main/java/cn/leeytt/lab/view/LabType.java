package cn.leeytt.lab.view;

/**
 * 实验室类型
 * */

public class LabType {
	private String labType_Id;	//主键id
	private String typeName;	//类型名称
	private String updateTime;	//类型最后一次更新的时间
	private String sort;		//显示排序
	
	public String getLabType_Id() {
		return labType_Id;
	}
	public void setLabType_Id(String labType_Id) {
		this.labType_Id = labType_Id;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	
	
}
