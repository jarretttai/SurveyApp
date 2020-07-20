package com.future.survey.service.impl;

import com.future.survey.dao.AnswerDao;
import com.future.survey.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ResponseServiceImpl implements ResponseService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int findMaxRespIdByFormId(int formId) {

        try {
            return jdbcTemplate.queryForObject("select max(resp_id) from responses where form_id = ?",
                    new Object[] {formId}, Integer.class);
        } catch (Exception e) {
            return 0;
        }

    }

    @Override
    public int addResponseByFormIdAndMail(int formId, String mail) {
        //获取可用的resp_id
        int respId = findMaxRespIdByFormId(formId) + 1;
        System.out.println(respId);
        //获取当前日期
        String now = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
        //插入
        jdbcTemplate.update("insert into responses values (?, ?, ?, ?)", respId, formId, now, mail);
        return respId;
    }

    @Override
    public Boolean addAnswers(List<AnswerDao> answers, int respId, int formId) {

        for (int i=0; i<answers.size(); i++) {
            AnswerDao ans = answers.get(i);
            jdbcTemplate.update("insert into answers values (?, ?, ?, ?)",
                    respId, formId, ans.getQstnId(), ans.getContent());
        }
        return true;
    }


}
