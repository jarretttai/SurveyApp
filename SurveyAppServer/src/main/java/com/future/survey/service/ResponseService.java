package com.future.survey.service;

import com.future.survey.dao.AnswerDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ResponseService {

    int findMaxRespIdByFormId(int formId);

    int addResponseByFormIdAndMail(int formId, String mail);

    Boolean addAnswers(List<AnswerDao> answers, int respId, int formId);

}
