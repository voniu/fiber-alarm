import { useEffect, useState } from "react"
import { Coordinate } from 'ol/coordinate';
import { useModel, useRequest } from 'umi';
import { CAMERA, FIBER } from "@/constant";
import { getFiber, getCamera } from "@/services/monitor";

const colors = ['#8cc540', '#009f5d', '#019fa0', '#019fde', '#007cdc', '#887ddd', '#cd7bdd', '#ff5675', '#ff1244', '#ff8345', '#f8bd0b',]

export interface Camera {
    id: number;
    name: string;
    location: Coordinate;
}

export interface Fiber {
    id: number;
    name: string;
    location: Array<Coordinate[]>;
}

export default function ItemsModel() {
    const [cameras, setCameras] = useState<Map<number, Camera>>(new Map)
    const [fibers, setFibers] = useState<Map<number, Fiber>>(new Map)
    const [fiberList, setFiberList] = useState<Fiber[]>([])
    const [cameraList, setCameraList] = useState<Camera[]>([])

    useRequest(async () => {
        return await getFiber("");
    }, {
        onSuccess: (data) => {
            setFiberList(data);
        }
    });
    useRequest(async () => {
        return await getCamera("").then();
    }, {
        onSuccess: (data) => {
            setCameraList(data)
        }
    });


    const { addPoint, addLine, toCenter, setClickPosition } = useModel('useMap');

    useEffect(() => {
        if (!fiberList?.length) return;

        const map = new Map<number, Fiber>();
        fiberList.forEach((i) => {
            map.set(i.id, i);
        });
        setFibers(map);
    }, [fiberList])

    useEffect(() => {
        if (!cameraList?.length) return;

        const map = new Map<number, Camera>();
        cameraList.forEach((i) => {
            map.set(i.id, i);
        });
        setCameras(map);
    }, [cameraList])

    function addCamera({ id, name, location }: Camera) {
        addPoint(location, id, name, CAMERA, 'red');
    }

    function addFiber({ location, id, name }: Fiber) {
        addLine(location, id, name, FIBER, colors[id % colors.length]);
    }

    function centerTo(id: number, type: string) {
        let location;
        if (type === CAMERA) {
            location = cameras.get(id)?.location
        } else if (type === FIBER) {
            location = fibers.get(id)?.location[0][0]
        }

        if (location) {
            toCenter(location);
            setClickPosition(location)
        }
    }

    useEffect(() => {
        cameras.forEach(addCamera)
    }, [cameras])
    useEffect(() => {
        fibers.forEach(addFiber)
    }, [fibers])

    return {
        cameras,
        fibers,
        cameraList,
        fiberList,
        addCamera,
        addFiber,
        centerTo
    }
}