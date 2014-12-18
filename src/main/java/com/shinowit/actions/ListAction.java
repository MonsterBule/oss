package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfo;
import com.shinowit.entity.TMeProStatusInfo;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/11/14.
 */
public class ListAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfo> tmcdao;
    @Resource
    private BaseDAO<TMeProStatusInfo> tpsdao;
    @Resource
    private BaseDAO<TMeUnitInfo> tudao;
    private List<TMeMerchandiseCInfo> tmclist;
    private List<TMeProStatusInfo> tpslist;
    private List<TMeUnitInfo> tulist;

    private int page;
    private int limit;
    private int rowcount;
    private String name;

    public String listmc() {
        if ((null != name) && (name.trim().length() > 0)) {

            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            tmclist = tmcdao.queryForPage("from TMeMerchandiseCInfo u where u.merchandiseCName like \'%" + name + "%\'", page, limit);
            rowcount = tmcdao.queryRecordCount("select count(*) from TMeMerchandiseCInfo u where u.merchandiseCName like \'%" + name + "%\'");
            return SUCCESS;
        } else {
            tmclist = tmcdao.queryForPage("from TMeMerchandiseCInfo", page, limit);
            rowcount = tmcdao.queryRecordCount("select count(*) from TMeMerchandiseCInfo ");

            return SUCCESS;
        }
    }

    public String listps() {
        if (name != null) {
            tpslist = tpsdao.queryForPage("from TMeProStatusInfo u where u.proStatusName like \'%" + name + "%\'", page, limit);
            rowcount = tpsdao.queryRecordCount("select count(*) from TMeProStatusInfo u where u.proStatusName like \'%" + name + "%\'");
            return SUCCESS;
        } else {
            tpslist = tpsdao.queryForPage("from TMeProStatusInfo", page, limit);
            rowcount = tpsdao.queryRecordCount("select count(*) from TMeProStatusInfo ");

            return SUCCESS;
        }
    }

    public String listu() {
        if (name != null) {
            tulist = tudao.queryForPage("from TMeUnitInfo u where u.name like \'%" + name + "%\'", page, limit);
            rowcount = tudao.queryRecordCount("select count(*) from TMeUnitInfo u where u.name like \'%" + name + "%\'");
            return SUCCESS;
        } else {
            tulist = tudao.queryForPage("from TMeUnitInfo", page, limit);
            rowcount = tudao.queryRecordCount("select count(*) from TMeUnitInfo ");

            return SUCCESS;
        }
    }

    public List<TMeMerchandiseCInfo> getTmclist() {
        return tmclist;
    }

    public void setTmclist(List<TMeMerchandiseCInfo> tmclist) {
        this.tmclist = tmclist;
    }

    public List<TMeProStatusInfo> getTpslist() {
        return tpslist;
    }

    public void setTpslist(List<TMeProStatusInfo> tpslist) {
        this.tpslist = tpslist;
    }

    public List<TMeUnitInfo> getTulist() {
        return tulist;
    }

    public void setTulist(List<TMeUnitInfo> tulist) {
        this.tulist = tulist;
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
