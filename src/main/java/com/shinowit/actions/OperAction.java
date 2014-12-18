package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfo;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014-11-12.
 */
public class OperAction extends ActionSupport {
    @Resource
    private BaseDAO<TAuOperInfo> todao;
    @Resource
    private JdbcTemplate jt;
    private List<Map<String, Object>> rolename;
    private List<TAuOperInfo> tolist;
    private String operid;
    private String name;
    private int page;
    private int limit;
    private int rowcount;

    public String list() {
        List<Object> parms = new ArrayList<Object>();
        String sql1 = "from TAuOperInfo where 1=1";
        String sql2 = "select count(*) from TAuOperInfo where 1=1";
        if ((null != name) && (name.trim().length() > 0)) {
            try {
                byte[] bb = name.getBytes("ISO-8859-1");
                name = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sql1 += " and operName like ?";
            sql2 += " and operName like ?";
            parms.add("%" + name + "%");
        }
        rowcount = todao.queryRecordCount(sql2, parms.toArray());
        if (limit != 0) {
            if ((rowcount % limit == 0) && (rowcount / limit < page)) {
                page = page - 1;
            }
        }
        tolist = todao.queryForPage(sql1, page, limit, parms.toArray());
        return SUCCESS;
    }

    public String usernamelist() {
        if (null != operid) {
            rolename = jt.queryForList("select a.RoleName from TAu_RoleInfo a inner join TAu_OperInfo b on a.RoleID=b.RoleID where b.OperName =?", operid);
            return SUCCESS;
        }
        tolist = todao.findByHql1("from TAuOperInfo");
        return SUCCESS;
    }

    public String role() {
        if (null != operid) {
            tolist = todao.findByHql1("from TAuOperInfo where operId=?", operid);

            return SUCCESS;
        }
        return SUCCESS;
    }


    public List<TAuOperInfo> getTolist() {
        return tolist;
    }

    public void setTolist(List<TAuOperInfo> tolist) {
        this.tolist = tolist;
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

    public String getOperid() {
        return operid;
    }

    public void setOperid(String operid) {
        this.operid = operid;
    }

    public List<Map<String, Object>> getRolename() {
        return rolename;
    }

    public void setRolename(List<Map<String, Object>> rolename) {
        this.rolename = rolename;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
