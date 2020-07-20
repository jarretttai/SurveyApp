package com.future.survey.service;

import com.future.survey.dao.AccountDao;

import java.util.List;

public interface AccountService {

    List<AccountDao> findAllAccounts();

    String findPwdByMail(String mail);

    void addAccount(AccountDao account);

    List<AccountDao> findAccountByMail(String mail);

    List<AccountDao> findAccountByUsername(String username);


}
