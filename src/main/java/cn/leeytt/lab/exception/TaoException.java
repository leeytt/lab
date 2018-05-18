package cn.leeytt.lab.exception;


/**
 * 自定义异常类
 * 抛出预期异常信息
 */
public class TaoException extends Exception {

	private static final long serialVersionUID = 1L;
	
	// 异常信息
	public String message;
	
	public TaoException(String message){
		super(message);
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}