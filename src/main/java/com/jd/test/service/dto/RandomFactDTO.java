package com.jd.test.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the RandomFact entity.
 */
public class RandomFactDTO implements Serializable {

    private Long id;

    private String iconUrl;

    private String url;

    private String value;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RandomFactDTO randomFactDTO = (RandomFactDTO) o;
        if (randomFactDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), randomFactDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RandomFactDTO{" +
            "id=" + getId() +
            ", iconUrl='" + getIconUrl() + "'" +
            ", url='" + getUrl() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
