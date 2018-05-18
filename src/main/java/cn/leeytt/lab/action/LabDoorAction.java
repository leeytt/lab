package cn.leeytt.lab.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.leeytt.lab.exception.TaoException;
import cn.leeytt.lab.service.LabDoorService;
import cn.leeytt.lab.view.LabDoor;
import cn.leeytt.lab.view.Result;

@Controller
@RequestMapping("LabDoor")

public class LabDoorAction {
	@Autowired
	private LabDoorService labDoorService;
	
	/**
	 * 查看所有门牌号列表
	 * */
	@RequestMapping("list_LabDoor.action")
	public String list(ModelMap map) {
		
		List<LabDoor> list = labDoorService.list();
		map.put("list", list);
		return "admin/Lab/list_LabDoor";
	}
	
	/**
	 * 添加门牌
	 * @Param idArr 主键数组
	 * */
	@RequestMapping("save.json")
	@ResponseBody
	public Result save(
		@RequestParam(value = "idArr") String[] idArr,
		@RequestParam(value = "nameArr") String[] nameArr) {
		
		labDoorService.save(idArr,nameArr);
		
		return Result.success();
		
	}
	

	/**
	 * 批量删除门牌
	 * @throws TaoException 
	 * @Param idArr 主键数组
	 * */
	@RequestMapping("delete.json")
	@ResponseBody
	public Result delete(
		@RequestParam(value = "idArr") String[] idArr) throws TaoException {
		
		labDoorService.delete(idArr);
		
		return Result.success();
		
	}

}
