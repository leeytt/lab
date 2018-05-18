package cn.leeytt.lab.action.home;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.leeytt.lab.service.TipService;
import cn.leeytt.lab.service.TipTypeService;
import cn.leeytt.lab.view.Tip;

@Controller
@RequestMapping("home")
public class indexAction {
	
	@Autowired
	private TipService tipService;
	@Autowired
	private TipTypeService tipTypeService;
	
	/**
	 * 查询所有公告（正常）
	 * */
	@RequestMapping("index.action")
	public String listNormal(ModelMap map,
			@RequestParam(value="pageNum", defaultValue="1") int pageNum,
			@RequestParam(value="pageSize", defaultValue="2") int pageSize) {
		
		Map<String, Object> param =new HashMap<String, Object>();
		
		param.put("recStatus", "1");
		
		PageHelper.startPage(pageNum, pageSize);
		List<Tip> list = tipService.list(param);
		PageInfo<Tip> pageInfo = new PageInfo<Tip>(list);
		map.put("pageInfo", pageInfo);
		
		//查询所有公告类型
		map.put("typeList", tipTypeService.list());

		return "home/index";
	}
}
