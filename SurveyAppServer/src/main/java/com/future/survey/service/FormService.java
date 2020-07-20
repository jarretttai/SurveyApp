package com.future.survey.service;

import com.future.survey.dao.FormDao;

import java.util.List;

public interface FormService {

    List<FormDao> findAllFormsById(int userId);

    List<Integer> insertNewForm(int userId);

    int findMaxFormIdByUserId(int userId);

    List<Integer> countResponsesByFormId(int formId);
}
