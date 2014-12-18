package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.Md5.MD5;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2014-11-06.
 */
public class OperToolAction extends ActionSupport {

    HttpServletRequest request = ServletActionContext.getRequest();
    HttpSession session = request.getSession();
    @Resource
    private BaseDAO<TAuOperInfo> todao;
    @Resource
    private JdbcTemplate jt;
    private boolean success;
    private String mag;
    private boolean ishave;
    private TAuOperInfo to;
    private String pass;
    private String Stringtext;

    public String operinsert() {
        TAuOperInfo user = (TAuOperInfo) ServletActionContext.getRequest().getSession().getAttribute("now_user");
        if (!user.getState()) {

            setMag("该用户没有操作权限");
            setSuccess(true);
            setIshave(false);
            return SUCCESS;
        }
        try {
            if ((todao.findByHql1("from TAuOperInfo where operName=? ", to.getOperName()).size() > 0) || (todao.findByHql1("from TAuOperInfo where operId =?", to.getOperId()).size() > 0)) {

                setSuccess(true);
                setIshave(false);
                setMag("该操作员已存在");
                return SUCCESS;
            } else {
                to.setPwd(MD5.string2MD5(to.getPwd()));
                todao.insert(to);
                setMag("创建成功");
                setSuccess(true);
                setIshave(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setMag("创建失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;

    }

    public String operdelete() {

        TAuOperInfo user = (TAuOperInfo) ServletActionContext.getRequest().getSession().getAttribute("now_user");
        if (!user.getState()) {

            setMag("该用户没有操作权限");
            setSuccess(true);
            setIshave(false);
            return SUCCESS;
        }

        try {
            todao.delete(to);
            setMag("删除成功！！！");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        todao.delete(to);
        setMag("删除失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;


    }

    public String operupdate() {
        try {
            if (todao.findByHql1("from TAuOperInfo where operName=? nad operId !=?", to.getOperName(), to.getOperId()).size() > 0) {

                setSuccess(true);
                setIshave(false);
                setMag("该操作员已存在");
                return SUCCESS;
            } else {
                todao.update(to);
                setMag("修改成功，请刷新页面！");
                setSuccess(true);
                setIshave(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("修改失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public String updatapwd() {

        setMag("修改失败");
        setIshave(false);
        setSuccess(true);
        try {
            if (session.getAttribute("rand").equals(Stringtext)) {
                String pwdtext = MD5.string2MD5(to.getPwd());

                if ((jt.queryForList("select * from TAu_OperInfo where OperName = ? and Pwd = ?", to.getOperName(), pwdtext)).size() > 0) {

                    to.setPwd(MD5.string2MD5(pass));
                    jt.update("update TAu_OperInfo set Pwd =? where OperName=?", to.getPwd(), to.getOperName());

                    setMag("修改成功");
                    setIshave(true);
                    setSuccess(true);
                } else {
                    setMag("修改失败，输入密码不正确");
                    setIshave(true);
                    setSuccess(true);
                }

            } else {
                setMag("验证码错误");
                setSuccess(true);
                setIshave(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMag() {
        return mag;
    }

    public void setMag(String mag) {
        this.mag = mag;
    }

    public boolean isIshave() {
        return ishave;
    }

    public void setIshave(boolean ishave) {
        this.ishave = ishave;
    }

    public TAuOperInfo getTo() {
        return to;
    }

    public void setTo(TAuOperInfo to) {
        this.to = to;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getStringtext() {
        return Stringtext;
    }

    public void setStringtext(String stringtext) {
        Stringtext = stringtext;
    }
}
