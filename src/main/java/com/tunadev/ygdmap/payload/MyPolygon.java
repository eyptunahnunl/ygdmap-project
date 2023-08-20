package com.tunadev.ygdmap.payload;

import java.util.List;
public class MyPolygon {
    private List<FeaturesItem> features;
    private String type;

    public List<FeaturesItem> getFeatures() {
        return features;
    }

    public void setFeatures(List<FeaturesItem> features) {
        this.features = features;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public static class Properties {

    }

    public static class Geometry {
        private List<List<List<Object>>> coordinates;
        private String type;

        public List<List<List<Object>>> getCoordinates() {
            return coordinates;
        }

        public void setCoordinates(List<List<List<Object>>> coordinates) {
            this.coordinates = coordinates;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }

    public static class FeaturesItem {
        private Geometry geometry;
        private String type;
        private Properties properties;

        public Geometry getGeometry() {
            return geometry;
        }

        public void setGeometry(Geometry geometry) {
            this.geometry = geometry;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Properties getProperties() {
            return properties;
        }

        public void setProperties(Properties properties) {
            this.properties = properties;
        }
    }
}
