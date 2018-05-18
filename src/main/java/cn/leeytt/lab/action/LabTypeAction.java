package cn.leeytt.lab.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.leeytt.lab.exception.TaoException;
import cn.leeytt.lab.service.LabTypeService;
import cn.leeytt.lab.view.LabType;
import cn.leeytt.lab.view.Result;

@Controller
@RequestMapping("LabType")

public class LabTypeAction {
	@Autowired
	private LabTypeService labTypeService;
	
	/**
	 * 查看所有类型列表
	 * */
	@RequestMapping("list_LabType.action")
	public String list(ModelMap map) {
		
		List<LabType> list = labTypeService.list();
		map.put("list", list);
		return "admin/Lab/list_LabType";
	}
	
	/**
	 * 添加实验室类型
	 * @Param idArr 主键数组
	 * */
	@RequestMapping("save.json")
	@ResponseBody
	public Result save(
		@RequestParam(value = "idArr") String[] idArr,
		@RequestParam(value = "sortArr") String[] sortArr,
		@RequestParam(value = "nameArr") String[] nameArr) {
		
		labTypeService.save(idArr,sortArr,nameArr);
		
		return Result.success();
		
	}
	

	/**
	 * 批量删除实验室类型
	 * @throws TaoException 
	 * @Param idArr 主键数组
	 * */
	@RequestMapping("delete.json")
	@ResponseBody
	public Result delete(
		@RequestParam(value = "idArr") String[] idArr) throws TaoException {
		
		labTypeService.delete(idArr);
		
		return Result.success();
		
	}

}
