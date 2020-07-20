package com.future.survey.controller;

import com.future.survey.dao.AnswerDao;
import com.future.survey.service.impl.ResponseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
public class ResponseController {

    @Autowired
    ResponseServiceImpl responseService;

    @ResponseBody
    @PostMapping("/response/{formId}")
    Boolean getResponse(@PathVariable int formId, @RequestBody List<AnswerDao> answers, @CookieValue("mail") String mail) {
        System.out.println("formId: "+formId);
        System.out.println(answers);
        System.out.println("mail: "+mail);
        int respId = responseService.addResponseByFormIdAndMail(formId, mail);
        return responseService.addAnswers(answers, respId, formId);
    }
}
