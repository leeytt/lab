package cn.leeytt.lab.view;

/**
 *实验室门牌
 * */

public class LabDoor {
	private String labDoor_Id;	//主键id
	private String doorName;		//门牌名称
	private String updateTime;	//门牌最后一次更新的时间
	
	public String getLabDoor_Id() {
		return labDoor_Id;
	}
	public void setLabDoor_Id(String labDoor_Id) {
		this.labDoor_Id = labDoor_Id;
	}
	public String getDoorName() {
		return doorName;
	}
	public void setDoorName(String doorName) {
		this.doorName = doorName;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

}
