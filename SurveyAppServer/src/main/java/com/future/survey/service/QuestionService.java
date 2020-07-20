package com.future.survey.service;

import com.future.survey.dao.QuestionDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {

    List<QuestionDao> findAllQuestionsByFormId(int formId);

    String findTitleByFormId(int formId);

    Boolean updateQuestionsByFormId(int formId, List<QuestionDao> questions);

    Boolean updateTitleByFormId(int formId, String title);
}
