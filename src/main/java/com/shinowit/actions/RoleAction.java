package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/12/8.
 */
public class RoleAction extends ActionSupport {
    @Resource
    private BaseDAO<TAuRoleInfo> role_dao;

    private List<TAuRoleInfo> role_list;
    private int page;
    private int limit;
    private int rowcount;
    private String name;

    public String list() {

        List<Object> parms = new ArrayList<Object>();
        String sqllist = "from TAuRoleInfo where 1=1";
        String sqlrow = "select count(*) from TAuRoleInfo where 1=1";
        if ((null != name) && (name.trim().length() > 0)) {
            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((name != null) && (name.trim().length() > 0)) {
                sqllist = sqllist + " and roleName like ?";
                sqlrow = sqlrow + " and roleName like ?";
                parms.add("%" + name + "%");
            }
        }
        rowcount = role_dao.queryRecordCount(sqlrow, parms.toArray());
        if (limit != 0) {
            if ((rowcount % limit == 0) && (rowcount / limit < page)) {
                page = page - 1;
            }
        }
        role_list = role_dao.queryForPage(sqllist, page, limit, parms.toArray());
        return SUCCESS;
    }


    public List<TAuRoleInfo> getRole_list() {
        return role_list;
    }

    public void setRole_list(List<TAuRoleInfo> role_list) {
        this.role_list = role_list;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRowcount() {
        return rowcount;
    }

    public void setRowcount(int rowcount) {
        this.rowcount = rowcount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
