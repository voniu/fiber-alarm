import { CAMERA } from "@/constant";
import { useEffect } from "react";
import { useModel } from "umi";

let index2camId: (number | null)[] = [null, null, null, null]

export default function () {
    const { gridPlay, subscribe } = useModel('useRTV');
    const { cameraList, centerTo } = useModel('useItems');
    const { selectFeature, getFeaturesByTypeAndId } = useModel('useMap');
    const { showPopup } = useModel('useModel')

    useEffect(() => {
        if (gridPlay) {
            index2camId = [null, null, null, null]
            cameraList?.forEach((cam, index) => {
                subscribe(cam.id, `video${index}`)
                index2camId[index] = cam.id
            })
        }
    }, [gridPlay])

    function showCamera(id: number) {
        const feature = getFeaturesByTypeAndId(id, CAMERA)
        if (feature) {
            selectFeature(feature)
            centerTo(id, CAMERA)
            showPopup()
        }
    }

    function onClick(index: number) {
        const id = index2camId[index]
        if (id) showCamera(id)
    }

    return <div className="dataAllBorder02 video_cage">
        {[0, 1, 2, 3].map(i => {
            return <video key={`video${i}`} id={`video${i}`} onClick={() => onClick(i)} muted autoPlay className="video_around" />
        })}
    </div>
}