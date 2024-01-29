//@ts-ignore
import { ScrollBoard } from '@jiaminghi/data-view-react';
import './index.css';
import { useModel } from 'umi';

export default function () {
    const { cameraList, centerTo } = useModel('useItems');
    const { selectFeature, getFeaturesByTypeAndId } = useModel('useMap');
    const { showPopup } = useModel('useModel')
    if (!cameraList.length) return <div>No Data</div>
    console.log("camera",cameraList);
    
    const config = {
        header: ['Name', 'ID', 'Location'],
        data: cameraList.map(i => [i.name, i.id, i.location]),
        rowNum: 6,
        index: true,
        columnWidth: [50],
        align: ['center'],
    }

    function onClick({ row }: { row: [any, any, number, any] }) {
        const id = row[2];
        const type = 'camera'
        const feature = getFeaturesByTypeAndId(id, type)
        if (feature) {
            selectFeature(feature)
            centerTo(id, type)
            showPopup()
        }
    }

    return <>
        <ScrollBoard config={config} onClick={onClick} />
    </>
}