package com.future.survey.service.impl;

import com.future.survey.dao.AnswerDao;
import com.future.survey.dao.OptionDao;
import com.future.survey.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticServiceImpl implements StatisticService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Integer> countAnswersOfOptions(int formId, int qstnId) {
        List<AnswerDao> answers = jdbcTemplate.query("select * from answers where form_id = ? and qstn_id = ?",
                new BeanPropertyRowMapper<>(AnswerDao.class), formId, qstnId);
        List<OptionDao> options = jdbcTemplate.query("select * from options where form_id = ? and qstn_id = ?",
                new BeanPropertyRowMapper<>(OptionDao.class), formId, qstnId);
        List<Integer> counts = new ArrayList<Integer>();
        for (int i=0; i<options.size(); i++) counts.add(0);
        for (int i=0; i<answers.size(); i++) {
            String content = answers.get(i).getContent();
            String[] cont = content.split("&");
            for (int j=0; j<cont.length; j++) {
                for (int k=0; k<options.size(); k++) {
                    if (cont[j].equals(options.get(k).getContent()))
                        counts.set(k, counts.get(k)+1);
                }
            }
        }
        return counts;
    }

    @Override
    public Map<String, Double> countAnswersOfNumber(int formId, int qstnId) {
        List<AnswerDao> answers = jdbcTemplate.query("select * from answers where form_id = ? and qstn_id = ?",
                new BeanPropertyRowMapper<>(AnswerDao.class), formId, qstnId);
        Double min=null, max=null, avg=0.0, sum = 0.0;
        for (int i=0; i<answers.size(); i++) {
            Double temp = Double.parseDouble(answers.get(i).getContent());
            if (min == null || min > temp) min=temp;
            if (max == null || max < temp) max=temp;
            sum += temp;
        }
        Map<String, Double> stats = new HashMap<>();
        stats.put("max", max);
        stats.put("min", min);
        stats.put("average", sum/answers.size());
        return stats;
    }

    @Override
    public List<Integer> countAnswersOfScale(int formId, int qstnId) {
        List<Integer> stats = new ArrayList<>();
        for (int i=0; i<6; i++) stats.add(0);
        List<AnswerDao> answers = jdbcTemplate.query("select * from answers where form_id = ? and qstn_id = ?",
                new BeanPropertyRowMapper<>(AnswerDao.class), formId, qstnId);
        for (int i=0; i<answers.size(); i++) {
            int temp = Integer.parseInt(answers.get(i).getContent());
            stats.set(temp, stats.get(temp)+1);
        }
        return stats;
    }

    @Override
    public List<String> findAnswersOfText(int formId, int qstnId) {
        List<String> stats = new ArrayList<>();
        List<AnswerDao> answers = jdbcTemplate.query("select * from answers where form_id = ? and qstn_id = ?",
                new BeanPropertyRowMapper<>(AnswerDao.class), formId, qstnId);
        for (int i=0; i<answers.size(); i++) {
            stats.add(answers.get(i).getContent());
        }
        return stats;
    }
}
