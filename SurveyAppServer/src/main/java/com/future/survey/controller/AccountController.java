package com.future.survey.controller;

import com.future.survey.dao.AccountDao;
import com.future.survey.service.impl.AccountServiceImpl;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AccountController extends AccountServiceImpl {

    @ResponseBody
    @RequestMapping("/accounts")
    public List<AccountDao> findAll() {
        return findAllAccounts();
    }

    @ResponseBody
    @RequestMapping("/login")
    Map<String, String> validate(@RequestBody AccountDao req) {
//        System.out.println(req.toString());
        Map<String, String> res = new HashMap<>();
        if (findPwdByMail(req.getMail()).equals(req.getPassword())){
            res.put("mail", req.getMail());
        }
        return res;
    }

    @RequestMapping("/signup")
    Map<String, String> register(@RequestBody AccountDao req) {
//        System.out.println(req.toString());
        Map<String, String> res = new HashMap<>();
        List<AccountDao> mailQuery = findAccountByMail(req.getMail());
        List<AccountDao> nameQuery = findAccountByUsername(req.getUsername());
        if (!mailQuery.isEmpty()){
            res.put("occupied", "mail");
        }
        else if (!nameQuery.isEmpty()){
            res.put("occupied", "username");
        }
        else {
            System.out.println("add an account");
        }
        return res;
    }


}
