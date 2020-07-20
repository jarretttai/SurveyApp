package com.future.survey.service.impl;

import com.future.survey.dao.AccountDao;
import com.future.survey.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<AccountDao> findAllAccounts(){
        return jdbcTemplate.query("select * from accounts",
                new BeanPropertyRowMapper(AccountDao.class));
    }

    public String findPwdByMail(String mail){
        return jdbcTemplate.queryForObject("select password from accounts where mail=?",
                new Object[]{mail}, String.class);
    }

    public void addAccount(AccountDao account){
        jdbcTemplate.update("insert into accounts values(null, ?, ?, ?, 1)",
                account.getMail(), account.getPassword(), account.getUsername());
    }

    public List<AccountDao> findAccountByMail(String mail){
        return jdbcTemplate.query("select * from accounts where mail = ?",
                new Object[] {mail}, new BeanPropertyRowMapper(AccountDao.class));
    }

    public List<AccountDao> findAccountByUsername(String username){
        return jdbcTemplate.query("select * from accounts where username = ?",
                new Object[] {username}, new BeanPropertyRowMapper(AccountDao.class));
    }


}
