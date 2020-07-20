package com.future.survey.service;

import com.future.survey.dao.OptionDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OptionService {

    List<OptionDao> findALlOptionsByFormIdAndQstnId(int formId, int qstnId);

    Boolean updateOptions(int formId, int qstnId, List<OptionDao> options);
}
