package com.tunadev.ygdmap.service;

import org.springframework.http.ResponseEntity;
import com.tunadev.ygdmap.payload.MyPolygon;
import com.tunadev.ygdmap.payload.OtherShape;

public interface GeoJsonService {

    ResponseEntity<OtherShape> findShapesWithinPolygon(OtherShape otherShape, MyPolygon myPolygon) throws Exception;
}
