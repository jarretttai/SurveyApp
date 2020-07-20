package com.future.survey.service.impl;

import com.future.survey.dao.OptionDao;
import com.future.survey.dao.QuestionDao;
import com.future.survey.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    OptionServiceImpl optionService;


    public List<QuestionDao> findAllQuestionsByFormId(int formId){
        List<QuestionDao> questions;
        questions = jdbcTemplate.query("select * from questions where form_id = ?",
                new BeanPropertyRowMapper<>(QuestionDao.class), formId);
        //填补选择题options部分
        for (int i=0; i<questions.size(); i++) {
            QuestionDao q = questions.get(i);
            if (!q.getType().equals("mc") && !q.getType().equals("cb")){
                q.setOptions(Collections.emptyList());
                continue;
            }
            List<OptionDao> options = optionService.findALlOptionsByFormIdAndQstnId(q.getFormId(), q.getQstnId());
            q.setOptions(options);
            questions.set(i, q);
        }
        return questions;
    }

    @Override
    public String findTitleByFormId(int formId) {
        return jdbcTemplate.queryForObject("select title from forms where form_id = ?",
                new Object[]{formId}, String.class);
    }

    @Override
    public Boolean updateQuestionsByFormId(int formId, List<QuestionDao> questions) {
        for (int i=0; i<questions.size(); i++) {
            QuestionDao q = questions.get(i);
            //如果是单选题或多选题，插入表options
            if (q.getType().equals("mc") || q.getType().equals("cb")) {
                //调用Option类函数
                optionService.updateOptions(formId, q.getQstnId(), q.getOptions());
            }
            jdbcTemplate.update("delete from questions where form_id = ? and qstn_id = ?", formId, q.getQstnId());
            //插入表questions
            jdbcTemplate.update("insert into questions values(?, ?, ?, ?)",
                    formId, q.getQstnId(), q.getType(), q.getContent());
        }
        jdbcTemplate.update("delete from questions where form_id = ? and qstn_id > ?", formId, questions.size());
        return true;
    }

    @Override
    public Boolean updateTitleByFormId(int formId, String title) {
        jdbcTemplate.update("update forms set title = ? where form_id = ?", title, formId);
        return true;
    }
}
