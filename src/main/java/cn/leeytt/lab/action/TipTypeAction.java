package cn.leeytt.lab.action;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.leeytt.lab.exception.TaoException;
import cn.leeytt.lab.service.TipTypeService;
import cn.leeytt.lab.view.Result;
import cn.leeytt.lab.view.TipType;

@Controller
@RequestMapping("TipType")

public class TipTypeAction {
	@Autowired
	private TipTypeService tipTypeService;
	
	/**
	 * 查看所有类型列表
	 * */
	@RequestMapping("list_TipType.action")
	public String list(ModelMap map) {
		
		List<TipType> list = tipTypeService.list();
		map.put("list", list);
		return "admin/Tip/list_TipType";
	}
	
	/**
	 * 添加公告类型
	 * @Param idArr 主键数组
	 * */
	@RequestMapping("save.json")
	@ResponseBody
	public Result save(
		@RequestParam(value = "idArr") String[] idArr,
		@RequestParam(value = "nameArr") String[] nameArr) {
		
		tipTypeService.save(idArr,nameArr);
		
		return Result.success();
		
	}
	

	/**
	 * 批量删除公告类型
	 * @throws TaoException 
	 * @Param idArr 主键数组
	 * */
	@RequestMapping("delete.json")
	@ResponseBody
	public Result delete(
		@RequestParam(value = "idArr") String[] idArr) throws TaoException {
		
		tipTypeService.delete(idArr);
		
		return Result.success();
		
	}

}
