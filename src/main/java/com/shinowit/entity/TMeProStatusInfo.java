package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TMe_ProStatusInfo")
public class TMeProStatusInfo {
    private Integer proStatusId;
    private String proStatusName;
    private Boolean status;
    private String remark;
    private Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByProStatusId;


    @Id
    @Column(name = "ProStatusID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    public Integer getProStatusId() {
        return proStatusId;
    }

    public void setProStatusId(Integer proStatusId) {
        this.proStatusId = proStatusId;
    }

    @Basic
    @Column(name = "ProStatusName")
    public String getProStatusName() {
        return proStatusName;
    }

    public void setProStatusName(String proStatusName) {
        this.proStatusName = proStatusName;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TMeProStatusInfo that = (TMeProStatusInfo) o;

        if (proStatusId != that.proStatusId) return false;
        if (proStatusName != null ? !proStatusName.equals(that.proStatusName) : that.proStatusName != null)
            return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) proStatusId;
        result = 31 * result + (proStatusName != null ? proStatusName.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "status")
    public Collection<TMeMerchandiseInfo> gettMeMerchandiseInfosByProStatusId() {
        return tMeMerchandiseInfosByProStatusId;
    }

    public void settMeMerchandiseInfosByProStatusId(Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByProStatusId) {
        this.tMeMerchandiseInfosByProStatusId = tMeMerchandiseInfosByProStatusId;
    }
}
