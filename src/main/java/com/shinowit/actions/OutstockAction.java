package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockInfo;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/11/24.
 */
public class OutstockAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockInfo> tosdao;
    private List<TMeOutStockInfo> toslist;
    private int page;
    private int limit;
    private int rowcount;
    private String name;

    public String list() {
        String sqllist = "from TMeOutStockInfo where 1=1";
        String sqlrow = "select count(*) from TMeOutStockInfo where 1=1";
        List<Object> parms = new ArrayList<Object>();
        if ((null != name) && (name.trim().length() > 0)) {

            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (Exception e) {
                e.printStackTrace();
            }
            parms.add("%" + name + "%");
            sqllist += "and handler like ?";
            sqlrow += "and handler like ?";
        }
        rowcount = tosdao.queryRecordCount(sqlrow, parms.toArray());
        if ((rowcount % limit == 0) && (rowcount / limit < page)) {
            page = page - 1;

        }
        toslist = tosdao.queryForPage(sqllist, page, limit, parms.toArray());

        return SUCCESS;
    }

    public List<TMeOutStockInfo> getToslist() {
        return toslist;
    }

    public void setToslist(List<TMeOutStockInfo> toslist) {
        this.toslist = toslist;
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
