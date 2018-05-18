package cn.leeytt.lab.action;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.leeytt.lab.service.TipService;
import cn.leeytt.lab.service.TipTypeService;
import cn.leeytt.lab.view.Result;
import cn.leeytt.lab.view.Tip;

@Controller
@RequestMapping("Tip")
public class TipAction {
	
	@Autowired
	private TipService tipService;
	@Autowired
	private TipTypeService tipTypeService;
	
	/**
	 * 查询所有公告（正常）
	 * */
	@RequestMapping("list_Tip_normal.action")
	public String listNormal(ModelMap map,
			@RequestParam(required = false, value = "tipType_Id") String tipType_Id,
			@RequestParam(required = false, value = "startDate") String startDate,
			@RequestParam(required = false, value = "endDate") String endDate,
			@RequestParam(required = false, value = "keyWord") String keyWord,
			@RequestParam(value="pageNum", defaultValue="1") int pageNum,
			@RequestParam(value="pageSize", defaultValue="10") int pageSize) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("tipType_Id", tipType_Id);
		param.put("startDate", startDate);
		param.put("endDate", endDate);
		if (!StringUtils.isEmpty(keyWord)) {
			param.put("keyWord", "%"+keyWord.trim()+"%");
		}
		param.put("recStatus", "1");
		
		// pageHelper分页插件
		// 只需要在查询之前调用，传入当前页码，以及每一页显示多少条
		PageHelper.startPage(pageNum, pageSize);
		List<Tip> list = tipService.list(param);
		PageInfo<Tip> pageInfo = new PageInfo<Tip>(list);
		map.put("pageInfo", pageInfo);
		
		//查询所有公告类型
		map.put("typeList", tipTypeService.list());
		
		map.put("tipType_Id", tipType_Id);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("keyWord", keyWord);

		
		return "admin/Tip/list_Tip_normal";
	}
	
	/**
	 * 查询所有公告（回收站）
	 * */
	@RequestMapping("list_Tip_recycle.action")
	public String listRecycle(ModelMap map,
			@RequestParam(required = false, value = "tipType_Id") String tipType_Id,
			@RequestParam(required = false, value = "startDate") String startDate,
			@RequestParam(required = false, value = "endDate") String endDate,
			@RequestParam(required = false, value = "keyWord") String keyWord,
			@RequestParam(value="pageNum", defaultValue="1") int pageNum,
			@RequestParam(value="pageSize", defaultValue="10") int pageSize) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("tipType_Id", tipType_Id);
		param.put("startDate", startDate);
		param.put("endDate", endDate);
		if (!StringUtils.isEmpty(keyWord)) {
			param.put("keyWord", "%"+keyWord.trim()+"%");
		}
		param.put("recStatus", "0");
		
		// pageHelper分页插件
		// 只需要在查询之前调用，传入当前页码，以及每一页显示多少条
		PageHelper.startPage(pageNum, pageSize);
		List<Tip> list = tipService.list(param);
		PageInfo<Tip> pageInfo = new PageInfo<Tip>(list);
		map.put("pageInfo", pageInfo);
		
		//查询所有公告类型
		map.put("typeList", tipTypeService.list());
		
		map.put("tipType_Id", tipType_Id);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("keyWord", keyWord);

		
		return "admin/Tip/list_Tip_recycle";
	}
	
	
	/**
	 * 公告编辑
	 * */
	@RequestMapping("edit.action")
	public String edit(ModelMap map,
			@RequestParam(required = false, value = "tip_Id") String tip_Id) {
		
		//查询单个公告的信息
		if (!StringUtils.isEmpty(tip_Id)) {
			Tip tip = tipService.selectById(tip_Id);
			map.put("tip", tip);
		}

		//查询所有公告类型
		map.put("typeList", tipTypeService.list());
		
		map.put("tip_Id", tip_Id);
		return "admin/Tip/edit";
	}
	
	
	/**
	 * 公告保存
	 * */
	@RequestMapping("save.json")
	@ResponseBody
	public Result save(Tip tip) {
		
		tipService.save(tip);
		
		return Result.success();
	}
	
	/**
	 * 批量移动公告到某个类型
	 * */
	@RequestMapping("move.json")
	@ResponseBody
	public Result move(
			@RequestParam(value = "idArr") String[] idArr,
			@RequestParam(value = "tipType_Id") String tipType_Id) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		param.put("idArr", idArr);
		param.put("tipType_Id", tipType_Id);
		
		tipService.batchUpdateStatus(param);
		
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
		
		tipService.batchUpdateStatus(param);
		
		return Result.success();
	}
	
	/**
	 * 批量彻底删除
	 * */
	@RequestMapping("delete.json")
	@ResponseBody
	public Result delete(
			@RequestParam(value = "idArr") String[] idArr) {
		
		tipService.batchDelete(idArr);
		
		return Result.success();
	}
	
	/**
	 * 上传文件到磁盘（物理路径）
	 * @throws IOException 
	 */
	@RequestMapping("upload.json")
	@ResponseBody
	public Result upload(MultipartFile file, HttpServletRequest request) throws IOException {
		
		// 文件原名称
		String szFileName = file.getOriginalFilename();
		// 重命名后的文件名称
		String szNewFileName = "";
		// 根据日期自动创建3级目录
		String szDateFolder = "";
		
		// 上传文件
		if (file!=null && szFileName!=null && szFileName.length()>0) {
			Date date = new Date();
			szDateFolder = new SimpleDateFormat("yyyy/MM/dd").format(date);
			// 存储文件的物理路径
			String szFilePath = "D:\\upload\\" + szDateFolder;
			// 自动创建文件夹
			File f = new File(szFilePath);
			if (!f.exists()) {
				f.mkdirs();
			}
			
			// 新的文件名称
			szNewFileName = UUID.randomUUID() + szFileName.substring(szFileName.lastIndexOf("."));
			// 新文件
			File newFile = new File(szFilePath+"\\"+szNewFileName);
			
			// 将内存中的数据写入磁盘
			file.transferTo(newFile);
		}
		
		return Result.success().add("imgUrl", szDateFolder+"/"+szNewFileName);
	}
	
}
