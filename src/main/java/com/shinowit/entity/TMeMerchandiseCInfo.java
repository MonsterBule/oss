package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "TMe_MerchandiseCInfo")
public class TMeMerchandiseCInfo {
    private int id;
    private String merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean state;
    private Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByMerchandiseCid;

    @Basic
    @Column(name = "ID", insertable = false, updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseCID")
    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
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

        TMeMerchandiseCInfo that = (TMeMerchandiseCInfo) o;

        if (id != that.id) return false;
        if (merchandiseCName != null ? !merchandiseCName.equals(that.merchandiseCName) : that.merchandiseCName != null)
            return false;
        if (merchandiseCid != null ? !merchandiseCid.equals(that.merchandiseCid) : that.merchandiseCid != null)
            return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (merchandiseCid != null ? merchandiseCid.hashCode() : 0);
        result = 31 * result + (merchandiseCName != null ? merchandiseCName.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "merchandisc")
    public Collection<TMeMerchandiseInfo> gettMeMerchandiseInfosByMerchandiseCid() {
        return tMeMerchandiseInfosByMerchandiseCid;
    }

    public void settMeMerchandiseInfosByMerchandiseCid(Collection<TMeMerchandiseInfo> tMeMerchandiseInfosByMerchandiseCid) {
        this.tMeMerchandiseInfosByMerchandiseCid = tMeMerchandiseInfosByMerchandiseCid;
    }
}
