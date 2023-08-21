# YGDMap Project

It can be tested with the [example data](/data) under the project data folder.
Go under document to access [project diagrams and architecture design document in Turkish](/documents/).

## Table of Content

---

1. [Introduction](#intro)
2. [ Purpose and Scope. ](#section2) <br>
   2.1. [Purpose](#section21) <br>
   2.3 [Scope](#section22)
3. [ Definitions and Abbreviations. ](#section3)
4. [ Architectural Design Criteria ](#section4)
5. [ General System Structure ](#section5) <br>
   5.1 [Software Products View](#section51)

<a name="intro"></a>

## 1. Introduction

YGDMap project is a GIS project. It is a solution that facilitates geometric data analysis by using the power of geographic information systems (GIS). This project allows to load different data formats, visualize on map and perform basic geospatial analysis. Its user-friendly interface, developed with React and Leaflet, combined with the backend supported by Java Spring Boot, enables users to perform simple geospatial analysis.

---

<a name="section2"></a>

## 2. Purpose and Scope

<a name="section21"></a>

###  2.1. Purpose

Bu projenin amacı, farklı geometrik veri formatlarını kullanıcıların yükleyebileceği ve bu verileri interaktif harita üzerinde görüntüleyerek temel coğrafi analizler yapabileceği bir platform sunmaktır. Kullanıcılar, coğrafi verileri daha iyi anlamak ve değerli içgörüler elde etmek için bu platformu kullanabilirler.

<a name="section22"></a>

### 2.2. Scope

The scope of the project includes loading different data formats, visualization on the map and basic geospatial analysis. The project aims to provide an interface that facilitates users' access to geographic data.

---

<a name="section3"></a>

## 3. Definitions and Abbreviations

Definitions:

- Geometric Data Analysis: Within the scope of the GIS project, it refers to the process of uploading various geographic data formats, visualizing them on a map, and conducting basic geographic analyses.
- Leaflet: Leaflet is an open-source JavaScript library used for creating interactive map applications.
- Backend: The component that operates behind the scenes of the project, processing user requests, and managing database operations.

Abbreviations:

- API: Application Programming Interface
- UI: User Interface
- GIS: Geographic Information System

---

<a name="section4"></a>

## 4. Architectural Design Criteria

- Basic Cartography Tools: These are the basic cartography tools that allow the user to navigate on the map, such as Zoom In, Zoom Out, Pan, etc.

- Data Insertion Tools:

  - GeoJSON Insertion Tool: The user will give the directory where the GeoJSON file is located. The GeoJSON data will then be added to the map as a layer.
  - ShapeFile Insertion Tool: The user will give the directory where the shapefile file is located. Then the shapefile data will be added to the map as a layer.
  - Raster Data Insertion Tool (GeoTIFF): The user will give the directory where the GeoTIFF file is located. The GeoTIFF data will then be added to the map as a layer.
  - Tool Adding WMS Map Service as Reference Layer: A publicly available WMS service, whose address is given by the user, will be added to the map as a raster layer.

- Tool Showing Attribute Information of an Object (Detail) on the Map: It is a tool that displays table information (database information) and geometry information (such as area, length or coordinate) of an object (detail) selected on the map on a form.

- Spatial Query Tool: It is a tool that lists the objects in another layer within this geometry on a form by using the geometry of an object selected from a layer listed on the map.

---

<a name="section5"></a>

## 5. General System Structure

Frontend is developed using the React and Leaflet libraries and provides the tools users need to load data, visualize it on a map, and perform basic analysis.

The backend is built with the Java Spring Boot framework and manages the data uploaded by the users, performs the analysis operations.

It is designed to support the flexible and extensible nature of the project so that new data formats or analysis tools can be easily integrated.
<a name="section51"></a>

### 5.1. Software Products View

<img src="/documents/location-analysis.png"/>

<br>
<br>

<img src="/documents/wms.png"/>

<br>
<br>

<img src="/documents/raster.png/>

## MIT License

Copyright (c) 2022 Eyup Tunahan Unal
YGDMap-project is free software and may be redistributed under the MIT-LICENSE.
