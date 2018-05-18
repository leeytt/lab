package cn.leeytt.lab.view;

/**
 * 公告
 * */

public class Tip {
	private String tip_Id;			//主键Id
	private String user_Id;			//用户Id
	private String tipType_Id;		//公告类型Id
	private String tipTitle;		//公告标题
	private String tipContent;		//公告内容
	private String tipText;		//公告缩略简文字
	private String tipNote;		//备注
	private String cover;		//封面
	private int viewCount;		//浏览次数
	private String updateTime;		//最后一次更新的时间
	private int recStatus;		//回收状态（1：正常，0：回收站）
	
	private String typeName;		//公告类型名称
	private String userName;		//用户名
	
	public String getTip_Id() {
		return tip_Id;
	}
	public void setTip_Id(String tip_Id) {
		this.tip_Id = tip_Id;
	}
	public String getUser_Id() {
		return user_Id;
	}
	public void setUser_Id(String user_Id) {
		this.user_Id = user_Id;
	}
	public String getTipType_Id() {
		return tipType_Id;
	}
	public void setTipType_Id(String tipType_Id) {
		this.tipType_Id = tipType_Id;
	}
	public String getTipTitle() {
		return tipTitle;
	}
	public void setTipTitle(String tipTitle) {
		this.tipTitle = tipTitle;
	}
	public String getTipContent() {
		return tipContent;
	}
	public void setTipContent(String tipContent) {
		this.tipContent = tipContent;
	}
	public String getTipText() {
		return tipText;
	}
	public void setTipText(String tipText) {
		this.tipText = tipText;
	}
	public String getTipNote() {
		return tipNote;
	}
	public void setTipNote(String tipNote) {
		this.tipNote = tipNote;
	}
	public String getCover() {
		return cover;
	}
	public void setCover(String cover) {
		this.cover = cover;
	}
	public int getViewCount() {
		return viewCount;
	}
	public void setViewCount(int viewCount) {
		this.viewCount = viewCount;
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
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
