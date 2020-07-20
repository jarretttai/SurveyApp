package com.future.survey.controller;

import com.future.survey.dao.AccountDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.sql.DataSource;
import java.util.List;

/**
 * 数据实体类 domain/entity：

 * 数据接口访问层 dao：
 *
 * 数据服务接口层 service：
 *
 * 数据服务接口实现层 service.impl
 *
 * 前端控制器层 controller
 */
@Controller
public class HelloController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ResponseBody
    @RequestMapping("/hello")
    public boolean hello() {


        List<AccountDao> accounts =  jdbcTemplate.query("select * from accounts", new BeanPropertyRowMapper(AccountDao.class));


//        return accounts.get(0).toString();
        return false;
    }
}
