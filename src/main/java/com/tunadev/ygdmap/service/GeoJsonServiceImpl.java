package com.tunadev.ygdmap.service;

import com.tunadev.ygdmap.payload.MyPolygon;
import com.tunadev.ygdmap.payload.OtherShape;
import org.springframework.http.ResponseEntity;

public interface GeoJsonServiceImpl {
    ResponseEntity<OtherShape> findShapesWithinPolygon(OtherShape otherShape, MyPolygon myPolygon) throws Exception;

}
