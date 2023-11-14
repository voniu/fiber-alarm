import { useEffect, useState } from 'react';
import OlMap from 'ol/Map';
import { Feature, View } from 'ol';
import { MultiLineString, Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { FullScreen, defaults } from 'ol/control';
import Stroke from 'ol/style/Stroke';
import { Coordinate } from 'ol/coordinate';
import Circle from 'ol/style/Circle.js';
import Text from 'ol/style/Text';
import Select from 'ol/interaction/Select';
import { CAMERA, FIBER } from '@/constant';
import { useModel } from 'umi';

let instance: OlMap;
const featuresByTypeAndId = new Map<string, Feature>();

export default function MapModel() {
    console.log("this is map", instance)
    instance = instance || new OlMap({
        layers: [
            new TileLayer({
                source: new XYZ({
                    // url: 'http://127.0.0.1:8080/{z}/{y}/{x}.jpg',
                    // url: 'http://192.168.31.202:8000/{z}/{y}/{x}.png',
                    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    // url: 'http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                    projection: 'EPSG:3857'
                }),
            })
        ],
        view: new View({
            center: [48.206151, 40.027136],//地图中心点
            zoom: 6,
            projection: 'EPSG:4326',
        }),
        controls: defaults().extend([
            new FullScreen(), // 全屏
        ])
    });
    const [map, setMap] = useState<OlMap>(instance);
    const [currentItem, setCurrentItem] = useState<{ [key: string]: any }>({});
    const [clickPosition, setClickPosition] = useState<Coordinate>([48.206151, 40.027136])
    const [singleClickSelect] = useState(new Select({}))

    const { showPopup, hidenPopup } = useModel('useModel')

    useEffect(() => {
        map.addInteraction(singleClickSelect);
        singleClickSelect.on('select', function (event) {
            console.log('event.selected', event)
            if (event.selected.length > 0) {
                const item = event.selected[0].getProperties()
                setCurrentItem(item);
                setClickPosition(map.getCoordinateFromPixel(event.mapBrowserEvent.pixel_ || [48.206151, 40.027136]))
                if ([CAMERA, FIBER].includes(item.type)) {
                    showPopup();
                }
            } else {
                setCurrentItem({});
                hidenPopup();
            }
        })
    }, [])

    const setTarget = (id: string) => {
        map.setTarget(id);
    }

    function addPoint(point: Coordinate, id: number, name: string, type: string, color: string) {
        let feature = new Feature({
            id,
            type,
            name, // 冗余字段
            geometry: new Point(point),
        })
        // record feature
        featuresByTypeAndId.set(`${type}-${id}`, feature);
        feature.setStyle(
            new Style({
                text: new Text({
                    textAlign: 'right',
                    text: name + '   ',
                    font: 'bold 12px 微软雅黑',
                    fill: new Fill({
                        color: 'yellow'
                    })
                }),
                image: new Circle({
                    radius: 8,//半径
                    fill: new Fill({
                        color: color
                    }), //填充颜色        
                    stroke: new Stroke({
                        color: 'green',
                        width: 1
                    })//外环颜色和粗细
                }),

            })
        );
        let source = new VectorSource()
        source.addFeature(feature)
        let layer = new VectorLayer()
        layer.setSource(source)
        map.addLayer(layer)
    }

    function addLine(line: Array<Coordinate[]>, id: number, name: string, type: string, color: string) {
        const featureLine = new Feature({
            id,
            type,
            name,
            geometry: new MultiLineString(line),
        });
        // record feature
        featuresByTypeAndId.set(`${type}-${id}`, featureLine);
        const source = new VectorSource()
        source.addFeature(featureLine)
        const layer = new VectorLayer({
            source,
            style: new Style({
                stroke: new Stroke({
                    color: color,
                    width: 4
                }),
                text: new Text({
                    textAlign: 'right',
                    text: name,
                    font: 'bold 12px 微软雅黑',
                    fill: new Fill({
                        color: 'yellow'
                    })
                }),
            })
        })
        map.addLayer(layer)
    }

    function toCenter(center: Coordinate) {
        map.getView().setCenter(center)
    }

    function clearSelected() {
        singleClickSelect.getFeatures().clear();
        setCurrentItem({})
    }

    function selectFeature(feature: Feature) {
        clearSelected()
        singleClickSelect.getFeatures().push(feature);
        setCurrentItem(feature.getProperties());
    }

    function getFeaturesByTypeAndId(id: number, type: string) {
        return featuresByTypeAndId.get(`${type}-${id}`);
    }

    return {
        map,
        setMap,
        addPoint,
        addLine,
        setTarget,
        toCenter,
        currentItem,
        clickPosition,
        setClickPosition,
        getFeaturesByTypeAndId,
        selectFeature,
        clearSelected
    };
};