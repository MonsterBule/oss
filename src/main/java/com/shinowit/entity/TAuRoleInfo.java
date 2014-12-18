package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TAu_RoleInfo")
public class TAuRoleInfo {
    private int id;
    private String roleId;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private Collection<TAuAuthorization> tAuAuthorizationsByRoleId;
    private Collection<TAuOperInfo> tAuOperInfosByRoleId;

    @Basic
    @Column(name = "ID", insertable = false, updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuRoleInfo that = (TAuRoleInfo) o;

        if (id != that.id) return false;
        if (roleId != null ? !roleId.equals(that.roleId) : that.roleId != null) return false;
        if (roleName != null ? !roleName.equals(that.roleName) : that.roleName != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (roleId != null ? roleId.hashCode() : 0);
        result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "role")
    public Collection<TAuAuthorization> gettAuAuthorizationsByRoleId() {
        return tAuAuthorizationsByRoleId;
    }

    public void settAuAuthorizationsByRoleId(Collection<TAuAuthorization> tAuAuthorizationsByRoleId) {
        this.tAuAuthorizationsByRoleId = tAuAuthorizationsByRoleId;
    }

    @OneToMany(mappedBy = "role")
    public Collection<TAuOperInfo> gettAuOperInfosByRoleId() {
        return tAuOperInfosByRoleId;
    }

    public void settAuOperInfosByRoleId(Collection<TAuOperInfo> tAuOperInfosByRoleId) {
        this.tAuOperInfosByRoleId = tAuOperInfosByRoleId;
    }
}
