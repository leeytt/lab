package cn.leeytt.lab.view;

/**
 *公告类型
 * */
public class TipType {
	private String tipType_Id;	//主键id
	private String typeName;		//类型名称
	private String updateTime;	//类型最后一次更新的时间
	
	public String getTipType_Id() {
		return tipType_Id;
	}
	public void setTipType_Id(String tipType_Id) {
		this.tipType_Id = tipType_Id;
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
	
	
}
