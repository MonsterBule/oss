package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-11-06.
 */
public class SupplierAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfo> tsdao;

    private List<TBaSupplierInfo> tslist;


    private int page;
    private int limit;
    private int rowcount;

    private String name;


    public String list() {
        List<Object> parms = new ArrayList<Object>();
        String sqllist = "from TBaSupplierInfo where 1=1";
        String sqlrow = "select count(*) from TBaSupplierInfo where 1=1";
        if ((null != name) && (name.trim().length() > 0)) {
            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }


            if ((name != null) && (name.trim().length() > 0)) {
                sqllist = sqllist + " and supplierName like ?";
                sqlrow = sqlrow + " and supplierName like ?";
                parms.add("%" + name + "%");
            }

        }
        rowcount = tsdao.queryRecordCount(sqlrow, parms.toArray());
        if (limit != 0) {
            if ((rowcount % limit == 0) && (rowcount / limit < page)) {
                page = page - 1;
            }
        }
        tslist = tsdao.queryForPage(sqllist, page, limit, parms.toArray());
        return SUCCESS;
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

    public List<TBaSupplierInfo> getTslist() {
        return tslist;
    }

    public void setTslist(List<TBaSupplierInfo> tslist) {
        this.tslist = tslist;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
