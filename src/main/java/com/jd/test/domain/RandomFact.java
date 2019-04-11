package com.jd.test.domain;



import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RandomFact.
 */
@Entity
@Table(name = "random_fact")
public class RandomFact implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "icon_url")
    private String iconUrl;

    @Column(name = "url")
    private String url;

    @Column(name = "jhi_value")
    private String value;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public RandomFact iconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
        return this;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getUrl() {
        return url;
    }

    public RandomFact url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getValue() {
        return value;
    }

    public RandomFact value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RandomFact randomFact = (RandomFact) o;
        if (randomFact.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), randomFact.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RandomFact{" +
            "id=" + getId() +
            ", iconUrl='" + getIconUrl() + "'" +
            ", url='" + getUrl() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
