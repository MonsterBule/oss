package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfo;
import com.shinowit.entity.TMeProStatusInfo;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-06.
 */
public class InseupdateAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeMerchandiseCInfo> tmcdao;
    @Resource
    private BaseDAO<TMeProStatusInfo> tpsdao;
    @Resource
    private BaseDAO<TMeUnitInfo> tudao;
    private TMeMerchandiseCInfo tmc;
    private TMeProStatusInfo tps;
    private TMeUnitInfo tu;
    private boolean success;
    private boolean ishave;
    private String mag;

    //商品类别信息
    public String insertmc() {
        try {
            if (tmcdao.findByHql1(" from TMeMerchandiseCInfo where merchandiseCName=?", tmc.getMerchandiseCName()).size() > 0) {
                setMag("该商品类别已存在");
                setIshave(false);
                setSuccess(true);
                return SUCCESS;
            } else {
                setIshave(true);
                setSuccess(true);
                setMag("添加成功");
                tmcdao.insert(tmc);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        setIshave(false);
        setSuccess(true);
        setMag("添加失败");
        return SUCCESS;
    }

    public String updatemc() {
        try {
            if (tpsdao.findByHql1("from TMeMerchandiseCInfo where merchandiseCName=? and merchandiseCid != ?", tmc.getMerchandiseCName(), tmc.getMerchandiseCid()).size() > 0) {
                setMag("该类别名称已存在");
                setSuccess(true);
                setIshave(false);
                return SUCCESS;
            }
            tmcdao.update(tmc);
            setMag("更新成功");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("更新失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public String deletemc() {
        try {
            tmcdao.delete(tmc);
            setMag("删除成功");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        tmcdao.delete(tmc);
        setMag("删除失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    //促销状态字典信息
    public String insertps() {
        try {
            if (tpsdao.findByHql1("from TMeProStatusInfo where proStatusName =?", tps.getProStatusName()).size() > 0) {
                setMag("该商品促销状态已存在");
                setIshave(false);
                setSuccess(true);
                return SUCCESS;
            } else {
                setIshave(true);
                setSuccess(true);
                setMag("添加成功");
                tpsdao.insert(tps);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setIshave(false);
        setSuccess(true);
        setMag("添加失败");
        return SUCCESS;
    }

    public String deleteps() {
        try {
            tpsdao.delete(tps);
            setMag("删除成功");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("删除失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public String updateps() {
        try {
            if (tpsdao.findByHql1("from TMeProStatusInfo where proStatusName=? and proStatusId != ?", tps.getProStatusName(), tps.getProStatusId()).size() > 0) {
                setMag("该促销状态名称已存在");
                setSuccess(true);
                setIshave(false);
                return SUCCESS;
            }
            tpsdao.update(tps);
            setMag("更新成功");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("更新失败");
        setSuccess(true);
        setIshave(false);

        return SUCCESS;
    }

    //商品单位字典信息
    public String inserttu() {
        try {
            if (tudao.findByHql1("from  TMeUnitInfo where name=? ", tu.getName()).size() > 0) {
                setMag("该商品单位已存在");
                setIshave(false);
                setSuccess(true);
                return SUCCESS;
            } else {
                setIshave(true);
                setSuccess(true);
                setMag("添加成功");
                tudao.insert(tu);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setIshave(false);
        setSuccess(true);
        setMag("添加失败");
        return SUCCESS;
    }

    public String updateu() {
        try {
            if (tpsdao.findByHql1("from TMeUnitInfo where name=? and unitId != ?", tu.getName(), tu.getUnitId()).size() > 0) {
                setMag("该单位名称已存在");
                setSuccess(true);
                setIshave(false);
                return SUCCESS;
            }
            tudao.update(tu);
            setMag("更新成功");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("更新失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public String deleteu() {
        try {
            tudao.delete(tu);
            setMag("删除成功");
            setSuccess(true);
            setIshave(true);
            return SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
        }
        setMag("删除失败");
        setSuccess(true);
        setIshave(false);
        return SUCCESS;
    }

    public TMeMerchandiseCInfo getTmc() {
        return tmc;
    }

    public void setTmc(TMeMerchandiseCInfo tmc) {
        this.tmc = tmc;
    }

    public TMeProStatusInfo getTps() {
        return tps;
    }

    public void setTps(TMeProStatusInfo tps) {
        this.tps = tps;
    }

    public TMeUnitInfo getTu() {
        return tu;
    }

    public void setTu(TMeUnitInfo tu) {
        this.tu = tu;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isIshave() {
        return ishave;
    }

    public void setIshave(boolean ishave) {
        this.ishave = ishave;
    }

    public String getMag() {
        return mag;
    }

    public void setMag(String mag) {
        this.mag = mag;
    }
}
