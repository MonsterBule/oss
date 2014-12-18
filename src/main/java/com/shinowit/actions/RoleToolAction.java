package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuRoleInfo;
import com.shinowit.services.RoleAuthorization;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */
public class RoleToolAction extends ActionSupport {
    @Resource
    private BaseDAO<TAuRoleInfo> role_dao;
    @Resource
    private RoleAuthorization roleAuthorization;

    private List<TAuAuthorization> menuid;
    private TAuRoleInfo role;
    private boolean success;
    private String mag;
    private boolean ishave;

    public String insert() {
        try {
            if ((role_dao.findByHql1("from TAuRoleInfo where roleName=? ", role.getRoleName()).size() > 0) || (role_dao.findByHql1("from TAuRoleInfo where roleId=?", role.getRoleId()).size() > 0)) {
                setSuccess(true);
                setIshave(false);
                setMag("该配角色名称或编码已存在");
                return SUCCESS;

            } else {
                roleAuthorization.insert(role, menuid);
                setSuccess(true);
                setIshave(true);
                setMag("添加成功");
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setSuccess(true);
        setIshave(false);
        setMag("添加失败");
        return SUCCESS;
    }

    public String delete() {

        try {
            roleAuthorization.delete(role.getRoleId());
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

            if (role_dao.findByHql1("from TAuRoleInfo where roleName=? and roleId !=? ", role.getRoleName(), role.getRoleId()).size() > 0) {
                setSuccess(true);
                setIshave(false);
                setMag("该权限名称已存在");
                return SUCCESS;

            } else {
                roleAuthorization.update(role, menuid);
                setIshave(true);
                setMag("修改成功");
                setSuccess(true);
                return SUCCESS;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        setIshave(false);
        setMag("修改失败");
        setSuccess(true);
        return SUCCESS;

    }

    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
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

    public List<TAuAuthorization> getMenuid() {
        return menuid;
    }

    public void setMenuid(List<TAuAuthorization> menuid) {
        this.menuid = menuid;
    }
}
