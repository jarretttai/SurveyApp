package com.future.survey.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Service
public interface StatisticService {

    List<Integer> countAnswersOfOptions(int formId, int qstnId);

    Map<String, Double> countAnswersOfNumber(int formId, int qstnId);

    List<Integer> countAnswersOfScale(int formId, int qstnId);

    List<String> findAnswersOfText(int formId, int qstnId);
}
