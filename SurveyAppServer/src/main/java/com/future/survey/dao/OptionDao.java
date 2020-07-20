package com.future.survey.dao;

import org.springframework.stereotype.Repository;

@Repository
public class OptionDao {
    int formId;
    int qstnId;
    int optId;
    String content;
    Integer cascadeQstnId;

    @Override
    public String toString() {
        return "OptionDao{" +
                "formId=" + formId +
                ", qstnId='" + qstnId + '\'' +
                ", optId='" + optId + '\'' +
                ", content='" + content + '\'' +
                ", cascadeQstnId='" + cascadeQstnId + '\'' +
                '}';
    }

    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;
    }

    public int getQstnId() {
        return qstnId;
    }

    public void setQstnId(int qstnId) {
        this.qstnId = qstnId;
    }

    public int getOptId() {
        return optId;
    }

    public void setOptId(int optId) {
        this.optId = optId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getCascadeQstnId() {
        return cascadeQstnId;
    }

    public void setCascadeQstnId(Integer cascadeQstnId) {
        this.cascadeQstnId = cascadeQstnId;
    }
}
