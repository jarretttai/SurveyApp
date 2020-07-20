package com.future.survey.service.impl;

import com.future.survey.dao.OptionDao;
import com.future.survey.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionServiceImpl implements OptionService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<OptionDao> findALlOptionsByFormIdAndQstnId(int formId, int qstnId){
        return jdbcTemplate.query("select * from options where form_id = ? and qstn_id = ?",
                new BeanPropertyRowMapper<>(OptionDao.class), formId, qstnId);
    }

    @Override
    public Boolean updateOptions(int formId, int qstnId, List<OptionDao> options) {
        jdbcTemplate.update("delete from options where form_id = ? and qstn_id = ?", formId, qstnId);
        for (int i=0; i<options.size(); i++) {
            OptionDao opt = options.get(i);
            jdbcTemplate.update("insert into options values(?, ?, ?, ?, ?)",
                    formId, opt.getQstnId(), opt.getOptId(), opt.getContent(), opt.getCascadeQstnId());
        }
        jdbcTemplate.update("delete from questions where form_id = ? and qstn_id = ? and qstn_id > ?",
                formId, qstnId, options.size());
        return true;
    }
}
