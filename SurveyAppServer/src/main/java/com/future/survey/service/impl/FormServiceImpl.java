package com.future.survey.service.impl;

import com.future.survey.dao.FormDao;
import com.future.survey.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FormServiceImpl implements FormService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<FormDao> findAllFormsById(int userId) {
        return jdbcTemplate.query("select * from forms where user_id = " + userId,
                new BeanPropertyRowMapper<>(FormDao.class));
    }

    @Override
    public List<Integer> insertNewForm(int userId) {
        //获取当前日期
        String now = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
        //新建条目
        jdbcTemplate.update("insert into forms values (null, ?, 0, null, \"New Survey\", ?)", userId, now);
        //查找刚刚新建条目的form_id并返回
        List<Integer> curFormId = new ArrayList<>();
        curFormId.add(findMaxFormIdByUserId(userId));
        return curFormId;
    }

    @Override
    public int findMaxFormIdByUserId(int userId) {
        int formId = jdbcTemplate.queryForObject("select max(form_id) from forms where user_id = ?",
                new Object[]{userId}, Integer.class);
        System.out.println(formId + " - findMaxFormIdByUserId()");
        return formId;
    }

    @Override
    public List<Integer> countResponsesByFormId(int formId) {
        List<Integer> res = new ArrayList<>();
        res.add(0);
        int count=0;
        try {
            count = jdbcTemplate.queryForObject("select count(*) from responses where form_id = ?",
                    new Object[]{formId}, Integer.class);
        } catch (DataAccessException e) {
            return res;
        }
        res.set(0, count);
        return res;
    }
}
