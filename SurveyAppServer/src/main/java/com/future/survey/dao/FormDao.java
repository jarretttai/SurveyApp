package com.future.survey.dao;

import org.springframework.stereotype.Repository;

@Repository
public class FormDao {
    int formId;
    int userId;
    String permission;
    String description;
    String title;
    String date;

    @Override
    public String toString() {
        return "FormDao{" +
                "formId=" + formId +
                ", userId=" + userId +
                ", permission='" + permission + '\'' +
                ", description='" + description + '\'' +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

    public int getFormId() {
        return formId;
    }

    public void setFormId(int formId) {
        this.formId = formId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
