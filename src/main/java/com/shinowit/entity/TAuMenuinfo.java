package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/12/6.
 */
@Entity
@Table(name = "TAu_Menuinfo", schema = "dbo", catalog = "oss")
public class TAuMenuinfo {
    private int menuId;
    private Integer parentid;
    private String src;
    private String title;
    private String remark;
    private String tag;
    private String js;

    @Id
    @Column(name = "MenuID")
    public int getMenuId() {
        return menuId;
    }

    public void setMenuId(int menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "parentid")
    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    @Basic
    @Column(name = "src")
    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Basic
    @Column(name = "tag")
    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Basic
    @Column(name = "js")
    public String getJs() {
        return js;
    }

    public void setJs(String js) {
        this.js = js;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuMenuinfo that = (TAuMenuinfo) o;

        if (menuId != that.menuId) return false;
        if (js != null ? !js.equals(that.js) : that.js != null) return false;
        if (parentid != null ? !parentid.equals(that.parentid) : that.parentid != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (src != null ? !src.equals(that.src) : that.src != null) return false;
        if (tag != null ? !tag.equals(that.tag) : that.tag != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = menuId;
        result = 31 * result + (parentid != null ? parentid.hashCode() : 0);
        result = 31 * result + (src != null ? src.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        result = 31 * result + (tag != null ? tag.hashCode() : 0);
        result = 31 * result + (js != null ? js.hashCode() : 0);
        return result;
    }


}
