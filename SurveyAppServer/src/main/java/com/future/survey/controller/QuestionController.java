package com.future.survey.controller;

import com.future.survey.dao.QuestionDao;
import com.future.survey.service.impl.QuestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    QuestionServiceImpl questionService;

    @ResponseBody
    @GetMapping("/questions/{formId}")
    List<QuestionDao> getAllQuestionsByFormId(@PathVariable int formId){ //接下来需要获取请求头中的formId
//        System.out.println(questionService.findAllQuestionsByFormId(formId));
        return questionService.findAllQuestionsByFormId(formId);
    }

    @ResponseBody
    @GetMapping("/title/{formId}")
    List<String> getTitleByFormId(@PathVariable int formId) {
        List<String> title = new ArrayList<>();
        title.add(questionService.findTitleByFormId(formId));
        return title;
    }

    @ResponseBody
    @PostMapping("/questions/{formId}")
    Boolean postAllQuestionsByFormId(@PathVariable int formId, @RequestBody List<QuestionDao> questions) {
//        System.out.println(questions);
        questionService.updateQuestionsByFormId(formId, questions);
        return true;
    }

    @ResponseBody
    @PostMapping("/title/{formId}")
    Boolean postTitleByFormId(@PathVariable int formId, @RequestBody String title) {
//        System.out.println(title.substring(1, title.length()-1));
        String realTitle = title.substring(1, title.length()-1);
        return questionService.updateTitleByFormId(formId, realTitle);
    }


}
