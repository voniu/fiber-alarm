import { ScrollBoard } from '@jiaminghi/data-view-react';
import './index.css';
import { useModel } from 'umi';



export default function () {
    const { fiberList, centerTo } = useModel('useItems');
    const { selectFeature, getFeaturesByTypeAndId } = useModel('useMap');
    const { showPopup } = useModel('useModel')
    const config = {
        header: ['名称', '编号', '坐标'],
        data: fiberList.map(i => [i.name, i.id, i.location[0][0]]),
        rowNum: 18,
        index: true,
        columnWidth: [50],
        align: ['center'],
    }

    function onClick({ row }: { row: [any, any, number, any] }) {
        const id = row[2];
        const type = 'fiber'
        const feature = getFeaturesByTypeAndId(id, type)
        if (feature) {
            selectFeature(feature)
            centerTo(id, type)
            showPopup()
        }
    }

    return <>
        <ScrollBoard config={config} style={{ height: '90%' }} onClick={onClick} />
    </>
}