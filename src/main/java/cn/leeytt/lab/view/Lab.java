package cn.leeytt.lab.view;

/**
 * 实验室
 * */

public class Lab {
	private String lab_Id;			//主键Id
	private String labType_Id;		//实验室类型Id
	private String labDoor_Id;		//门牌号Id
	private String labName;		//实验室名称
	private String labna;		//实验室简称
	private String updateTime;		//实验室最后一次更新的时间
	private int recStatus;		//实验室的回收状态（1：正常，0：回收站）
	
	private String typeName;		//实验室类型名称
	private String doorName;		//实验室门牌号
	
	public String getLab_Id() {
		return lab_Id;
	}
	public void setLab_Id(String lab_Id) {
		this.lab_Id = lab_Id;
	}
	public String getLabType_Id() {
		return labType_Id;
	}
	public void setLabType_Id(String labType_Id) {
		this.labType_Id = labType_Id;
	}
	public String getLabDoor_Id() {
		return labDoor_Id;
	}
	public void setLabDoor_Id(String labDoor_Id) {
		this.labDoor_Id = labDoor_Id;
	}
	public String getLabName() {
		return labName;
	}
	public void setLabName(String labName) {
		this.labName = labName;
	}
	public String getLabna() {
		return labna;
	}
	public void setLabna(String labna) {
		this.labna = labna;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public int getRecStatus() {
		return recStatus;
	}
	public void setRecStatus(int recStatus) {
		this.recStatus = recStatus;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getDoorName() {
		return doorName;
	}
	public void setDoorName(String doorName) {
		this.doorName = doorName;
	}
	
}
