package cn.leeytt.lab.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.leeytt.lab.service.LabDoorService;
import cn.leeytt.lab.service.LabService;
import cn.leeytt.lab.service.LabTypeService;
import cn.leeytt.lab.view.Lab;
import cn.leeytt.lab.view.Result;

@Controller
@RequestMapping("Lab")
public class LabAction {
	
	@Autowired
	private LabService labService;
	@Autowired
	private LabTypeService labTypeService;
	@Autowired
	private LabDoorService labDoorService;
	
	/**
	 * 查询所有实验室（正常）
	 * */
	@RequestMapping("list_Lab_normal.action")
	public String listNormal(ModelMap map,
			@RequestParam(required = false, value = "labType_Id") String labType_Id,
			@RequestParam(required = false, value = "labDoor_Id") String labDoor_Id,
			@RequestParam(required = false, value = "startDate") String startDate,
			@RequestParam(required = false, value = "endDate") String endDate,
			@RequestParam(required = false, value = "keyWord") String keyWord,
			@RequestParam(value="pageNum", defaultValue="1") int pageNum,
			@RequestParam(value="pageSize", defaultValue="10") int pageSize) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("labType_Id", labType_Id);
		param.put("labDoor_Id", labDoor_Id);
		param.put("startDate", startDate);
		param.put("endDate", endDate);
		if (!StringUtils.isEmpty(keyWord)) {
			param.put("keyWord", "%"+keyWord.trim()+"%");
		}
		param.put("recStatus", "1");
		
		// pageHelper分页插件
		// 只需要在查询之前调用，传入当前页码，以及每一页显示多少条
		PageHelper.startPage(pageNum, pageSize);
		List<Lab> list = labService.list(param);
		PageInfo<Lab> pageInfo = new PageInfo<Lab>(list);
		map.put("pageInfo", pageInfo);
		
		//查询所有实验室类型
		map.put("typeList", labTypeService.list());
		
		//查询所有实验室门牌号
		map.put("doorList", labDoorService.list());
		
		map.put("labType_Id", labType_Id);
		map.put("labDoor_Id", labDoor_Id);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("keyWord", keyWord);

		
		return "admin/Lab/list_Lab_normal";
	}
	
	/**
	 * 查询所有实验室（回收站）
	 * */
	@RequestMapping("list_Lab_recycle.action")
	public String listRecycle(ModelMap map,
			@RequestParam(required = false, value = "labType_Id") String labType_Id,
			@RequestParam(required = false, value = "labDoor_Id") String labDoor_Id,
			@RequestParam(required = false, value = "startDate") String startDate,
			@RequestParam(required = false, value = "endDate") String endDate,
			@RequestParam(required = false, value = "keyWord") String keyWord,
			@RequestParam(value="pageNum", defaultValue="1") int pageNum,
			@RequestParam(value="pageSize", defaultValue="10") int pageSize) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("labType_Id", labType_Id);
		param.put("labDoor_Id", labDoor_Id);
		param.put("startDate", startDate);
		param.put("endDate", endDate);
		if (!StringUtils.isEmpty(keyWord)) {
			param.put("keyWord", "%"+keyWord.trim()+"%");
		}
		param.put("recStatus", "0");
		
		// pageHelper分页插件
		// 只需要在查询之前调用，传入当前页码，以及每一页显示多少条
		PageHelper.startPage(pageNum, pageSize);
		List<Lab> list = labService.list(param);
		PageInfo<Lab> pageInfo = new PageInfo<Lab>(list);
		map.put("pageInfo", pageInfo);
		
		//查询所有实验室类型
		map.put("typeList", labTypeService.list());
		//查询所有实验室门牌号
		map.put("doorList", labDoorService.list());
		
		map.put("labType_Id", labType_Id);
		map.put("labDoor_Id", labDoor_Id);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("keyWord", keyWord);

		
		return "admin/Lab/list_Lab_recycle";
	}
	
	
	/**
	 * 实验室编辑
	 * */
	@RequestMapping("edit.action")
	public String edit(ModelMap map,
			@RequestParam(required = false, value = "lab_Id") String lab_Id) {
		
		//查询单个实验室的信息
		if (!StringUtils.isEmpty(lab_Id)) {
			Lab lab = labService.selectById(lab_Id);
			map.put("lab", lab);
		}

		//查询所有实验室类型
		map.put("typeList", labTypeService.list());
		//查询所有实验室门牌号
		map.put("doorList", labDoorService.list());
		
		map.put("lab_Id", lab_Id);
		return "admin/Lab/edit";
	}
	
	
	/**
	 * 实验室保存
	 * */
	@RequestMapping("save.json")
	@ResponseBody
	public Result save(Lab lab) {
		
		labService.save(lab);
		
		return Result.success();
	}
	
	/**
	 * 批量移动实验室到某个类型
	 * */
	@RequestMapping("move.json")
	@ResponseBody
	public Result move(
			@RequestParam(value = "idArr") String[] idArr,
			@RequestParam(value = "labType_Id") String labType_Id) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("idArr", idArr);
		param.put("labType_Id", labType_Id);
		
		labService.batchUpdateStatus(param);
		
		return Result.success();
	}
	
	/**
	 * 批量更新状态（回收站：0、还原：1）
	 * */
	@RequestMapping("update_status.json")
	@ResponseBody
	public Result updateStatus(
			@RequestParam(value = "idArr") String[] idArr,
			@RequestParam(value = "recStatus") String recStatus) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("idArr", idArr);
		param.put("recStatus", recStatus);
		
		labService.batchUpdateStatus(param);
		
		return Result.success();
	}
	
	/**
	 * 批量彻底删除
	 * */
	@RequestMapping("delete.json")
	@ResponseBody
	public Result delete(
			@RequestParam(value = "idArr") String[] idArr) {
		
		labService.batchDelete(idArr);
		
		return Result.success();
	}
}
