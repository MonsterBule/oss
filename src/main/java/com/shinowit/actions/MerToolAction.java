package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.GB.GB2Alpha;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-10.
 */
public class MerToolAction extends ActionSupport {
    GB2Alpha gb2Alpha = new GB2Alpha();
    @Resource
    private BaseDAO<TMeMerchandiseInfo> tmdao;
    private TMeMerchandiseInfo tm;
    private boolean success;
    private String mag;
    private String list;
    private boolean ishave;

    public String insert() {
        try {
            if ((tmdao.findByHql1("from  TMeMerchandiseInfo u where u.merchandiseName =?", tm.getMerchandiseName()).size() > 0) || (tmdao.findByHql1("from  TMeMerchandiseInfo u where u.merchandiseId =?", tm.getMerchandiseId()).size() > 0)) {
                setSuccess(true);
                setIshave(false);
                setMag("该商品或该商品编码已存在");
                return SUCCESS;
            } else {
                tm.setMerchandiseAb(gb2Alpha.String2Alpha(tm.getMerchandiseName()));
                tmdao.insert(tm);
                setSuccess(true);
                setIshave(true);
                setMag("输入成功");

                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setSuccess(true);
        setIshave(false);
        setMag("输入失败");

        return SUCCESS;
    }

    public String delete() {
        String[] aa = list.split(",");
        try {
            for (String a : aa) {
                tmdao.executeHQL("delete TMeMerchandiseInfo where merchandiseId=?", a);
            }
            setSuccess(true);
            setIshave(true);
            setMag("删除成功");
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setSuccess(true);
        setIshave(false);
        setMag("删除失败");
        return SUCCESS;

    }

    public String update() {
        try {
            if (tmdao.findByHql1("from TMeMerchandiseInfo where merchandiseName=? and merchandiseId !=?", tm.getMerchandiseName(), tm.getMerchandiseId()).size() > 0) {

            }
            tm.setMerchandiseAb(gb2Alpha.String2Alpha(tm.getMerchandiseName()));
            tmdao.update(tm);
            setIshave(true);
            setMag("修改成功");
            setSuccess(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setIshave(false);
        setMag("修改失败");
        setSuccess(true);
        return SUCCESS;
    }

    public TMeMerchandiseInfo getTm() {
        return tm;
    }

    public void setTm(TMeMerchandiseInfo tm) {
        this.tm = tm;
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

    public String getList() {
        return list;
    }

    public void setList(String list) {
        this.list = list;
    }
}
