package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.Md5.MD5;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */
public class LoginAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfo> todao;
    private List<TAuOperInfo> tolist;
    private TAuOperInfo to;
    private TAuOperInfo user;
    private boolean success;
    private String mag;
    private boolean ishave;
    private String Stringtext;

    public String check() {
        String text = (String) ServletActionContext.getRequest().getSession().getAttribute("rand");
        String pass = MD5.string2MD5(to.getPwd());
        tolist = todao.findBySql1("select * from TAu_OperInfo where OperName=? and Pwd=?", TAuOperInfo.class, to.getOperName(), pass);
        if (to.getOperName() != null || to.getPwd() != null) {
            for (TAuOperInfo T : tolist) {
                if ((to.getOperName().equals(T.getOperName())) && (pass.equals(T.getPwd()))) {
                    if (!text.equals(Stringtext)) {
                        setMag("请输入正确的验证码");
                        setIshave(false);
                        setSuccess(true);
                        return SUCCESS;
                    }
                    ServletActionContext.getRequest().getSession(true).setAttribute("user", to);
                    setSuccess(true);
                    setIshave(true);
                    setMag("登入成功");
                    return SUCCESS;
                } else {
                    setMag("请输入正确的操作员和密码");
                    setSuccess(true);
                    setIshave(false);
                    return SUCCESS;
                }
            }
        }
        setMag("请输入操作员和密码");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public List<TAuOperInfo> getTolist() {
        return tolist;
    }

    public void setTolist(List<TAuOperInfo> tolist) {
        this.tolist = tolist;
    }

    public TAuOperInfo getTo() {
        return to;
    }

    public void setTo(TAuOperInfo to) {
        this.to = to;
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

    public String getStringtext() {
        return Stringtext;
    }

    public void setStringtext(String stringtext) {
        Stringtext = stringtext;
    }

    public TAuOperInfo getUser() {
        return user;
    }

    public void setUser(TAuOperInfo user) {
        this.user = user;
    }
}
