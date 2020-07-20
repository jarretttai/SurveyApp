package com.future.survey.controller;

import com.future.survey.dao.FormDao;
import com.future.survey.service.impl.AccountServiceImpl;
import com.future.survey.service.impl.FormServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
public class FormController {

    @Autowired
    AccountServiceImpl accountServiceImpl;

    @Autowired
    FormServiceImpl formServiceImpl;

    @ResponseBody
    @GetMapping("/forms")
    List<FormDao> getAllForms(@CookieValue("mail") String mail){
        int userId = accountServiceImpl.findAccountByMail(mail).get(0).getUserId();
//        System.out.println(userId);
//        System.out.println(formServiceImpl.findAllFormsById(userId));
        return formServiceImpl.findAllFormsById(userId);
    }

    @ResponseBody
    @PostMapping("/forms")
    List<Integer> createNewForm(@CookieValue("mail") String mail){
        int userId = accountServiceImpl.findAccountByMail(mail).get(0).getUserId();
        System.out.println(userId);
        return formServiceImpl.insertNewForm(userId);
    }

    @ResponseBody
    @GetMapping("/responses/count/{formId}")
    List<Integer> getResponsesCount(@PathVariable int formId) {
        return formServiceImpl.countResponsesByFormId(formId);
    }
}
